---
sidebar_position: 8
sidebar_label: 'Minus Operator'
title: MINUS Operator
Tags:
 - MINUS
 - Operator
---

## MINUS
### 概述
计算在左SELECT语句结果中但不在右SELECT语句结果中的行集。

### 语法
```
select_statement MINUS [ ALL | DISTINCT ] select_statement;
```

#### **参数**
```select_statement```
	Any SELECT statement without ORDER BY, LIMIT, FOR NO KEY UPDATE, FOR UPDATE, FOR SHARE and FOR KEY SHARE clauses.  
```ALL keyword```
	The result will contain duplicate rows.  
```DISTINCT keyword```
	Eliminate duplicate rows  

### 使用
```
select * from generate_series(1, 3) g(i) MINUS select * from generate_series(1, 3) g(i) where i = 1;
 i 
---
 2
 3
(2 rows)
```


