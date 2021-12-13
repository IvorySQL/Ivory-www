---
sidebar_position: 14
sidebar_label: 'NVARCHAR2(size)'
title: NVARCHAR2(size)类型
Tags:
 - NVARCHAR2(size)类型
---

# NVARCHAR2(size)

## 概述

具有最大长度大小字符的可变长度 Unicode 字符串。 您必须为 NVARCHAR2 指定大小。 AL16UTF16 编码的字节数最多为 2 倍，UTF8 编码的字节数最多为 3 倍。

## 语法

```
NVARCHAR2(size)
```

## 用例

```
create table test(a nvarchar2(5));
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
