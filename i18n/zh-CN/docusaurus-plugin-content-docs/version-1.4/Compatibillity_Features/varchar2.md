---
sidebar_position: 15
sidebar_label: 'VARCHAR2(size)类型'
title: VARCHAR2(size)类型
Tags:
 - VARCHAR2(size)类型
---

# VARCHAR2(size)

## 概述

具有最大长度大小字节或字符的可变长度字符串。 您必须为 VARCHAR2 指定大小。 最小大小为 1 个字节或 1 个字符。

## 语法

```
VARCHAR2(size)
```

## 用例

```
create table test(a varchar2(5));
CREATE TABLE

SET NLS_LENGTH_SEMANTICS TO CHAR;
SET

SHOW NLS_LENGTH_SEMANTICS;
 nls_length_semantics
----------------------
 char
(1 row)

insert into test values ('李老师您好');
INSERT 0 1
```
