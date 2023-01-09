---
sidebar_position: 3
sidebar_label: '更改表'
title: 更改表
Tags:
 - Alter table
 - 更改表
---


## 概述
使用oracle语法更改表。

## 语法

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

### **参数**

```name```
	表名.  
```cloumn_name```
	列名.  
```data_type```
	列类型.  
```expression```
	值表达式.  
```ADD keyword```
	增加表的列, 可以增加一个列或多个列.  
```MODIFY keyword```
	修改表的列, 可以修改一个列或多个列.  
```DROP keyword```
	删除表的列, 可以删除一个列或多个列.  
```USING keyword```
	修改列的值.  
      
## 示例

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

