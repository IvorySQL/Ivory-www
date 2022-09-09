---
sidebar_position: 9
sidebar_label: 'Escape Characters'
title: Escape Characters
Tags:
 - Escape Character
---

## q\'
### Overview
q\' can be used to escape special characters. q\' escape character is usually used after\! \[\] \{\} \(\) \<\> and other escape symbols, you can also use \\, letters, numbers, \=, \+, \-, \*, \&, \$, \%, \#, etc. , Spaces are not allowed.

### Example
```
select q''' is goog '';
  ?column?
------------
 ' is goog
(1 row)
```
