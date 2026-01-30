---
slug: ivorysql-oracle-package-compatibility
title: IvorySQL 4.0-Design Insights into Oracle Package Compatibility Feature
authors: [official]
authorTwitter: IvorySql
category: IvorySQL
image: img/blog/Oracle-Package-Compatibility.png
tags: [IvorySQL, Database, Oracle Compatible, PostgreSQL, Oracle Package, Package]
---

Recently, IvorySQL 4.0 was released, and this version introduces a new feature that adds compatibility with Oracle packages.

To help users better understand and utilize IvorySQL 4.0, this article provides a concise overview of the design philosophy behind this feature.

## What is an Oracle Package?

A package is a schema object that contains logically related PL/SQL types, variables, constants, subprograms, cursors, and exceptions. Packages are compiled and stored in the database, and multiple applications can share the contents of a package.

Every package has a package specification that declares public objects accessible outside the package.

If the public objects include cursors or subprograms, the package must also have a package body. The package body must define the code for the public cursors and subprograms. The body can also declare and define private objects, which cannot be referenced outside the package but can be used within the package. Lastly, the package body can include an initialization section, used for initializing variables, performing one-time setup steps, and handling exceptions. Modifying the package body does not require changes to the package specification or to database objects that reference the public objects of the package, so the package body can be considered a black box.

## Implementation of Packages in IvorySQL

In terms of content, the package body is similar to a nested subprogram, and the package specification merely defines the external interface of the package body. Therefore, from an implementation perspective, the process of implementing a package can be similar to that of nested subprograms.

The main tasks we handle include the following: creating, updating, instantiating, deleting packages, and referencing package objects in external processes.

- **Creating a package:** Modify the psql syntax so that psql can send the entire package creation statement to the server. The server will then add the package creation syntax. The syntax structure is similar to that of ordinary functions, so it is processed similarly, without requiring expansion at the SQL side. After syntax parsing, it follows the DDL process and calls the package creation function to store the package contents in the system tables.
- **Updating a package:** Support update syntax on the SQL side. After syntax parsing, the package update function is called to update the system table contents. The `plisql_package_Handler` is invoked to parse the syntax and invalidate the package specification or body tuples, preventing package and body compilation at runtime.
- **Deleting a package:** Support the delete syntax on the SQL side. After syntax parsing, the package delete function is called to delete the package content from the system tables.
- **Instantiating a package:** The first time the package is referenced, if its contents are not in memory (specifically in a hash table, similar to the portal hash table storage), the instantiation function is called to reinstantiate the package. This process involves calling the PL/iSQL compile function to recompile both the package specification and body, storing the compiled result in the current process's memory. The instantiation of a package should load the entire package and body into memory.
- **Referencing package objects:** During parsing, an interface is provided to search for variables, types, and subprograms in the package specification. It first looks for the package type within the current schema, then searches the system tables. When looking for subprograms, it prioritizes searching nested functions, packages, and system tables.
- **Package invalidation and state:** If a package only contains constants and types, it is stateless. Otherwise, it is stateful. The state of the package is set when accessing its variables and functions. When the package is rebuilt, its local instance is invalidated and recompiled. For other processes' instances, if the package is stateful, accessing variables or types will result in a "state lost" error on the first access, after which normal access resumes.

## Package Design in IvorySQL

### New System Tables and Caches

To store the contents of the package body and specification, two new system tables have been added:

| System Table Name | Purpose | 
| -------- | -------- | 
| `pg_package.h`    | Stores package specification content     | 
| `pg_package_body.h`    | Stores package body content     | 

The corresponding system caches are as follows:

| System Cache Name | Purpose | 
| -------- | -------- | 
| `PKGBODYOID`     | Find package body tuple by its OID     | 
| `PKGBODYPKGID`     | Find package body tuple by package specification OID    | 
| `PKGNAMEARGSNSP`     | Find package tuple by package name and schema OID   | 
| `PKGOID`     | Find package tuple by package specification OID     | 

