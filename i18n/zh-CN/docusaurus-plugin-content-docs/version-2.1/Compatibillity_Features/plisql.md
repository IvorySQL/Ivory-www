---
sidebar_position: 17
sidebar_label: 'PL/iSQL'
title: PL/iSQL
Tags:
 - PL/iSQL
 - PL Language
---


PL/iSQL 是 IvorySQL 的过程语言，用于为 IvorySQL 编写自定义函数、过程和包。 
PL/iSQL 派生自 PostgreSQL 的 PL/pgsql，并增加了一些功能，但在语法上
PL/iSQL 更接近 Oracle 的 PL/SQL。
本文档描述了 PL/iSQL 程序的基本结构和构造。


## PL/iSQL 程序的结构

iSQL 是一种程序化的块结构语言，支持四种不同的
程序类型，即 **PACKAGES**、**PROCEDURES**、**FUNCTIONS** 和 **TRIGGERS**。
iSQL 对每种类型的受支持程序使用相同的块结构。
一个块最多由三个部分组成：声明部分，可执行文件，和异常部分。
而声明和异常部分是可选的。

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

一个块至少可以由一个可执行部分组成
在 **BEGIN** 和 **END** 关键字中包含一个或多个 iSQL 语句。

```SQL
CREATE OR REPLACE FUNCTION null_func() RETURN VOID AS
BEGIN
    NULL;
END;
/
```

所有关键字都不区分大小写。 标识符被隐式转换为小写，除非双引号，
就像它们在普通 SQL 命令中一样。
声明部分可用于声明变量和游标，并取决于使用块的上下文，
声明部分可以以关键字 **DECLARE** 开头。

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

可选的异常部分也可以包含在 **BEGIN - END** 块中。
异常部分以关键字 **EXCEPTION** 开始，一直持续到它出现的块的末尾。 
如果块内的语句抛出异常，程序控制转到异常部分，根据异常和异常部分的内容，可能会或不会处理抛出的异常。

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

与 PL/pgSQL 类似，PL/iSQL 使用 **BEGIN/END** 对语句进行分组，
并且不要将它们与用于事务控制的同名 SQL 命令混淆。 PL/iSQL 的 BEGIN/END 仅用于分组；
他们不开始或结束事务

:::

## **psql** 对 PL/iSQL 程序的支持

要从 psql 客户端创建 PL/iSQL 程序，您可以使用类似于 PL/pgSQL 的**$$**语法

```SQL
CREATE FUNCTION func() RETURNS void as
$$
..
end$$ language plisql;
```
或者，您可以使用不带 **$$** 的 Oracle 兼容语法的引用和语言规范，
并使用 **/（正斜杠）** 结束程序定义。
/（正斜杠）必须在换行符上

```SQL
CREATE FUNCTION func() RETURN void AS
…
END;
/

```

## PL/iSQL 程序语法

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
