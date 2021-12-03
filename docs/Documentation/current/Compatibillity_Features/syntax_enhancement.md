---
sidebar_label: 'Syntax enhancement'
sidebar_position: 1
---

# Alter Table

## Overview
Use oracle syntax to alter table.

## syntax

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

### **Parameters**

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
      
## Using

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

# Delete Table
## Overview
Use oracle syntax to delete table.

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

## Using
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

# Update Table
## Overview
When update table, can use table name or alias to reference column.

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
## Using
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

# IS keyword
## Overview
When create function, can use IS keyword.
## Using
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

# Sequence
## Overview
Can use column reference to call nextval or currval.
## Syntax
```
SELECT [ database {schema} | schema ] sequence {nextval | currval};
```
### **Parameters**
```sequence```
	Sequence name.  
## Using
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

# MINUS
## Overview
Calculate the set of rows that are in the result of the left SELECT statement but not in the result of the right SELECT statement.

## Syntax
```
select_statement MINUS [ ALL | DISTINCT ] select_statement;
```

### **Parameters**
```select_statement```
	Any SELECT statement without ORDER BY, LIMIT, FOR NO KEY UPDATE, FOR UPDATE, FOR SHARE and FOR KEY SHARE clauses.  
```ALL keyword```
	The result will contain duplicate rows.  
```DISTINCT keyword```
	Eliminate duplicate rows  

## Using
```
select * from generate_series(1, 3) g(i) MINUS select * from generate_series(1, 3) g(i) where i = 1;
 i 
---
 2
 3
(2 rows)
```

# UNION
## Overview
Support continuous use null in more than two union clauses. we will transform null’s type to the type on the nearest right that is not null value.

## Using
```
select null union select null union select 1.2;
 ?column?
----------
      1.2

(2 rows)
```

# "q'" feature
## Overview
Use "q'" to escape special characters. "q'" escape character is usually used after! [] {} () <> and other escape symbols, you can also use \, you can also use letters, numbers, =, +, -, *, &, $, %, #, etc. , Spaces are not allowed.

## Using
```
select q''' is goog '';
  ?column?
------------
 ' is goog
(1 row)
```

# GROUP BY
## Overview
When compatible_mode is oracle, even though have primary key column in group by clause, target column must exists in group by clause.

## Using
```
set compatible_mode to oracle;

create table students(student_id varchar(20) primary key ,
student_name varchar(40),
student_pid int);

select student_id,student_name from students group by student_id;
ERROR:  column "students.student_name" must appear in the GROUP BY clause or be used in an aggregate function
```