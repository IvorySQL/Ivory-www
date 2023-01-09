---
sidebar_position: 18
sidebar_label: 'Hierarchical Query'
title: Hierarchical Query
tags:
  - Hierarchical Query
---

## Hierarchical Query

The Hierarchical Query is a type of SQL statement that allows to operate on
the hierarchical data.

### Syntax

```
{ 
CONNECT BY [ NOCYCLE ] [PRIOR] condition [AND [PRIOR] condition]... [ START WITH condition ] 
| START WITH condition CONNECT BY [ NOCYCLE ] [PRIOR] condition [AND [PRIOR] condition]...
}
```

**CONNECT BY**
The query syntax starts with CONNECT BY keywords which define the hierarchical
interdependency between parent and child rows. The results must be further
qualified by specifying the PRIOR keyword in the condition part for CONNECT BY
clause.

**PRIOR**
The PRIOR keyword is a unary operator which links the previous row with the
current one. The keyword can be used on the left or the right hand side of the
equality condition.

**START WITH**
This clause specified from which row to start the hierarchy.

**NOCYCLE** 
a no-op clause. only syntactical support for now. This clause instructs to
return data even if a cycle exists.


### **Additional Columns**

**LEVEL**
Returns the level of the current row in the hierarchy starting at 1 for the root
node and incrementing by one for each level thereafter.

**CONNECT_BY_ROOT expr**
Return the parent column of current row in hierarchy.

**SYS_CONNECT_BY_PATH(col, chr)**
It is a function that returns the column values from the root to current node
separated by a character 'chr'.

### **Limitations**
Currently this feature has the following limitations.
- The additional columns can be used in most expression like function call, CASE statement and common expression, however there are few that are not supported like ROW, TYPECAST, COLLATE, GROUPING clauses etc.
-  an output column name may be needed in some cases where two or more column are identical like
    > SELECT CONNECT_BY_ROOT col AS "col1", CONNECT_BY_ROOT col AS "col2" ....
- Indirection operator or '*' is not supported.
- Loop detection is not supported.