### Package Instantiation

Package instantiation, similar to function compilation, converts data defined as strings into structured data. A package consists of both a specification and a body, and its compilation requires some special handling. New functions are introduced to compile both the specification and the body and store the results in a hash table.

Additionally, to handle local cache invalidation during package and body deletion, an invalidation function is registered during cache creation, to clear the package's cache state when it is invalidated.

```c
/* register invalid cache */
CacheRegisterSyscacheCallback(PKGBODYOID, InvalidatePackageCacheCallback, (Datum) 0);
CacheRegisterSyscacheCallback(PKGOID, InvalidatePackageCacheCallback, (Datum) 0);
```

`InvalidatePackageCacheCallback` traverses the hash table using the hash value to update the corresponding package's cache state.

The package cache state is represented by a char, with three bits currently in use. `0x01` indicates that the package specification has been updated, `0x02` indicates whether the package has a body, and `0x04` indicates that the package body has been updated.

### Referencing Objects in a Package

Interfaces are provided to search for functions, types, and variables within a package during the parsing phase. Below are some of the functions available:

| Function Name | Parameters | Return Value | Description |
| -------- | -------- | -------- | -------- |
| `LookupPkgTypeByTypename`     | `Const List* names`, `Bool missing_ok`| `PkgType*`     | Searches for types within the package based on a list of names.    |
| `LookupPkgVarByvarnames`     |`Const List _names`, `Bool missing_ok`     | `PkgVar*`    | Searches for variables within the package based on names.    |
| `LookupPkgEntryByTypename`     | `const List *names`, `bool missing_ok`  | `PkgEntry `  | Returns attributes (types or variables) of a package based on name.     |
| `LookupPkgFunc`     | `ParseState *pstate`, `List *fargs, FuncCall *fn`    | `FuncExpr`    | Searches for functions within the package based on name.   |

When non-package functions in PL/iSQL use a package's type, they simply reference the type's address. When using variables, a local mapping is required, with special handling during assignments. Typically, this involves switching to the package's memory context and then calling the package's assignment function.

### Function Parameters or Return Values Referencing Package Types

This part requires modifications to the `pg_proc` system table structure to add fields that record the names of parameter and return value types. Two new columns are added to the system table to solve this issue.

Similar to `proargnames`, a new `protypenames` field records the type names of parameter types, and `rettypename` records the return value type name. These fields are only populated when the corresponding type references a package; otherwise, they remain empty.

Since `protypenames` is a text array, it is populated when a function's parameter is of a package type. The type name for package items is serialized into a `TypeName` structure, and other non-package parameter types are represented as empty strings.

### Standard Package

Support for the standard package under the sys schema is available, allowing users to access objects in the package specification without specifying the package name. Users can create their own standard packages.

### DISCARD PACKAGE Syntax

This feature was introduced for compatibility with PostgreSQL's `DISCARD` functionality. Currently, PostgreSQL supports `DISCARD SEQUENCE`, `DISCARD TEMP`, `DISCARD PLAN`, and other commands to discard session-level objects such as sequences, temporary tables, and plans. The `DISCARD ALL` command also deletes temporary storage like portals, temporary tables, plans, and sequences.

IvorySQL supports the `DISCARD PACKAGE` syntax, which, when called within `DISCARD ALL`, deletes the session's package cache.

### Logical Backup and Restore Support for Packages

The `pg_dump` tool now supports backing up and restoring data that includes package functionality.

## Conclusion

The design insights shared above outline the implementation of Oracle package compatibility.

By modularizing related functionality through packages, the database organizes procedures, functions, variables, and other programming elements into self-contained units, facilitating management and maintenance. Since implementation details are hidden in the package body, code security and maintainability are improved. Code in the package body is loaded into memory upon first invocation, allowing subsequent calls to access it directly, reducing parsing and loading time.