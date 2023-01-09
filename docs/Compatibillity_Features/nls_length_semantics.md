---
sidebar_position: 13
sidebar_label: 'NLS_LENGTH_SEMANTICS'
title: NLS_LENGTH_SEMANTICS
Tags:
 - NLS_LENGTH_SEMANTICS
---

# NLS_LENGTH_SEMANTICS

## Overview

NLS_LENGTH_SEMANTICS enables you to create CHAR and VARCHAR2 columns using either byte or character length semantics. Existing columns are not affected. in which case the default semantics is BYTE.

## Syntax

```
SET NLS_LENGTH_SEMANTICS TO [NONE | BYTE | CHAR];
```
### **Range of values**

```
BYTE:Data is stored in bytes
CHAR:Data is stored in characters
NONE:PostgreSQL native storage method
```

## Example

### --test for CHAR

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

### --test for BYTE

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
