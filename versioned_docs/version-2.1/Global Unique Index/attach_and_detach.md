---
sidebar_position: 3
sidebar_label: 'Attach and Detach'
title: Attach and Detach
tags:
  - Attach and Detach
---


## Global Uniqueness Guarantee with Attach

When attaching a new table to a partitioned table with global unique index, system will parform a duplicate check on all existing partitions. If there is a duplicate found in existing partitions that match a tuple in the attached table, an error will be raised and attach will fail.

The attach requires a shared lock on all existing partitions. If there is a concurrent INSERT in progress on one of the partitions, the attach will wait for it to finish first. This can be improved in future releases

## Example

```
create table gidxpart (a int, b int, c text) partition by range (a);
create table gidxpart1 partition of gidxpart for values from (0) to (100000);
insert into gidxpart (a, b, c) values (42, 572814, 'inserted first on gidxpart1');
create unique index on gidxpart (b) global;
create table gidxpart2 (a int, b int, c text);
insert into gidxpart2 (a, b, c) values (150000, 572814, 'dup inserted on gidxpart2');

alter table gidxpart attach partition gidxpart2 for values from (100000) to (199999); 
ERROR:  could not create unique index "gidxpart1_b_idx"
DETAIL:  Key (b)=(572814) is duplicated.

```