---
sidebar_position: 2
sidebar_label: 'Packages'
title: Packages
tags:
  - Oracle Style Packages
---

## Package Overview

This section journeys into the “Oracle Style Package” for IvorySQL. A
package, by very definition, is an object or a group of objects packed
together. In terms of databases, this translates into a named schema
object that packages within itself a logically grouped collection of
procedures, functions, variables, cursors, user-defined record types,
and reference records.

### The Need for Packages

Like similar constructs in various other programming languages, there
are good reasons for using packages with SQL. In this section, we are
going to cover a few.

1. Reliability and Reusability of Code
   Packages provide the ability to create modular objects that
   encapsulate code. This makes the overall design and implementation
   simpler. The ability to encapsulate variables, related types, stored
   procedures/functions, and cursors, essentially allows creating a
   self-contained module that is simple and easy to understand, maintain
   and use. Encapsulation comes into play through the exposure of a package
   interface, rather than its implementation details, i.e., package body.
   This, therefore, benefits in many ways.
   Furthermore it allows applications and users to refer to a consistent
   interface and not worry about the contents of its body. Also, it
   prevents users from making any decisions based on code implementation
   as that’s never exposed to them.

2. Ease of Use
   The ability to create a consistent functional interface in IvorySQL
   helps simplify application development by allowing the compilation of
   packages without their bodies. Beyond the development phase, the
   package allows a user to manage access control on the entire package
   rather than individual objects. This is rather valuable especially if
   the package contains lots of schema objects.

3. Performance
   Packages are loaded into memory for maintenance and therefore
   utilize minimal I/O resources. Recompilation is simple and only
   limited to object(s) changed; dependent objects are not recompiled.

4. Additional Features
   In addition to performance and ease of use, packages offer
   session-wide persistence for variables and cursors. This means
   variables and cursors have the same lifetime as a database session
   and are destroyed when the session is destroyed.

### Package Components

Package consists of two components. Package specification and Package body.

1. Package Specification
   Any object within the package that is to be used from the outside is
   specified in the package specification section. This is the publicly
   accessible interface we have been referring to in earlier sections.
   It does not contain the definition or implementation of them, i.e.
   the functions and the procedures. It only has their headers defined
   without the body definitions. The variables can be initialized.
   The following is the list of objects that can be listed in the
   package specification:

   - Functions
   - Procedures
   - Cursors
   - Types
   - Variables
   - Constants
   - Record types


2. Package Body
The body contains all the implementation code of a package, including
   the public interfaces and the private objects. A package body is
   optional if the specification does not contain any subprogram or
   cursor.

   It must contain the definition of the subprograms declared in
   specification and the corresponding definitions must match. 

   A package body can contain its own subprogram and type declarations
   of any internal objects not specified in the specifications. These
   objects are then considered private. Private objects cannot be
   accessed from outside the package.

   In addition to subprogram definitions, it can optionally contain a
   initializer block that initializes the variables declared in
   specification and is executed only once when the first call to
   the package is made in a session.

<br />

:::info NOTE

Package body gets invalidated if the specification changes, Care must be
taken when identifying the public interfaces and the private ones to
avoid accidentally exposing critical functions and variables outside the package.
:::

<br />

---

## Creating Package

### CREATE PACKAGE

**CREATE PACKAGE** – Define a new Package specification

#### Syntax

```SQL
CREATE [ OR REPLACE ] PACKAGE [schema.] *package_name* [invoker_rights_clause] [IS | AS] 
   item_list[, item_list ...]
END [*package_name*];
 
 
invoker_rights_clause:
     AUTHID [CURRENT_USER | DEFINER]
 
item_list: 
[
   function_declaration    | 
   procedure_declaration   | 
   type_definition         | 
   cursor_declaration      | 
   item_declaration
]
 
 
function_declaration:
     FUNCTION function_name [(parameter_declaration[, ...])] RETURN datatype;
 
procedure_declaration:
     PROCEDURE procedure_name [(parameter_declaration[, ...])]
 
type_definition:
     record_type_definition      |
     ref_cursor_type_definition
 
cursor_declaration:
   CURSOR name [(cur_param_decl[, ...])] RETURN rowtype;
 
item_declaration:
     cursor_declaration             |
     cursor_variable_declaration    |
     record_variable_declaration    |
     variable_declaration           |
 
record_type_definition:
   TYPE record_type IS RECORD  ( variable_declaration [, variable_declaration]... ) ;
 
ref_cursor_type_definition:
   TYPE type IS REF CURSOR [ RETURN type%ROWTYPE ];
 
cursor_variable_declaration:
   curvar curtype;
 
record_variable_declaration:
   recvar { record_type | rowtype_attribute | record_type%TYPE };
 
variable_declaration:
   varname datatype [ [ NOT NULL ] := expr ]
 
parameter_declaration:
   parameter_name [IN] datatype [[:= | DEFAULT] expr]
 
```
#### Description
Creates the package specification that contains public declarations.
The declared items in the package specification are accessible from
anywhere in the package and to any other subprograms in the same database.
 
