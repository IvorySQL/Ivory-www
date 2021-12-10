---
sidebar_label: 'Packages'
title: Packages
tags:
  - Oracle Style Packages
---

## Package Overview

This section journeys into the “Oracle Style Package” for PostgreSQL. A
package by very definition is an object or a group of objects packed
together. In terms of databases, this translates into a named schema
object that packages within itself a logically grouped collection of
procedures, functions, variables, cursors, user-defined record types,
and reference records. It is expected that users are familiar with
PostgreSQL and has a good understanding of SQL language to better
appreciate the packages and use these more efficiently.

### The Need for Packages

Like similar constructs in various other programming languages, there
are good reasons for using packages with SQL. In this section we are
going to cover a few.

1. Reliability and Reusability of Code
   Packages provide you the ability to create modular objects that
   encapsulate code. This makes the overall design and implementation
   simpler. With the ability to encapsulate variables and related types,
   stored procedures / functions, and cursors, it allows you to
   essentially create a self-contained module that is simple and easy to
   understand, maintain and use. Encapsulation comes into play through
   exposure of a package interface, rather than its implementation
   details, i.e. package body. This, therefore, benefits in many ways.
   It allows applications and users to refer to a consistent interface
   and not worry about the contents of its body. Also, it prevents users
   from making any decisions based on code implementation as that’s
   never exposed to them.
2. Ease of Use
   The ability to create a consistent functional interface in PostgreSQL
   helps simplify application development by allowing compilation of
   packages without their bodies. Beyond the development phase, the
   package allows a user to manage access control on the entire package
   rather than individual objects. This is rather valuable especially if
   the package contains lots of schema objects.
3. Performance
   Packages are loaded into memory for maintenance and therefore
   utilizing minimal I/O resources. Recompilation is simple and only
   limited to object(s) changed; dependent objects are not recompiled.
4. Additional Features
   In addition to performance and ease of use, packages offer
   session-wide persistence for variables and cursors. This means
   variables and cursors have the same lifetime as a database session
   and are destroyed when the session is destroyed.

### Package Components

In earlier sections, we briefly mention that a package has an interface
and a body, which are the major components that make up a package.

1. Package Specification
   Any object within the package that is to be used from the outside is
   specified in the package specification section. This is the publicly
   accessible interface we have been referring to in earlier sections.
   It does not contain the definition or implementation of them, i.e.
   the functions and the procedures. It only has their headers defined
   without the body definitions. The variables can be initialized. The
   following is the list of objects that can be listed in the
   specification:
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
   accessed outside the package. 

   In addition to subprogram definitions, it can optionally contain a
   initializer block that initializes the variables declared in
   specification and is executed only once when the first call to the
   package is made in a session.



<br />

---
**NOTE**

Package body gets invalidated if the specification changes Care must be
taken when identifying the public interfaces and the private ones to
avoid exposing critical functions and variables outside the package
unexpected.

---


<br />


## Package Syntax

### Package Specification Syntax

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


<br />


### Package Body Syntax


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

#### **Description**

CREATE PACKAGE defines a new package. CREATE OR REPLACE PACKAGE will
either create a new package, or replace an existing definition.

If a schema name is included, then the package is created in the
specified schema. Otherwise it is created in the current schema. The
name of the new package must be unique within the schema.

When CREATE OR REPLACE PACKAGE is used to replace an existing package,
the ownership and permissions of the package do not change. All other
package properties are assigned the values specified or implied in the
command. You must own the package to replace it (this includes being a
member of the owning role).

The user that creates the package becomes the owner of the package.


<br />

#### **Parameters**

```package_name```
	The name (optionally schema-qualified) of the package to create.

```invoker_rights_clause```
    Invoker rights define the access privileges for the package to the
    database objects. The options are available are:
	
- *CURRENT_USER*
  Indicates that the access privileges for the current user executing
  the package will be used.
- *DEFINER*
Indicates that access privileges for the package creator will be used.

```item_list```
This is the list of item that can be part of a package.

```procedure_declaration```
Specifies a procedure name followed by its list of arguments. It's only
a declaration and will not define the procedure. 

When this declaration is part of package package specification, it's a
public procedure and it's definition must be added to package body. 

When it's part of package body, it act's as forward declaration and is a
private procedure which is only accessible to package elements.

```procedure_definition```
The procedures are defined in the package body. This defines the
procedure that was declared earlier. It can also also define a procedure
without any earlier declaration which will make it a private procedure.

```function_declaration```
Defines a function name, its arguments and its return type. It's only a
declaration and will not define the function. 

When this declaration is part of package package specification, it's a
public function and it's definition must be added to package body. 

When it's part of package body, it act's as forward declaration and is a
private function which is only accessible to package elements.

```function_definition```
The functions are defined in the package body. This defines the
functions that was declared earlier. It can also also define a function
without any earlier declaration which will make it a private function.

```type_definition```
Suggests that you can define either a record, or cursor type.

```cursor_declaration```
Defines that cursor declaration must include its arguments and return
type as the desired rowtype.

```item_declaration```
Allows declaration of:
- Cursors
- Cursor variables
- Record variables
- Variables
  

