---
sidebar_position: 10
sidebar_label: 'Sequence'
title: Sequence
Tags:
 - Sequence
---

## Sequence Syntax Enhancements
### Overview
Column reference can be used to call nextval or currval.
### Syntax
```
SELECT [ database {schema} | schema ] sequence {nextval | currval};
```
#### **Parameters**
```sequence```
	Sequence name.  
### Example
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
