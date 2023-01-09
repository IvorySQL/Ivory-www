---
sidebar_position: 8
sidebar_label: 'Minus Operator'
title: MINUS Operator
Tags:
 - MINUS
 - Operator
---

## MINUS
### Overview
Calculate the set of rows that are in the result of the left SELECT statement but not in the result of the right SELECT statement.

### Syntax
```
select_statement MINUS [ ALL | DISTINCT ] select_statement;
```

#### **Parameters**
```select_statement```
	Any SELECT statement without ORDER BY, LIMIT, FOR NO KEY UPDATE, FOR UPDATE, FOR SHARE and FOR KEY SHARE clauses.  
```ALL keyword```
	The result will contain duplicate rows.  
```DISTINCT keyword```
	Eliminate duplicate rows  

### Example
```
select * from generate_series(1, 3) g(i) MINUS select * from generate_series(1, 3) g(i) where i = 1;
 i 
---
 2
 3
(2 rows)
```

