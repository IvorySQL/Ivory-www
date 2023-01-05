---
sidebar_position: 16
sidebar_label: 'NUMBER [ (p [, s]) ]'
title: NUMBER [ (p [, s]) ]
Tags:
 - NUMBER [ (p [, s]) ]
---

# NUMBER [ (p [, s]) ]

## 概述

Number类型具有精度 p 和刻度 s 。 精度 p 和 标度 s 的范围可以参考 PostgreSQL 的Numeric类型。 Number类型明确指定精度允许的最大精度为 1000。精度和小数位数均为十进制数字。

## 语法

```
NUMBER (p , s)
NUMBER ( p )
NUMBER
```

### 参数说明

```精度```
	Number的精度是整个数字的位数，即小数点两边的位数。  
```标度```
	Number的标度是到小数部分的位数。

## 用例

```
--测试 number(p, s) (s < 0)
select 1234.4343::oracle.number(12,-2);
 number 
--------
 1200
(1 row)

--测试 number(*,s)
select 1234567.89::number(*,1);
  number   
-----------
 1234567.9
(1 row)

--测试 number(p, s) (p > s)
select cast(0.012 as number(6,3)) from dual;
 number 
--------
 0.012
(1 row)

--测试 number(p, s) (p < s)
select cast (0.00001 as number(3,7)) from dual;
 number  
---------
 0.00001
(1 row)
```
