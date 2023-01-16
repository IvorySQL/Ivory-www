---
sidebar_position: 2
sidebar_label: '包'
title: 包
tags:
  - Oracle Style Packages
  - 包
---

## 软件包概述

本节将介绍PostgreSQL的“Oracle风格包”。根据定义，包是一个对象或一组对象打包在一起。就数据库而言，这将转换为一个命名的模式对象，该对象将过程、函数、变量、游标、用户定义的记录类型和引用记录的逻辑分组集合打包在自己内部。希望用户熟悉PostgreSQL，并且对SQL语言有很好的理解，以便更好地理解这些包并更有效地使用它们。

### 对软件包的需求

与其他各种编程语言中的类似构造一样，将包与SQL一起使用有很多好处。在本节中，我们将要讲几个。

1. 代码包的可靠性和可复用性

   Packages使您能够创建封装代码的模块化对象。这使得总体设计和实现更加简单。通过封装变量和相关类型、存储过程/函数以及游标，它允许您创建一个简单、易于理解、易于维护和使用的独立的模块。封装通过公开包接口而不是包体的实现细节发挥作用。因此，这在许多方面都有好处。它允许应用程序和用户引用一致的界面，而不必担心其主体的内容。此外，它还防止用户根据代码实现做出任何决策，因为代码实现从来没有向他们公开过。

2. 易用性

   在PostgreSQL中创建一致的功能接口的能力有助于简化应用程序开发，因为它允许在没有主体的情况下编译包。在开发阶段之后，包允许用户管理整个包的访问控制，而不是单个对象。这非常有价值，尤其是当包包含许多模式对象时。

3. 性能

  包是加载到内存中进行维护，因此使用的I/O资源最少。重新编译很简单，仅限于更改的对象；不重新编译从属对象。

4. 附加功能

   除了性能和易用性之外，软件包还为变量和游标提供了会话范围的持久性。这意味着变量和游标与数据库会话具有相同的生存期，并在会话被销毁时被销毁。

### 包组件

包有一个接口和一个主体，这是组成包的主要组件。

1. 包规格

   包规格指定了包内从外部使用的任何对象。这指的是可公开访问的接口。它不包含它们的定义或实现，即功能和程序。它只定义了标题，而没有正文定义。可以初始化变量。以下是可在规范中列出的对象列表：
   - Functions
   - Procedures
   - Cursors
   - Types
   - Variables
   - Constants
   - Record types


2. 包体

   包体包含包的所有实现代码，包括公共接口和私有对象。如果规范不包含任何子程序或游标，则包体是可选的。

   它必须包含规范中声明的子程序的定义，并且相应的定义必须匹配。

   包体可以包含其自己的子程序和规范中未指定的任何内部对象的类型声明。这些对象被认为是私有的。无法在包外部访问私有对象。 

   除了子程序定义外，它还可以选择性地包含一个初始化程序块，用于初始化规范中声明的变量，并且在会话中首次调用包时仅执行一次。

<br />

---
**注意**

如果规范更改，则包体将失效。在标识公共接口和私有接口时，必须小心，以避免将关键函数和变量暴露在包之外。

---


<br />


## 包语法

### 包规范语法

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


### 包体语法


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

#### **描述**

创建包定义一个新包。创建或替换包将创建新包或替换现有定义。

如果包含架构名称，则在指定架构中创建包。否则，它将在当前架构中创建。新包的名称在架构中必须是唯一的。

使用“创建或替换包”替换现有包时，包的所有权和权限不会更改。所有其他包属性都被指定为命令中指定或隐含的值。您必须拥有该包才能替换它（这包括作为所属角色的成员）。

创建包的用户成为包的所有者。


<br />

#### **参数**

```package_name```
   要创建的包的名称（可选架构限定）。

```invoker_rights_clause```
   调用方权限定义包对数据库对象的访问权限。可供选择的选项有：
	
- *CURRENT_USER*
  将使用执行包的当前用户的访问权限。

- *DEFINER*
  将使用包创建者的访问权限。

```item_list```
这是可以作为包的一部分的项目列表。

```procedure_declaration```
指定过程名称及其参数列表。这只是一个声明，不会定义过程。

