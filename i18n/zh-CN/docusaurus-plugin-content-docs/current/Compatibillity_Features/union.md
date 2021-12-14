---
sidebar_position: 7
sidebar_label: 'UNION'
title: UNION
Tags:
 - UNION
 - Operator
---

## UNION
### 概述
在两个以上的union子句中支持连续使用null。我们将把null的类型转换为最近右边的非null值类型。

### 示例
```
select null union select null union select 1.2;
 ?column?
----------
      1.2

(2 rows)
```
