---
sidebar_position: 4
sidebar_label: '删除表'
title: 删除表
Tags:
 - Delete table
 - 删除表
---

## 概述
使用oracle语法删除表。

## 语法
```
[ WITH [ RECURSIVE ] with_query [, ...] ]
DELETE [ FROM ] [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    [ USING using_list ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]
 ```
### **参数**
```table_name```
	表名.  
```alias```
	表别名.  
```using_list```
	一个表表达式的列表，它允许在WHERE条件中出现 来自其他表的列.  
```condition```
	一个返回boolean类型值的表达式.  
```cursor_name```
	要在WHERE CURRENT OF情况中使用的游标的名称.  
```output_expression```
	在每一行被删除后，会被DELETE计算并且返回的表达式.  
```output_name```
	被返回列的名称.  

## 使用
```
create table tb_test4(id int, flg char(10));

insert into tb_test4 values(1, '2'), (3, '4'), (5, '6');

delete from tb_test4 where id = 1;

delete tb_test4 where id = 3;

table tb_test4;
 id |    flg     
----+------------
 5  | 6         
(1 row)
```

