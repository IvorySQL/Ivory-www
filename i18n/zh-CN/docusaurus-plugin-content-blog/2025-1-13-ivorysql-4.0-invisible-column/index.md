---
slug: IvorySQL-Invisible Column
title: IvorySQL 4.0 之 Invisible Column 功能解析
authors: [official]
authorTwitter: IvorySql
tags: [IvorySQL, Database, Oracle Compatible, PostgreSQL, Invisible Column, 不可见列]
---

## 前言

随着数据库应用场景的多样化，用户对数据管理的灵活性和隐私性提出了更高要求。IvorySQL 作为一款基于 PostgreSQL 并兼容 Oracle 的开源数据库，始终致力于在功能上保持领先和创新。在最新发布的 4.0 版本中，**IvorySQL 新增了 Oracle 兼容特性 [Invisible Column](https://github.com/IvorySQL/IvorySQL/pull/679)（不可见列），这一功能由社区贡献者 [Imran Zaheer](https://github.com/imranzaheer612) 提供，体现了开源社区协作的力量**。

Invisible Column 的引入，为开发者提供了在不影响现有应用的情况下动态调整数据库结构的新选择，进一步提升了 IvorySQL 在数据灵活性管理上的能力，为用户在数据库升级、兼容性优化等方面提供了更大的便利性。

本文将详细介绍这一特性的功能、使用场景以及使用方式。

## 什么是 Invisible Column？

在现代数据库开发中，列的可见性管理在一定程度上影响了应用程序的灵活性与迁移效率。Oracle 12c 提供了一项强大的功能：Invisible Column（不可见列）。这是一种隐藏数据列的特性，用于增强数据安全性和实现业务逻辑。这一功能为开发者提供了灵活性和控制能力，特别是在应用程序迁移或版本升级的场景中。

在 Oracle 中，Invisible Column 是指那些对大多数 SQL 查询和工具不可见的列。通过将列设置为不可见列：

- 它不会出现在常规的 `SELECT * FROM` 查询结果中。
- 它不会在 `SQL*Plus` 或 `OCI` 的描述操作中显示。
- 它不会包含在基于 `%ROWTYPE` 属性的记录定义中。

然而，不可见列仍然存在于表中，可以通过显式指定列名来访问或引用。另外，不可见列在使用时也有限制，要注意在外部表（External Tables）、聚簇表（Cluster Tables）、临时表（Temporary Tables）中无法使用不可见列。

## Invisible Column 的应用场景

### 1. 应用程序迁移

不可见列在应用程序迁移过程中非常有用。当我们向现有表中添加新列时，不可见列可以避免影响旧应用程序的功能。旧的应用程序不会察觉新列的存在，而新的应用程序可以显式引用这些列。从而使应用程序的在线迁移变得更加简单顺畅。

### 2. 敏感数据保护

某些敏感数据可以通过不可见列存储，避免被大多数默认查询工具访问，从而降低意外暴露的风险。

### 3. 数据模型优化

在数据模型调整或调试过程中，可以临时将一些列设置为不可见列，确保它们不会影响常规查询，避免查询结果混淆。

## 在 IvorySQL 中使用 Invisible Column

Invisible Column 为 IvorySQL 4.0 版本中新增加的兼容特性，使用前请先确保您的版本为 4.0。

### 1. 创建不可见列

可以在创建表时直接将列定义为不可见列：

```
CREATE TABLE employees (
emp_id NUMBER,
emp_name VARCHAR2(50),
emp_salary NUMBER INVISIBLE
);
```

在此示例中，`emp_salary` 是不可见列，对默认查询不可见：

```
select*from employees ;
emp_id | emp_name
--------+----------
(0 rows)
```

### 2. 向不可见列插入数据

在向表中插入数据时，可以通过显式指定列名的方式向不可见列插入数据：

```
INSERT INTO employees(emp_id,emp_name,emp_salary) VALUES(1,'Jack',20000);
INSERT 0 1
INSERT INTO employees(emp_id,emp_name,emp_salary) VALUES(2,'Lucy',30000);
INSERT 0 1;
```

不带命名列的插入不能包含不可见列：

```
INSERT INTO employees VALUES(3,'Peter');
INSERT 0 1
```

### 3. 显示/修改现有列为不可见列

通过 `VISIBLE` 关键字，可以将不可见列改回普通列：

```
ALTER TABLE employees MODIFY emp_salary VISIBLE;
ALTER TABLE
```

如果需要将现有列设置为不可见列，可以使用 `INVISIBLE`：

```
ALTER TABLE employees MODIFY emp_salary INVISIBLE;
ALTER TABLE
```

注意，不能将所有的列设置为不可见列。

### 4. psql \d 元命令

在 psql 中使用 `\d` 元命令时不会显示该表的不可见列信息：

```
\d employees
                  Table "public.employees"
   Column   |     Type     | Collation | Nullable | Default 
------------+--------------+-----------+----------+---------
 emp_id     | number       |           |          | 
 emp_name   | varchar2(50) |           |          | 
 emp_salary | number       |           |          | 
```

可以使用含有更多表信息的 `\d+` 元命令查看该表的不可见列信息：

```
\d+ employees
                                                   Table "public.employees"
   Column   |     Type     | Collation | Nullable | Default | Invisible | Storage  | Compression | Stats target | Description 
------------+--------------+-----------+----------+---------+-----------+----------+-------------+--------------+-------------
 emp_id     | number       |           |          |         |           | main     |             |              | 
 emp_name   | varchar2(50) |           |          |         |           | extended |             |              | 
 emp_salary | number       |           |          |         | invisible | main     |             |              | 
Access method: heap
```

### 5. 访问 Invisible Column

在使用 `SELECT*` 查询表数据时，不会显示不可见列的数据：

```
SELECT * FROM employees ;
 emp_id | emp_name 
--------+----------
 1      | Jack
 2      | Lucy
 3      | Peter
(3 rows)
```

虽然不可见列对默认查询不可见，但开发者仍然可以通过显式指定列名来访问它：

```
SELECT emp_name,emp_salary FROM employees ;
 emp_name | emp_salary 
----------+------------
 Jack     | 20000
 Lucy     | 30000
 Peter    | 
(3 rows)
```

## 结语

不可见列功能是一项设计精妙的特性，为数据库开发和管理提供了更高的灵活性和安全性。通过合理利用不可见列，开发者可以轻松应对复杂的应用迁移场景，同时保持系统的稳定性和可扩展性。

如果您有正在使用 IvorySQL 数据库的项目，不妨尝试将此功能集成到您的解决方案中，提升整体效率和可靠性。