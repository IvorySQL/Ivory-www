---
 sidebar_position: 18
 sidebar_label: '层级查询'
 title: 层级查询
 Tags:
 - Hierarchical Query
 - SQL
---

## 层级查询

层级查询是一种允许对分层数据进行操作的 SQL 语句.

### 语法

```
 {
 CONNECT BY [ NOCYCLE ] [PRIOR] condition [AND [PRIOR] condition]... [ START WITH condition ]
 | START WITH condition CONNECT BY [ NOCYCLE ] [PRIOR] condition [AND [PRIOR] condition]...
 }
```

**CONNECT BY**
查询语法以 CONNECT BY 关键字开头，这些关键字定义了父行和子行之间的分层相互依赖关系。
必须通过在 CONNECT BY 子句的条件部分指定 PRIOR 关键字来进一步限定结果.

**PRIOR**
PRIOR 关键字是一元运算符，它将前一行与当前行联系起来。
此关键字可以用在相等条件的左边或右边。

**START WITH**
该子句指定从哪一行开始层次结构。

**NOCYCLE**
无操作语句。
目前只有语法支持。
该子句表示即使存在循环也返回数据。


### **附加列**

**LEVEL**
返回层次结构中当前行的级别，从根节点的 1 开始，之后每级别递增 1。

**CONNECT_BY_ROOT expr**
返回层次结构中当前行的父列。

**SYS_CONNECT_BY_PATH(col, chr)**
它是一个返回从根到当前节点的列值的函数，由字符“chr”分隔。

### **限制**
目前此功能有以下限制：

-   附加列可用于大多数表达式，如函数调用、CASE 语句和通用表达式，但有一些不受支持的列，如 ROW、TYPECAST、COLLATE、GROUPING 子句等
-   两个或多个列相同的情况下，可能需要输出列名，例如
    > SELECT CONNECT_BY_ROOT col AS "col1", CONNECT_BY_ROOT col AS "col2" ....

-   不支持间接运算符或“*”
-   不支持循环检测（Loop detection）