```parameter_declaration```
Defines the syntax for declaring a parameter. The keyword “IN” if
specified indicates that this is an input parameter. The DEFAULT keyword
followed by expression (or value) may only be specific for an input
parameter.

```declare_section```
This contains all the elements that are local to the function or
procedure and can be referenced within it's body.

```body```
The body consists of the SQL statements or PL control structures that
are supported by PL/iSQL language.



<br />

## Creating and Accessing Packages

### Creating Packages

In the previous sections, we have gone through the syntax that dictates
the structure of a package. In this section, we are going to take this a
step further by understanding the construction process of a package and
how we can access its public elements.

As a package is created, PostgreSQL will compile it and report any
issues it may find. Once the package is successfully compiled, it is
ready to use.

### Accessing Package Elements

A package is instantiated and initialized when it’s referenced in a
session for the first time. The following actions are executed during
this process:

- Assignment of initial values to public constants and variables
- Execution of the initializer block of the package

There are several ways to access package elements:

- package functions can be utilized just as any other function in a
  SELECT statement or from other PL blocks
- package procedure can be invoked directly using CALL or from other PL
  blocks
- package variables can be directly read and written using the package
  name qualification in a PL block or from an SQL prompt.
- Direct Access Using Dot Notation:
   In the dot notation, elements can be accessed in the following
   manner:
  - package_name.func('foo');
  - package_name.proc('foo');
  - package_name.variable;
  - package_name.constant;
  - package_name.other_package.func('foo');
  
   These statements can be used from inside of PL block or in a SELECT
   statement if the element is not a type declaration or a procedure.

- SQL Call Statement:
  Another way is to use the CALL statement. The CALL statement executes
  a standalone procedure, or a function defined in a type or package.

  - CALL package_name.func('foo'); 
  - CALL package_name.proc('foo');


### Understanding Scope of Visibility

The scope of variables declared in a PL/SQL block is limited to that
block. If it has nested blocks, then it will be a global variable to the
nested blocks.

Similarly, if both blocks declare the same name variable, then inside of
the nested block, its own declared variable is visible and the parent
one is invisible. To access the parent variable, that variable must be
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


<br />

## Package Examples

### Package Specification

```SQL
DROP TABLE log;

CREATE TABLE log( date_of_action DATE,
     user_id VARCHAR2(20),
     package_name VARCHAR2(30) );

-- Package specification:
CREATE OR REPLACE PACKAGE emp_admin AUTHID DEFINER AS
   -- Declare public type, cursor, and exception:
   TYPE EmpRecTyp IS RECORD (emp_id NUMBER, sal NUMBER); CURSOR desc_salary RETURN EmpRecTyp;

     -- Declare public subprograms:
     FUNCTION hire_employee (
           last_name
           first_name
           email
           phone_number VARCHAR2,
           job_id VARCHAR2,
           salary NUMBER,
           commission_pct NUMBER,
           manager_id NUMBER,
           department_id NUMBER
     ) RETURN NUMBER;

   -- Overload preceding public subprogram:
   -- PROCEDURE fire_employee (emp_id NUMBER);
   PROCEDURE fire_employee (emp_email VARCHAR2);
   PROCEDURE raise_salary (emp_id NUMBER, amount NUMBER); FUNCTION nth_highest_salary (n NUMBER) RETURN EmpRecTyp;
END emp_admin;
```

### Package Body

```SQL
-- Package body:
CREATE OR REPLACE PACKAGE BODY emp_admin AS
   number_hired NUMBER; -- private variable, visible only in this package
   -- Define cursor declared in package specification:
   CURSOR desc_salary RETURN EmpRecTyp IS SELECT employee_id, salary
           FROM employees
           ORDER BY salary DESC;
   -- Define subprograms declared in package specification: 
   FUNCTION hire_employee (
           last_name VARCHAR2,
           first_name VARCHAR2,
           email VARCHAR2,
           phone_number VARCHAR2,
           job_id VARCHAR2,
           salary NUMBER,
           commission_pct NUMBER,
           manager_id NUMBER,
           department_id NUMBER
     ) RETURN NUMBER IS
         new_emp_id NUMBER;
     BEGIN
         RETURN new_emp_id;
     END hire_employee;

     PROCEDURE fire_employee (emp_id NUMBER) IS
      BEGIN
         NULL;
     END fire_employee;

   PROCEDURE fire_employee (emp_email VARCHAR2) IS
   BEGIN 
      NULL;
   END fire_employee;

   -- Define private function, available only inside package: 
   FUNCTION sal_ok (
           jobid VARCHAR2,
           sal NUMBER
           ) RETURN BOOLEAN IS
      min_sal NUMBER;
      max_sal NUMBER;
   BEGIN
      RETURN true;
   END sal_ok;

BEGIN -- initialization part of package body
   INSERT INTO log (date_of_action, user_id, package_name)
            VALUES (SYSDATE, USER, 'EMP_ADMIN');
   number_hired := 0;
END emp_admin;
```


<br />

## Limitations
Record types are supported as package variables, however they can only
be used within package elements i.e., Package function/procedure can
utilize them. They can not be accessed outside the package, this
limitation will be addressed in the next update of IvorySQL.
