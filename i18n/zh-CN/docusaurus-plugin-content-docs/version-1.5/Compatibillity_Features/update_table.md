---
sidebar_position: 5
sidebar_label: '更新表'
title: 更新表
Tags:
 - Update table
 - 更新表
---


## 概述
更新表时，可以使用表名或别名引用列。

## 语法
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

### **参数**
```table_name```
	表名.  
```alias```
	表别名.  
```column_name```
	列名.  
```expression```
	值表达式.  
```sub-SELECT```
	select子句.  
```from_list```
	表表达式.  
```condition```
	一个返回boolean类型值的表达式.  
```cursor_name```
	要在WHERE CURRENT OF情况中使用的游标 的名称.  
```output_expression```
	在每一行被删除后，会被DELETE计算并且返回的表达式.  
```output_name```
	被返回列的名称.  
## 示例
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
