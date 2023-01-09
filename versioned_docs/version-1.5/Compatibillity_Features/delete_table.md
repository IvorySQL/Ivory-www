---
sidebar_position: 4
sidebar_label: 'Delete Table'
title: Delete Table
Tags:
 - Delete table
---

## Overview
Support of Oracle syntax for deleting the table.

## syntax
```
[ WITH [ RECURSIVE ] with_query [, ...] ]
DELETE [ FROM ] [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    [ USING using_list ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]
 ```
### **Parameters**
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

## Example
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
