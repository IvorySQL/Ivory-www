---
sidebar_position: 9
sidebar_label: '转义字符'
title: 转义字符
Tags:
 - Escape Character
 - 转义字符
---

## q\' feature
### 概述
使用 q\' 转义特殊字符。q\' 转义字符通常在\! \[\] \{\} \(\) \<\> 和其他转义字符之后使用, 您也可以使用 \\, 也可以使用字母, 数字, \=, \+, \-, \*, \&, \$, \%, \#, 等, 不允许使用空格。

### 示例
```
select q''' is goog '';
  ?column?
------------
 ' is goog
(1 row)
```
