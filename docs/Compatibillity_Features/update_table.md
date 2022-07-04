---
sidebar_position: 5
sidebar_label: 'Update Table'
title: Update Table
Tags:
 - Update table
---

## Overview
Update table statement supports table name or alias to reference column.

## Syntax
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

### **Parameters**
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

## Example
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

