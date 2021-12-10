---
sidebar_position: 5
sidebar_label: '创建函数'
title: 创建函数
Tags:
 - Create Function
 - IS Keyword
 - IS关键字
 - 创建函数
---

## IS关键字
### 概述
创建函数时，可以使用IS关键字。

### 使用
```
create function test2(n1 int, n2 int) returns int
is '
begin
    return n1 + n2;
end;
'language plpgsql;
select test2(3,4);
 test2 
-------
     7
(1 row)
```
