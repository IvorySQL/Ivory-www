---
sidebar_position: 10
sidebar_label: '序列'
title: 序列
Tags:
 - Sequence
 - 序列
---

## 序列
### 概述
可以使用列引用调用nextval或currval。

### 语法
```
SELECT [ database {schema} | schema ] sequence {nextval | currval};
```
#### **参数**
```sequence```
	序列名.  
### 示例
```
create sequence sq;

select sq.nextval;
 nextval
-----------
      1
(1 row)

select sq.currval;
 nextval
-----------
      1
(1 row)
```