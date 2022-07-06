---
sidebar_position: 6
sidebar_label: 'Group By'
title: Group By
Tags:
 - Group By
 - Groupby
---
## Overview
In Oracle compatible_mode, GROUP BY clause requires all target columns to be listed in GROUP BY even when the PRIMARY KEY column exists in GROUP BY.

## Example
```
set compatible_mode to oracle;

create table students(student_id varchar(20) primary key ,
student_name varchar(40),
student_pid int);

select student_id,student_name from students group by student_id;
ERROR:  column "students.student_name" must appear in the GROUP BY clause or be used in an aggregate function
```