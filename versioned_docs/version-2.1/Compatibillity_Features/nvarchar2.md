---
sidebar_position: 14
sidebar_label: 'NVARCHAR2(size)'
title: NVARCHAR2(size)
Tags:
 - NVARCHAR2(size)
---

# NVARCHAR2(size)

## Overview

Variable-length Unicode character string having maximum length size characters. You must specify size for NVARCHAR2. The number of bytes can be up to two times size for AL16UTF16 encoding and three times size for UTF8 encoding.

## Syntax

```
NVARCHAR2(size)
```

## Example

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
