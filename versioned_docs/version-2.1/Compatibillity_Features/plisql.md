---
sidebar_position: 17
sidebar_label: 'PL/iSQL'
title: PL/iSQL
Tags:
 - PL/iSQL
 - PL Language
---


PL/iSQL is IvorySQL’s procedural language for writing custom Functions,
Procedures, and Packages for IvorySQL. PL/iSQL is derived from
PostgreSQL’s PL/pgsql with additional functionality while in the
syntaxial terms PL/iSQL is more close to Oracle’s PL/SQL.
This document describes the basic structure and constructs of PL/iSQL programs.

## Structure of PL/iSQL Programs

iSQL is a procedural, block-structured language that supports four different
types of programs, i.e. **PACKAGES**, **PROCEDURES**, **FUNCTIONS**, and  **TRIGGERS**.
iSQL uses the same block structure for each type of supported program.
A block consists of up to three sections. Declaration section, executable,
and exception sections. While declaration and exception sections are optional.

```SQL
[DECLARE
      declarations]
    BEGIN
      statements
  [ EXCEPTION
      WHEN <exception_condition> THEN
        statements]
    END;
```

At very minimal, a block can consist of just an executable section that
contains one or more iSQL statements within the **BEGIN** and **END** keywords.

```SQL
CREATE OR REPLACE FUNCTION null_func() RETURN VOID AS
BEGIN
    NULL;
END;
/
```

All keywords are case-insensitive. Identifiers are implicitly converted to lower case
unless double-quoted, just as they are in ordinary SQL commands.
The declaration section can be used to declare variables and cursors and depending
upon the context of where the block is used, the declaration section may
begin with the keyword **DECLARE**.

```SQL
CREATE OR REPLACE FUNCTION null_func() RETURN VOID AS
DECLARE
    quantity integer := 30;
    c_row pg_class%ROWTYPE;
    r_cursor refcursor;
    CURSOR c1 RETURN pg_proc%ROWTYPE;
BEGIN
    NULL;
end;
/
```

The optional exception section can also be included within the **BEGIN - END** block.
The exception section begins with the keyword, **EXCEPTION**, and continues until
the end of the block in which it appears. If an exception is thrown by a statement
within the block, program control goes to the exception section where the
thrown exception may or may not be handled depending upon the exception and
the contents of the exception section.

```SQL
CREATE OR REPLACE FUNCTION reraise_test() RETURN void AS
BEGIN

    BEGIN
        RAISE syntax_error;
        EXCEPTION
            WHEN syntax_error THEN

            BEGIN
                raise notice 'exception % thrown in inner block, reraising', sqlerrm;
                RAISE;
                EXCEPTION
                WHEN OTHERS THEN
                    raise notice 'RIGHT - exception % caught in inner block', sqlerrm;
                END;
            END;
    EXCEPTION
        WHEN OTHERS THEN
        raise notice 'WRONG - exception % caught in outer block', sqlerrm;
END;
/
```

:::info NOTE

Similar to PL/pgSQL, PL/iSQL uses **BEGIN/END** for grouping statements,
and they are not to be confused with the similarly-named SQL commands for
transaction control. PL/iSQL's BEGIN/END are only for grouping;
they do not start or end a transaction
:::

## **psql** support for PL/iSQL programs

For creating the PL/iSQL programs from psql client you can
either use the dollar quote syntax similar to PL/pgSQL

```SQL
CREATE FUNCTION func() RETURNS void as
$$
..
end$$ language plisql;
```

Alternatively, you can use Oracle compatible syntax without **$$**
quote and language specification and end the program definition using **/ (forward slash)**.
The / (forward slash) has to be on newline

```SQL
CREATE FUNCTION func() RETURN void AS
…
END;
/

```

## PL/iSQL programs syntax

### PROCEDURES

```SQL
CREATE [OR REPLACE] PROCEDURE procedure_name [(parameter_list)]
is
[DECLARE]
    -- variable declaration
BEGIN
    -- stored procedure body
END;
/

```

### FUNCTIONS


```SQL
CREATE [OR REPLACE] FUNCTION function_name ([parameter_list])
RETURN return_type AS
[DECLARE]
    -- variable declaration
BEGIN
    -- function body
   return statement
END;
/
```

### PACKAGES

#### PACKAGE HEADER


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

#### PACKAGE BODY

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

Refer to [**IvorySQL packages**](package.md) documentation for more details.