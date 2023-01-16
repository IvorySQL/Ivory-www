---
sidebar_position: 16
sidebar_label: 'NUMBER [ (p [, s]) ]'
title: NUMBER [ (p [, s]) ]
Tags:
 - NUMBER [ (p [, s]) ]
---

# NUMBER [ (p [, s]) ]

## Overview

Number having precision p and scale s. The range of precision p and scale s can refer to numeric type of PostgreSQL. The maximum allowable precision when explicitly specifying the type precision is 1000. Both precision and scale are in decimal digits.

## Syntax

```
NUMBER (p , s)
NUMBER ( p )
NUMBER
```
### Parameters

```precision(p)```
The precision of a numeric is the number of digits in the entire number, that is, the number of digits on both sides of the decimal point.  
```scale(s)```
The scale of numeric is the number of digits to the decimal part.


## Example

```
--test for number(p, s) (s < 0)
select 1234.4343::oracle.number(12,-2);
 number 
--------
 1200
(1 row)

--test for number(*,s)
select 1234567.89::number(*,1);
  number   
-----------
 1234567.9
(1 row)

--test for number(p, s) (p > s)
select cast(0.012 as number(6,3)) from dual;
 number 
--------
 0.012
(1 row)

--test for number(p, s) (p < s)
select cast (0.00001 as number(3,7)) from dual;
 number  
---------
 0.00001
(1 row)
```
