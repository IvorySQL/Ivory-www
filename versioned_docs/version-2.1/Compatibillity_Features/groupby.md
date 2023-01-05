---
sidebar_position: 6
sidebar_label: 'GROUP BY'
title: Group By
Tags:
 - Group By
 - Groupby
---

## 概述
当compatible_mode为oracle时，即使group by子句中有主键列，目标列也必须存在于group by子句中。

## 示例
```
set compatible_mode to oracle;

create table students(student_id varchar(20) primary key ,
student_name varchar(40),
student_pid int);

select student_id,student_name from students group by student_id;
ERROR:  column "students.student_name" must appear in the GROUP BY clause or be used in an aggregate function
```
