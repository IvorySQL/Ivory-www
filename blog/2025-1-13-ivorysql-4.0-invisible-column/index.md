---
slug: IvorySQL-Invisible Column
title: Analysis of the Invisible Column Feature in IvorySQL 4.0
authors: [official]
authorTwitter: IvorySql
tags: [IvorySQL, Database, Oracle Compatible, PostgreSQL, Invisible Column]
---

## Preface

With the diversification of database application scenarios, users have raised higher demands for data management flexibility and privacy. IvorySQL, an open-source database based on PostgreSQL and compatible with Oracle, has always been committed to staying ahead and innovating in terms of functionality. In the recently released version 4.0, IvorySQL introduced a new Oracle-compatible feature, [Invisible Column](https://github.com/IvorySQL/IvorySQL/pull/679), contributed by community member [Imran Zaheer](https://github.com/imranzaheer612), demonstrating the power of open-source collaboration.

The introduction of Invisible Column provides developers with a new option to dynamically adjust the database structure without affecting existing applications. This further enhances IvorySQL's ability in data flexibility management, offering users greater convenience in areas such as database upgrades and compatibility optimization.

This article will provide a detailed introduction to the functionality, use cases, and usage of this feature.

## What is Invisible Column?

In modern database development, column visibility management plays a significant role in affecting the flexibility and migration efficiency of applications. Oracle 12c introduced a powerful feature: Invisible Column. This feature allows columns to be hidden, enhancing data security and implementing business logic. It provides developers with flexibility and control, especially in scenarios such as application migration or version upgrades.

In Oracle, an Invisible Column refers to columns that are invisible to most SQL queries and tools. By setting a column as an invisible column:

- It will not appear in the results of a regular `SELECT * FROM` query.
- It will not be displayed in description operations in `SQL*Plus` or `OCI`.
- It will not be included in record definitions based on the `%ROWTYPE` attribute.

However, invisible columns still exist in the table and can be accessed or referenced by explicitly specifying the column name. Additionally, there are restrictions when using invisible columns, as they cannot be used in external tables, cluster tables, or temporary tables.

## Applications of Invisible Column

### 1. Application Migration

Invisible columns are very useful in application migration processes. When adding new columns to an existing table, invisible columns can prevent the new columns from affecting the functionality of old applications. The old applications will not be aware of the new columns, while the new applications can explicitly reference them. This makes the online migration of applications smoother and simpler.

### 2. Sensitive Data Protection

Certain sensitive data can be stored in invisible columns to prevent it from being accessed by most default query tools, thereby reducing the risk of accidental exposure.

### 3. Data Model Optimization

During data model adjustments or debugging, some columns can be temporarily set as invisible to ensure they do not impact regular queries, thus avoiding confusion in query results.

## Using Invisible Columns in IvorySQL

Invisible Column is a newly added compatibility feature in IvorySQL 4.0. Please make sure your version is 4.0 before using it.

### 1. Creating Invisible Columns

You can define a column as an invisible column directly when creating the table:

```
CREATE TABLE employees (
emp_id NUMBER,
emp_name VARCHAR2(50),
emp_salary NUMBER INVISIBLE
);
```

In this example, `emp_salary` is an invisible column, which is not visible in the default query:

```
SELECT * FROM employees;
emp_id | emp_name
--------+----------
(0 rows)
```

### 2. Inserting Data into Invisible Columns

When inserting data into the table, you can explicitly specify the column name to insert data into an invisible column:

```
INSERT INTO employees(emp_id, emp_name, emp_salary) VALUES(1, 'Jack', 20000);
INSERT 0 1
INSERT INTO employees(emp_id, emp_name, emp_salary) VALUES(2, 'Lucy', 30000);
INSERT 0 1;
```

Inserts without specifying column names cannot include invisible columns:

```
INSERT INTO employees VALUES(3, 'Peter');
INSERT 0 1
```

### 3. Displaying/Modifying Existing Columns as Invisible

You can use the `VISIBLE` keyword to change an invisible column back to a regular column:

```
ALTER TABLE employees MODIFY emp_salary VISIBLE;
ALTER TABLE
```

To set an existing column as an invisible column, you can use `INVISIBLE`:

```
ALTER TABLE employees MODIFY emp_salary INVISIBLE;
ALTER TABLE
```

Note that not all columns can be set as invisible.

### 4. psql \d Meta-Command

When using the `\d` meta-command in psql, the invisible column information will not be displayed:

```
\d employees
                  Table "public.employees"
   Column   |     Type     | Collation | Nullable | Default 
------------+--------------+-----------+----------+---------
 emp_id     | number       |           |          | 
 emp_name   | varchar2(50) |           |          | 
 emp_salary | number       |           |          | 
```

To view more detailed table information, including the invisible columns, you can use the `\d+` meta-command:

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

### 5. Accessing Invisible Columns

When using a `SELECT *` query to retrieve table data, invisible column data will not be displayed:

```
SELECT * FROM employees;
 emp_id | emp_name 
--------+----------
 1      | Jack
 2      | Lucy
 3      | Peter
(3 rows)
```

Although invisible columns are not visible in the default query, developers can still access them by explicitly specifying the column names:

```
SELECT emp_name, emp_salary FROM employees;
 emp_name | emp_salary 
----------+------------
 Jack     | 20000
 Lucy     | 30000
 Peter    | 
(3 rows)
```

## Conclusion

The invisible column feature is a cleverly designed functionality that provides greater flexibility and security for database development and management. By effectively utilizing invisible columns, developers can easily handle complex application migration scenarios while maintaining system stability and scalability.

If you have a project that uses IvorySQL database, consider integrating this feature into your solution to enhance overall efficiency and reliability.