CREATE PACKAGE defines a new package. CREATE OR REPLACE PACKAGE will
either create a new package or replace an existing definition.

If a schema name is included, then the package is created in the
specified schema. Otherwise, it is created in the current schema.
The name of the new package must be unique within the schema.

When CREATE OR REPLACE PACKAGE is used to replace an existing package,
the ownership and permissions of the package do not change.
All other package properties are assigned the values specified or
implied in the command. Only the owner and member of the owning roles
are allowed to replace the packages.
<br />
The user that creates the package becomes the owner of the package.
<br />


### CREATE PACKAGE BODY

**CREATE PACKAGE BODY** – Define a new Package definition

#### Syntax

```SQL
CREATE [ OR REPLACE ] PACKAGE BODY [schema.] package_name [IS | AS]
   [item_list[, item_list ...]] | 
   item_list_2 [, item_list_2 ...]
   [initialize_section]
END [package_name];
 
 
initialize_section:
   BEGIN statement[, ...]
 
item_list: 
[
   function_declaration    | 
   procedure_declaration   | 
   type_definition         | 
   cursor_declaration      | 
   item_declaration
]
 
item_list_2:
[
   function_declaration
   function_definition
   procedure_declaration
   procedure_definition
   cursor_definition
]
 
function_definition:
   FUNCTION function_name [(parameter_declaration[, ...])] RETURN datatype  [IS | AS]
   [declare_section] body;
 
procedure_definition:
   PROCEDURE procedure_name [(parameter_declaration[, ...])] [IS | AS] 
   [declare_section] body;
 
cursor_definition:
   CURSOR name [(cur_param_decl[, ...])] RETURN rowtype IS select_statement;
 
body:
   BEGIN statement[, ...] END [name];
 
statement:
   [<<LABEL>>] pl_statments[, ...];

```

<br />

#### Description
 
CREATE PACKAGE BODY defines the package body for a package.
CREATE OR REPLACE PACKAGE body will either create a new package body for
the package or replace an existing package body definition.
Package specification must be created first to create the package body.
The package body contains the implementation of every cursor and subprogram
declared in the package specification created through “CREATE PACKAGE”.
objects defined in a package body are only accessible to outside the package
if their specification is listed in the package specification.
For all objects that are only defined in the package body and are not
included in the package specification, they become private members to
the package and are not accessible outside of the package.
Both the package and its body must be created in the same schema.

<br />

### Parameters

```package_name```
	The name (optionally schema-qualified) of the package to create.

```invoker_rights_clause```
Clause defines whether the package subprograms execute with the privileges of their invoker or definer.
The possible options for invoker_rights_clause are:

- *CURRENT_USER*
  Indicates that the access privileges for the current user **(invoker)** executing
  the package will be used.
- *DEFINER*
This indicates that access privileges for the package creator **(definer)** will be used.

```item_list```
This is the list of items that can be part of a package.

```procedure_declaration```
The procedure signature, i.e. procedure_name(< argument_list >).
procedure_declaration can appear in both package specification and package body.
Procedure declarations listed in the Package specification makes the procedure
public and accessible from outside of the package. While the procedure declared
in the package body is considered as a forward declaration and becomes a private
member to the package.

```procedure_definition```
Implementation/definition of the package procedure.
procedure_definition can only be provided in the package body.
Procedure access specifier is determined by procedure declaration and the
procedures defined in the package body without corresponding declaration
automatically becomes private to the package.

```function_declaration```
The function signature and it’s return type, i.e. function_name(< argument_list >) RETURN return_type;.

function_declaration can appear in both package specification and package body.
Function declarations listed in the Package specification makes the function public
and accessible from outside the package. While the function declaration in the package
body is considered as a forward declaration and becomes a private member to the package.


```function_definition```
Implementation/definition of the package function.
function_definition can only be provided in the package body.
Function access specifier is determined by function declaration and the function
defined in the package body without corresponding declaration automatically
becomes private to the package.


```type_definition```
Either a RECORD, or CURSOR type definition.

```cursor_declaration```
CURSOR declaration along with its arguments and return type as the desired ROWTYPE.

```item_declaration```
Allows declaration of:
- Cursors
- Cursor variables
- Record variables
- Variables

```parameter_declaration```
Defines the syntax for declaring a parameter. The keyword “IN” if
specified indicates that this is an input parameter. The DEFAULT keyword
followed by an expression (or value) may only be specific for an input
parameter.

```declare_section```
This contains all the elements that are local to the function or procedure and can be referenced within its body.

```body```
The body consists of the SQL statements or PL control structures that are supported by PL/iSQL language.
  
<br />


## Creating and Accessing Packages
 
### Creating Packages
 
In the previous sections, we have gone through the syntax that dictates the
structure of a package. In this section, we are going to take this a step further
by understanding the construction process of a package and how we can access
its public elements.

As a package is created, IvorySQL will compile it and report any issues it may find.
Once the package is successfully compiled, it becomes ready for use.
 
