---
sidebar_label: '语法增强'
title: 语法增强
Tags:
 - Alter table
---

## 更改表格

### 概述
使用oracle语法更改表。

### 语法

```
ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
action;

action:
    ADD ( add_coldef [, ... ] )
    | MODIFY ( modify_coldef [, ... ] )
    | DROP [ COLUMN ] ( column_name [, ... ] )

add_coldef:
    cloumn_name data_type

modify_coldef:
    cloumn_name data_type alter_using

alter_using:
    USING expression
```

#### **语法**

```name```
	Table name.  
```cloumn_name```
	Table column.  
```data_type```
	Column type.  
```expression```
	Value expression.  
```ADD keyword```
	Add column for table, can add one column or add multiple column.  
```MODIFY keyword```
	Modify column for table , can modify one column or modiify multiple column.  
```DROP keyword```
	Drop column for table, can drop one column or drop multiple column.  
```USING keyword```
	Modify value for column.  
      
### 使用

```
ADD:
create table tb_test1(id int, flg char(10));

alter table tb_test1 add (name varchar);

alter table tb_test1 add (adress varchar, num int, flg1 char);

\d tb_test1
                   Table "public.tb_test1"
 Column |       Type        | Collation | Nullable | Default 
--------+-------------------+-----------+----------+---------
 id     | integer           |           |          | 
 flg    | character(10)     |           |          | 
 name   | character varying |           |          | 
 adress | character varying |           |          | 
 num    | integer           |           |          | 
 flg1   | character(1)      |           |          | 

MODIFY:
create table tb_test2(id int, flg char(10), num varchar);

insert into tb_test2 values('1', 2, '3');

alter table tb_test2 modify(id char);

\d tb_test2
                   Table "public.tb_test2"
 Column |       Type        | Collation | Nullable | Default 
--------+-------------------+-----------+----------+---------
 id     | character(1)      |           |          | 
 flg    | character(10)     |           |          | 
 num    | character varying |           |          | 

DROP:
create table tb_test3(id int, flg1 char(10), flg2 char(11), flg3 char(12), flg4 char(13),
						flg5 char(14), flg6 char(15));

alter table tb_test3 drop column(id);

\d tb_test3
                 Table "public.tb_test3"
 Column |     Type      | Collation | Nullable | Default 
--------+---------------+-----------+----------+---------
 flg1   | character(10) |           |          | 
 flg2   | character(11) |           |          | 
 flg3   | character(12) |           |          | 
 flg4   | character(13) |           |          | 
 flg5   | character(14) |           |          | 
 flg6   | character(15) |           |          | 
```

## 删除表格
### 概述
使用oracle语法删除表。

### 语法
```
[ WITH [ RECURSIVE ] with_query [, ...] ]
DELETE [ FROM ] [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    [ USING using_list ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]
 ```
#### **参数**
```table_name```
	Table name.  
```alias```
	Table alias.  
```using_list```
	A list of table expressions that allow columns from other tables to appear in the WHERE condition.  
```condition```
	A expression which return boolean value.  
```cursor_name```
	The name of the cursor to be used in the WHERE CURRENT OF situation.  
```output_expression```
	After each row is deleted, it will be calculated and returned by DELETE.  
```output_name```
	The name of the column being returned.  

### 使用
```
reate table tb_test4(id int, flg char(10));

insert into tb_test4 values(1, '2'), (3, '4'), (5, '6');

delete from tb_test4 where id = 1;

delete tb_test4 where id = 3;

table tb_test4;
 id |    flg     
----+------------
 5  | 6         
(1 row)
```

## 更新表格
### 概述
更新表时，可以使用表名或别名引用列。

### 语法
```
[ WITH [ RECURSIVE ] with_query [, ...] ]
UPDATE [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    SET { [ table_name | alias ] column_name = { expression | DEFAULT } 
| ( [ table_name | alias ] column_name [, ...] ) = [ ROW ]    ( { expression | DEFAULT } [, ...] )
| ( [ table_name | alias ] column_name [, ...] ) = ( sub-SELECT )
        } [, ...]
    [ FROM from_list ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]
```

#### **参数**
```table_name```
	Table name.  
```alias```
	Table alias.  
```column_name```
	Table column.  
```expression```
	Value expression.  
```sub-SELECT```
	Select sub query.  
```from_list```
	Table expression.  
```condition```
	A expression which return boolean value.  
```cursor_name```
	The name of the cursor to be used in the WHERE CURRENT OF situation.  
```output_expression```
	After each row is deleted, it will be calculated and returned by DELETE.  
```output_name```
	The name of the column being returned.  
### 使用
```
create table tb_test5(id int, flg char(10));

insert into tb_test5 values(1, '2'), (3, '4'), (5, '6');

update tb_test5 a set a.id = 33 where a.id = 3;

table tb_test5;
Id  |    flg
----+------------
  1 | 2
  5 | 6
 33 | 4
(3 rows)
```

## IS关键字
### 概述
创建函数时，可以使用IS关键字。

### 使用
```
create function test2(n1 int, n2 int) returns int
is '
begin
    return n1 + n2;
end;
'language plpgsql;
select test2(3,4);
 test2 
-------
     7
(1 row)
```

## 序列
### 概述
可以使用列引用调用nextval或currval。

### 语法
```
SELECT [ database {schema} | schema ] sequence {nextval | currval};
```
#### **参数**
```sequence```
	Sequence name.  
### Using
```
create sequence sq;

select sq.nextval;
 nextval
-----------
      1
(1 row)

select sq.currval;
 nextval
-----------
      1
(1 row)
```

## MINUS
### 概述
计算在左SELECT语句结果中但不在右SELECT语句结果中的行集。

### 语法
```
select_statement MINUS [ ALL | DISTINCT ] select_statement;
```

#### **参数**
```select_statement```
	Any SELECT statement without ORDER BY, LIMIT, FOR NO KEY UPDATE, FOR UPDATE, FOR SHARE and FOR KEY SHARE clauses.  
```ALL keyword```
	The result will contain duplicate rows.  
```DISTINCT keyword```
	Eliminate duplicate rows  

### 使用
```
select * from generate_series(1, 3) g(i) MINUS select * from generate_series(1, 3) g(i) where i = 1;
 i 
---
 2
 3
(2 rows)
```

## UNION
### 概述
在两个以上的union子句中支持连续使用null。我们将把null的类型转换为最近右边的非null值类型。

### 使用
```
select null union select null union select 1.2;
 ?column?
----------
      1.2

(2 rows)
```

## q\' feature
### 概述
使用 q\' 转义特殊字符。q\' 转义字符通常在\! \[\] \{\} \(\) \<\> 和其他转义字符之后使用, 您也可以使用 \\, 也可以使用字母, 数字, \=, \+, \-, \*, \&, \$, \%, \#, 等, 不允许使用空格。

### 使用
```
select q''' is goog '';
  ?column?
------------
 ' is goog
(1 row)
```

## GROUP BY
### 概述
当compatible_模式为oracle时，即使group by子句中有主键列，目标列也必须存在于group by子句中。

### 使用
```
set compatible_mode to oracle;

create table students(student_id varchar(20) primary key ,
student_name varchar(40),
student_pid int);

select student_id,student_name from students group by student_id;
ERROR:  column "students.student_name" must appear in the GROUP BY clause or be used in an aggregate function
```
