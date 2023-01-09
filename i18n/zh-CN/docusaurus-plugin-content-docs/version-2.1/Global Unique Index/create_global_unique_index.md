---
sidebar_position: 1
sidebar_label: '创建全局唯一索引'
title: 创建全局唯一索引
tags:
  - 创建全局唯一索引
---


## 概述
支持创建全局唯一索引。

## 语法

```
CREATE UNIQUE INDEX [IF NOT EXISTS] name ON table_name [USING method] (columns) GLOBAL

```

## 示例

```
CREATE UNIQUE INDEX myglobalindex on mytable(bid) GLOBAL;
```

## 全局唯一性保证
在创建全局唯一索引期间，系统会对所有现有分区执行索引扫描，如果发现来自其他分区的重复项而不是当前分区，则会引发错误。例如：

**命令**
```
create table gidxpart (a int, b int, c text) partition by range (a);
create table gidxpart1 partition of gidxpart for values from (0) to (100000);
create table gidxpart2 partition of gidxpart for values from (100000) to (199999);
insert into gidxpart (a, b, c) values (42, 572814, 'inserted first on gidxpart1');
insert into gidxpart (a, b, c) values (150000, 572814, 'inserted second on gidxpart2');
create unique index on gidxpart (b) global;
```

**输出**
```
ERROR:  could not create unique index "gidxpart1_b_idx"
DETAIL:  Key (b)=(572814) is duplicated.
```
