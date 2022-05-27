---
sidebar_position: 7
sidebar_label: 'Union Operator'
title: Union Operator
Tags:
 - UNION
 - Operator
---

## UNION
### Overview
Support continuous use null in more than two union clauses. NULL gets transformed to the type on the nearest right NON NULL value.

### Example
```
select null union select null union select 1.2;
 ?column?
----------
      1.2

(2 rows)
```
