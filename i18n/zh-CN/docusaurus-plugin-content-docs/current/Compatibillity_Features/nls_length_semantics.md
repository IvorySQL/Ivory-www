---
sidebar_position: 13
sidebar_label: 'NLS_LENGTH_SEMANTICS参数'
title: NLS_LENGTH_SEMANTICS参数
Tags:
 - NLS_LENGTH_SEMANTICS参数
---

# NLS_LENGTH_SEMANTICS

## 概述

NLS_LENGTH_SEMANTICS 使您能够使用字节或字符长度语义创建 CHAR 和 VARCHAR2 列。 现有列不受影响。 在这种情况下，默认语义是 BYTE。

## 语法

```
SET NLS_LENGTH_SEMANTICS TO [NONE | BYTE | CHAR];
```
### **取值范围说明**

```
BYTE:数据以字节长度来存储。
CHAR:数据以字符长度来存储。
NONE:数据使用原生PostgreSQL存储方式。
```

## 用例

### --测试“CHAR”

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

### --测试“BYTE”

```
SET NLS_LENGTH_SEMANTICS TO BYTE;
SET

SHOW NLS_LENGTH_SEMANTICS;
 nls_length_semantics
----------------------
 byte
(1 row)

insert into test values ('李老师您好');
2021-12-14 15:28:11.906 HKT [6774] ERROR:  value too long for type varchar2(5 byte)
2021-12-14 15:28:11.906 HKT [6774] STATEMENT:  insert into test values ('李老师您好');
ERROR:  value too long for type varchar2(5 byte)
```
