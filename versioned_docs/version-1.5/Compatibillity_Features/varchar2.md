---
sidebar_position: 15
sidebar_label: 'VARCHAR2(size)'
title: VARCHAR2(size)
Tags:
 - VARCHAR2(size)
---

# VARCHAR2(size)

## Overview

Variable-length character string having maximum length size bytes or characters. You must specify size for VARCHAR2. Minimum size is 1 byte or 1 character.

## Syntax

```
VARCHAR2(size)
```

## Example

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
