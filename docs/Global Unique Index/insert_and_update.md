---
sidebar_position: 2
sidebar_label: 'Insert and Update'
title: Insert and Update
tags:
  - Insert and Update
---


## Global Uniqueness Guarantee with Insert and Update
During global unique index creation, the system performs a index scan on all existing partitions and will raise an error if it finds a duplicate in other partitions instead of current. 


## Example
```
create table gidx_part (a int, b int, c text) partition by range (a);
create table gidxpart (a int, b int, c text) partition by range (a);
create table gidxpart1 partition of gidxpart for values from (0) to (10);
create table gidxpart2 partition of gidxpart for values from (10) to (100);
create unique index gidx_u on gidxpart using btree(b) global;

insert into gidxpart values (1, 1, 'first');
insert into gidxpart values (11, 11, 'eleventh');
insert into gidxpart values (2, 11, 'duplicated (b)=(11) on other partition');
ERROR:  duplicate key value violates unique constraint "gidxpart2_b_idx"
DETAIL:  Key (b)=(11) already exists.

