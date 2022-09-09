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
	任何没有ORDER BY、LIMIT、 FOR NO KEY UPDATE、FOR UPDATE、 FOR SHARE和FOR KEY SHARE子句的 SELECT语句.  
```ALL keyword```
	包含重复行结果.  
```DISTINCT keyword```
	显示的消除重复行.  

### 示例
```
select * from generate_series(1, 3) g(i) MINUS select * from generate_series(1, 3) g(i) where i = 1;
 i 
---
 2
 3
(2 rows)
```