### Accessing Package Elements
 
A package is instantiated and initialized when it is referenced for the first time in a session.
The following actions are performed in the same order during this process:
 
- Assignment of initial values to public constants and variables
- Execution of the initializer block of the package
 
There are several ways to access package elements:
 
- Package functions can be utilized just as any other function in a SELECT statement or from other PL blocks
- Package procedure can be invoked directly using CALL or from other PL blocks
- Package variables can be directly read and written using the package name qualification in a PL block.
- Direct Access Using Dot Notation:
   In the dot notation, elements can be accessed in the following
   manner:
  - package_name.func('foo');
  - package_name.proc('foo');
  - package_name.variable;
  - package_name.constant;
  - package_name.other_package.func('foo');

  These statements can be used from inside a PL block or in a SELECT statement if the element
  is a function or a procedure.

- SQL Call Statement:
  Another way is to use the CALL statement. The CALL statement executes
  a standalone procedure, or a function defined in a type or package.

  - CALL package_name.func('foo'); 
  - CALL package_name.proc('foo');


### Understanding Scope of Visibility
 
The scope of variables declared in a PL/iSQL block is limited to that
block. If it has nested blocks, then it will be a global variable to the
nested blocks.

Similarly, if both blocks declare the same name variable, then inside of
the nested block, its own declared variable is visible and the parent
one becomes invisible. To access the parent variable, that variable must be
fully qualified.

Consider the following code snippet.


**Example: Visibility and Qualifying Variable Names**
```SQL

<<blk_1>>
DECLARE
   x INT;
   y INT;
BEGIN
   -- both blk_1.x and blk_1.y are visible
   <<blk_2>>
   DECLARE
      x INT;
      z INT;
   BEGIN
      -- blk_2.x, y and z are visible
      -- to access blk_1.x it has to be a qualified name. blk_1.x := 0; NULL;
   END;
   -- both x and y are visible
END;

```

The above example shows how you must fully qualify a variable name in
case a nested package contains a variable with the same name.

Variable name qualification helps in resolving possible confusion that
gets introduced by scope precedence in the following scenarios:

- Package and nested packages variables: without qualification, nested
  takes precedence
- Package variable and column names: without qualification, column name
  takes precedence
- Function or procedure variable and package variable: without
  qualification, package variable takes precedence.

The fields or methods in the following types need to be type qualified.
- Record Type

**Example: Record Type Visibility and Access**
```SQL
DECLARE
     x INT;
     TYPE xRec IS RECORD (x char, y INT);
BEGIN
     x := 1; -- will always refer to x(INT) type.
     xRec.x := '2'; -- to refer the CHAR type, it will have to be
qualified name
END;
```
---

## Examples

```SQL
CREATE TABLE test(x INT, y VARCHAR2(100));
INSERT INTO test VALUES (1, 'One');
INSERT INTO test VALUES (2, 'Two');
INSERT INTO test VALUES (3, 'Three');
```

### Package Specification

```SQL
CREATE OR REPLACE PACKAGE example AUTHID DEFINER AS
   -- Declare public type, cursor, and exception:
   TYPE rectype IS RECORD (a INT, b VARCHAR2(100));
   CURSOR curtype RETURN rectype%rowtype;
 
   rec rectype;
 
   -- Declare public subprograms:
   FUNCTION somefunc (
         last_name VARCHAR2,
         first_name VARCHAR2,
         email VARCHAR2
   ) RETURN NUMBER;
 
   -- Overload preceding public subprogram:
   PROCEDURE xfunc (emp_id NUMBER);
   PROCEDURE xfunc (emp_email VARCHAR2);
END example;
/
```

### Package Body

```SQL
CREATE OR REPLACE PACKAGE BODY example AS
   nelems NUMBER; -- private variable, visible only in this package

   -- Define cursor declared in package specification:
   CURSOR curtype RETURN rectype%rowtype IS SELECT x, y
           FROM test
           ORDER BY x;
   -- Define subprograms declared in package specification: 
   FUNCTION somefunc (
           last_name VARCHAR2,
           first_name VARCHAR2,
           email VARCHAR2
     ) RETURN NUMBER IS
         id NUMBER := 0;
     BEGIN
         OPEN curtype;
         LOOP
            FETCH curtype INTO rec;
            EXIT WHEN NOT FOUND;
         END LOOP;
         RETURN rec.a;
     END;
 
   PROCEDURE xfunc (emp_id NUMBER) IS
   BEGIN
      NULL;
   END;
 
   PROCEDURE xfunc (emp_email VARCHAR2) IS
   BEGIN
      NULL;
   END;
 
BEGIN -- initialization part of package body
   nelems := 0;
END example;
/ 
SELECT example.somefunc('Joe', 'M.', 'email@example.com');

```

<br />

## Limitations
Record types are supported as package variables, however they can only
be used within package elements i.e., Package function/procedure can
utilize them. They can not be accessed outside the package, this
limitation will be addressed in the next update of IvorySQL.
