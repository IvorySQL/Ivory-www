---
sidebar_position: 1
sidebar_label: 'Create Global Unique Index'
title: Create Global Unique Index
tags:
  - Create Global Unique Index
---


## Overview
Support of global unique index creation.

## syntax

```
CREATE UNIQUE INDEX [IF NOT EXISTS] name ON table_name [USING method] (columns) GLOBAL

```

## Example

```
CREATE UNIQUE INDEX myglobalindex on mytable(bid) GLOBAL;
```

## Global Uniqueness Guarantee
During global unique index creation, the system performs a index scan on all existing partitions and will raise an error if it finds a duplicate from other partitions instead of current. For example

```
create table gidxpart (a int, b int, c text) partition by range (a);
create table gidxpart1 partition of gidxpart for values from (0) to (100000);
create table gidxpart2 partition of gidxpart for values from (100000) to (199999);
insert into gidxpart (a, b, c) values (42, 572814, 'inserted first on gidxpart1');
insert into gidxpart (a, b, c) values (150000, 572814, 'inserted second on gidxpart2');
create unique index on gidxpart (b) global;
ERROR:  could not create unique index "gidxpart1_b_idx"
DETAIL:  Key (b)=(572814) is duplicated.

```