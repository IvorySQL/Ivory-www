---
title: IvorySQL Developers
---

# Welcome to Developers


## Roadmap

IvorySQL is a noncommercial, all volunteer, free software project, and as such there is no formal list of feature requirements required for development. We enjoy allowing developers to explore the topics of their choosing, though we also ensure that all new features committed to IvorySQL are thoroughly vetted by our community of contributors and committers.

### Minor Releases

The IvorySQL project aims to follow a predefined schedule, releasing at least one minor version per quarter. If additional releases are needed due to critical bug fixes or security issues, more releases will be made between these dates, so this list should be considered a minimum. IvorySQL closely follows PostgreSQL's release schedule, ensuring that a new minor version with the latest kernel updates will be released every quarter.

The version release schedule for this year is as follows:

- 1st Quarter: Release v4.2 (PG Kernel 17.2) ```Features: Added architecture design documentation.```
- 1nd Quarter: Release v4.4 (PG Kernel 17.4) ```Features: IvorySQL Operator kernel upgrade.```
- 2rd Quarter: Release v4.5 (PG Kernel 17.5) ```Features: IvorySQL Cloud v4.```
- 3rd Quarter: Release v4.6 (PG Kernel 17.6) 

### Next Major Release
The next major version of IvorySQL is planned as v5.0, scheduled for release in Q4 2025. The Oracle-compatible features in IvorySQL v5.0 are shown in the table below. Current development progress can be tracked on the [GitHub Project page](https://github.com/IvorySQL/IvorySQL/projects).

| Category | Feature | Description |
|---------|---------|---------|
| Encoding | GB18030 | The system must ensure that characters are stored in GB18030 encoding on the server, and it should allow the specification of GB18030 encoding during the initdb and create database processes |
| Functions | rawtohex | Refers to the function RAWTOHEX, which is compatible with Oracle databases. This function is used to convert a raw data type into its hexadecimal representation as a character string |
| Functions | sys_guid | Refers to the SYS_GUID function, which is designed to be compatible with Oracle databases. The SYS_GUID function generates a globally unique identifier (GUID), typically as a 16-byte RAW value |
| Functions | sys_context | Refers to the SYS_CONTEXT function, which is designed to be compatible with Oracle databases. The SYS_CONTEXT function is used to retrieve information about the current session or system environment from predefined namespaces, such as USERENV |
| Functions | userenv | Refers to the USERENV function,which is designed to be compatible with Oracle databases |
| Functions | instr | Support for the same syntax as Oracle's INSTR function |
| PL/iSQL | CALL syntax | The introduction of the CALL invocation syntax in PL/iSQL enhances the procedural language by providing a standardized way to invoke stored procedures. This feature simplifies the process of calling procedures, making the code more readable and consistent with other database systems that support similar functionality |
| PL/iSQL | %ROWTYPE | The %ROWTYPE attribute allows developers to declare variables that represent an entire row of a table or cursor. This feature eliminates the need to manually define variables for each column in a table, thereby reducing redundancy and improving maintainability |
| PL/iSQL | %TYPE | The %TYPE attribute enables the declaration of variables with the same data type as a column in a table or another variable. This ensures that the variable's type always matches the source, even if the source's data type changes |
| Functions | Functions | Support for Oracle's function syntax, including features such as: EDITIONABLE/NONEDITIONABLE, return, IS, OUT parameter NOCOPY functionality, functions without parentheses (), a maximum of 32,767 parameters, and ALTER FUNCTION etc |
| Procedures | Procedures | Support for Oracle's procedure syntax, including features such as: EDITIONABLE/NONEDITIONABLE, functions without parentheses (), a maximum of 32,767 parameters, support for EXEC to call stored procedures, and ALTER PROCEDURE syntax,etc |
| OUT params | libpq | In the Oracle OCI interface, SQL statements support parameter binding by name. Currently, in IvorySQL's libpq interface, only positional parameter binding is supported for SQL statements, while named parameter binding is not supported. The requirement is to construct prepare, bind, and execute functions similar to those in the OCI interface |
| OUT params | Procedures | The syntax for creating stored procedure parameters, where the parameter mode can be IN, OUT, or IN OUT. The syntax for creating stored procedures with OUT parameters and the calling of such stored procedures are the same as in Oracle |
| OUT params | Functions | The syntax for creating function parameters, where the parameter mode can be IN, OUT, or IN OUT. The syntax for creating functions with OUT parameters and the calling of such functions are the same as in Oracle |
| Nested subprograms | Nested subprograms | The PLISQL functionality in IvorySQL was developed to ensure compatibility with Oracle's PL/SQL. In Oracle's PL/SQL, it is possible to declare and define subprograms (including both functions and procedures) within other subprograms, and these subprograms can be overloaded. Additionally, subprograms can be nested within other subprograms, providing great convenience and flexibility for PL/SQL developers. To ensure that Oracle PL/SQL programs can be smoothly migrated to IvorySQL in future projects, we also support the aforementioned syntax and usage in PLISQL |
| SQL | rowid | Provides Oracle-compatible ROWID pseudocolumn |
| SQL | LIKE operator | The LIKE operator is utilized in the WHERE clause of a SQL statement to filter rows based on pattern matching with string expressions. It allows for flexible searching capabilities by enabling partial matches according to specified patterns |
| Misc | Case sensitivity | This feature ensures compatibility with Oracle databases by allowing case-sensitive identifiers.  Supporting this feature allows seamless integration with Oracle-based applications |
| Misc | NLS parameters | The support for National Language Support (NLS) parameters ensures compatibility with Oracle's locale-specific settings. Like NLS_DATE_FORMAT,NLS_TIMESTAMP_FORMAT etc |
| Misc | Empty-to-NULL | This feature ensures that empty or undefined values in the database are automatically converted to NULL. This behavior is particularly useful when dealing with data imports, user inputs, or legacy systems where missing or blank values may not be explicitly marked as NULL. By supporting this conversion, the database system provides a consistent way to handle such cases, reducing potential errors and improving data integrity |
| Views | FORCE VIEW | The FORCE option in the CREATE VIEW statement forces the creation of a view even if the base tables, other views, or any object types referenced in the view definition do not currently exist |
| Tools | Parser switching | Support for switching parser, allowing toggling between Oracle and PostgreSQL modes.This feature provides the ability to switch the SQL parser mode between Oracle and PostgreSQL. It allows users to choose the syntax and behavior that best suits their needs, ensuring compatibility with both Oracle and PostgreSQL ecosystems |

### Previously Implemented Compatibility Features
For Oracle-compatible features implemented in previous versions, please refer to the [Oracle Compatibility List](https://docs.ivorysql.org/cn/ivorysql-doc/v4.4/v4.4/14) in IvorySQL Documentation Center.