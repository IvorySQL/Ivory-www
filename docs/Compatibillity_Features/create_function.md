---
sidebar_position: 5
sidebar_label: 'Create Function'
title: Create Function
Tags:
 - Create Function
 - IS Keyword
---

## IS keyword
### Overview
Create function statement supports oracle compitable syntax with 'IS keyword'.
### Example
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