当此声明是包规范的一部分时，它是一个公共过程，必须将其定义添加到包体中。

当它是包体的一部分时，它充当转发声明，是一个只有包元素才能访问的私有过程。

```procedure_definition```
程序在包体中定义。这定义了先前声明的过程。它还可以定义一个过程，而不需要任何先前的声明，这将使它成为一个私有过程。

```function_declaration```
定义函数名、参数及其返回类型。它只是一个声明，不会定义函数。

当此声明是包规范的一部分时，它是一个公共函数，必须将其定义添加到包体中。

当它是包体的一部分时，它充当转发声明，是一个只有包元素才能访问的私有函数。

```function_definition```
这些函数在包体中定义。这定义了前面声明的函数。它还可以定义一个函数，而不需要任何先前的声明，这将使它成为一个私有函数。

```type_definition```
建议您可以定义记录或光标类型。

```cursor_declaration```
定义游标声明必须包括其参数和返回类型作为所需的行类型。

```item_declaration```
允许声明:
- Cursors
- Cursor variables
- Record variables
- Variables
  

```parameter_declaration```
定义用于声明参数的语法。如果指定了关键字“IN”，则表示这是一个输入参数。后跟表达式（或值）的默认关键字只能特定于输入参数。

```declare_section```
它包含函数或过程本地的所有元素，并且可以在其主体中引用。

```body```
主体由PL/iSQL语言支持的SQL语句或PL控制结构组成。

<br />

## 创建和访问包

### 创建包

在本节中，我们将进一步了解包的构造过程以及如何访问其公共元素。

创建包时，PostgreSQL将编译并报告任何它可能发现的问题。一旦成功编译包，它将被删除随时可用。

### 访问包元素

当包第一次在会话中被引用时，它将被实例化和初始化。以下操作在过程中执行这个过程：
- 将初始值分配给公共常量和变量
- 执行包的初始值设定项块

有几种方法可以访问包元素：

- 包函数可以像SELECT语句或其他PL块中的任何其他函数一样使用
- 包过程可以使用CALL直接调用，也可以从其他PL块调用
- 包变量可以使用PL块中的包名称限定或从SQL提示符直接读取和写入。
- 使用点符号直接访问：
   在点表示法中，可以通过以下方式访问元素：
  - package_name.func('foo');
  - package_name.proc('foo');
  - package_name.variable;
  - package_name.constant;
  - package_name.other_package.func('foo');
  
   这些语句可以从PL块内部使用，如果元素不是类型声明或过程，则可以在SELECT语句中使用。

- SQL调用语句:
  另一种方法是使用CALL语句。CALL语句执行独立过程，或在类型或包中定义的函数。

  - CALL package_name.func('foo'); 
  - CALL package_name.proc('foo');


### 了解可见性的范围

PL/SQL块中声明的变量范围仅限于该块。如果它有嵌套块，则它将是嵌套块的全局变量。

类似地，如果两个块都声明了相同的名称变量，那么在嵌套块内部，它自己声明的变量是可见的，父变量是不可见的。要访问父变量，该变量必须完全限定。

考虑下面的代码片段。

**示例：可见性和限定变量名**
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

上面的示例显示了当嵌套包包含同名变量时，必须如何完全限定变量名。

变量名限定有助于解决在以下情况下由作用域优先级引入的可能混淆：

- 包和嵌套包变量：如果没有限定，嵌套的优先
- 包变量和列名：如果没有限定，列名优先
- 功能或程序变量和包变量：如果没有限定，包变量优先。

以下类型中的字段或方法需要进行类型限定。
- 记录类型

**示例：记录类型可见性和访问权限**
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

## 包示例

### 包规格

```SQL
CREATE TABLE test(x INT, y VARCHAR2(100));
INSERT INTO test VALUES (1, 'One');
INSERT INTO test VALUES (2, 'Two');
INSERT INTO test VALUES (3, 'Three');

-- Package specification:
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

### 包体

```SQL
-- Package body:
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

## 局限性
记录类型支持作为包变量，但是它们只能在包元素中使用，即包函数/过程可以使用它们。它们不能在包外访问，这一限制将在IvorySQL 的下一次更新中解决。
