---
slug: IvorySQL-package
title: IvorySQL功能点介绍--Package（包）
authors: [official]
authorTwitter: IvorySql
tags: [IvorySQL,功能点 , Database, Oracle Compatible, PostgreSQL, Join Us]
---





# 概述



IvorySQL 是一个开源项目，该项目的**核心目标之一是提供 oracle 兼容功能**，以便在 IvorySQL 数据库服务器上使用 oracle 代码。



在 PostgreSQL 之上提供 Oracle 兼容是一项多维任务。 从提供与 Oracle 兼容的 SQL 语法到添加对 PostgreSQL 中缺失或行为不同的数据类型的支持。 Oracle 兼容性的**主要核心之一是在 PostgreSQL 中提供兼容的过程语言PL（procedural language），它在功能和语法上与 Oracle 的 PL/SQL 兼容**。 



为此，**IvorySQL 添加了一种新的 PL 语言 PL/iSQL，它接受、理解和执行 PL/SQL 语法**。 如您所知，Oracle PL/SQL 的核心特性之一是 PACKAGES（包）。Package（包）是 Oracle 中的一个模式对象，它包含一组相关功能的定义，是 Oracle 使用最广泛的特性之一。



因此，本文将介绍Package（包），并举例说明**如何用 IvorySQL 创建、使用和销毁 Oracle 样式的包**。



# 包（Package）



那么什么是Package(包)？ 包是 PL/iSQL 代码的分组，按逻辑程序单元划分。 换句话说，一个包可以被认为是相关函数、过程、变量或游标的集合，这个集合可以通过通用公共名称来访问。

IvorySQL 内置PL/iSQL语言，可以接受、理解和执行PL/SQL代码。包使用相同的语言，并且有两个主要组件。



- **包规范（Specification）**

包规范列出了可以从包外部访问的所有项目,例如函数、过程、变量和游标。这也称为公共规范。

- **包体(Body)**

包体包含包规范中列出的所有函数和过程的实现。除此之外，它还可以实现更多的功能、过程或其他元素。



这些不在包规范中的元素将被视为包的私有成员，并且只能在包内引用它们。 不允许外部访问。



包体也可以有一个特殊的代码块，称为初始化块。 这是一个特殊的块，因为这个块在每个会话中只执行一次，在包第一次被访问的最开始。



让我们看一些代码示例，看看包是如何运行的。



# 示例



### 通用示例



首先让我们设置兼容模式，这样我们就可以访问 IvorysSQL数据库中可用的 Oracle 兼容特性。

SET compatible_mode TO oracle;

```
CREATE TABLE books (
    id     INT, 
    title  VARCHAR2(100), 
    author VARCHAR2(100),
    price  NUMBER);
```

```
INSERT INTO books VALUES (10, 'The Hobbit', 'J. R. R. Tolkien', 10.0);
INSERT INTO books VALUES (11, 'Winnie-the-Pooh', 'A. A. Milne', 5.0);
INSERT INTO books VALUES (12, 'Peter Pan', 'James Matthew Barrie', 4.0);
INSERT INTO books VALUES (13, 'Charlie and the Chocolate Factory', 'Roald Dahl', 5.0);
INSERT INTO books VALUES (14, 'SThe Jungle Book', 'Rudyard Kipling', 9.0);
INSERT INTO books VALUES (15, 'The Little White Bird', 'James Matthew Barrie', 3.0);
```



让我们来创建一个简单的包。这个包声明了一个游标来列出所有可用的图书，并包含一些子程序来列出、添加和删除书籍。同时，它还声明了一些私有变量来计数和保存图书信息。

```
CREATE OR REPLACE PACKAGE mybooks AS
    CURSOR      booksinfo IS SELECT * from BOOKS;

    PROCEDURE list_books;
    FUNCTION add_book(title VARCHAR2(100), author VARCHAR2(100), 
         price NUMBER) RETURN bool;
    PROCEDURE remove_book(book_title VARCHAR2(100));
END;
ivorysql$# /
CREATE PACKAGE
```

```
CREATE OR REPLACE PACKAGE BODY mybooks AS

    -- declare private variables
    bookinfo    booksinfo%rowtype; 
    books_count INT;

    PROCEDURE list_books AS
    BEGIN
        OPEN booksinfo;
        RAISE INFO 'Book Info:';
        RAISE INFO '';
        LOOP
            FETCH booksinfo into bookinfo;
            EXIT WHEN NOT FOUND;

            RAISE INFO '  Name    = %', bookinfo.title;
            RAISE INFO '  Author  = %', bookinfo.author;
            RAISE INFO '  Price   = %', bookinfo.price;
            RAISE INFO '------------------------------';
        END LOOP;
        RAISE INFO 'Total Books   = %', books_count;
        CLOSE booksinfo;
    END;

    FUNCTION add_book(title VARCHAR2(100), author VARCHAR2(100),
        price NUMBER) RETURN bool AS
    BEGIN
        INSERT INTO BOOKS VALUES (
            books_count + 1,
            title,
            author,
            price);
        
        books_count := books_count + 1;
        RETURN true;

        EXCEPTION WHEN OTHERS THEN
            RETURN false;
    END;

    PROCEDURE remove_book(book_title VARCHAR2(100)) AS
    BEGIN
        DELETE FROM BOOKS WHERE title = book_title;

        EXCEPTION WHEN OTHERS THEN
            RAISE INFO 'Book % not found', book_title;
    END;

-- initializer block
BEGIN           
    books_count := 0;
    SELECT count(*) INTO books_count
        FROM BOOKS;
END;
ivorysql$# /
CREATE PACKAGE BODY
```



让我们检验这些数据。这匿名块试图访问该包的私有成员，这将会导致错误。

```
ivorysql=# DECLARE
ivorysql$#   nbooks int := 0;
ivorysql$# BEGIN
ivorysql$#     nbooks := mybooks.books_count;
ivorysql$#     RAISE INFO 'Total Books   = %', nbooks;
ivorysql$# END;
ivorysql$# /
2022-05-26 16:35:32.328 PKT [63554] ERROR:  package private variable ("mybooks.books_count") is not accessible

```



让我们使用包的子程序列出所有可用的书籍。 `list_books`  `mybooks`

```
ivorysql=# BEGIN
ivorysql$#     mybooks.list_books;
ivorysql$# END;
ivorysql$# /
INFO:  Book Info:
INFO:  
INFO:    Name    = The Hobbit
INFO:    Author  = J. R. R. Tolkien
INFO:    Price   = 10
INFO:  ------------------------------
INFO:    Name    = Winnie-the-Pooh
INFO:    Author  = A. A. Milne
INFO:    Price   = 3
....
....
INFO:  Total Books   = 6
DO
ivorysql=#
```



让我们使用包的子程序添加一本新书。 `add_book` `mybooks `

```
DECLARE
  added bool;
BEGIN
    added := mybooks.add_book('The Cat in the Hat', 'Dr. Seuss', 10);
    IF added = TRUE THEN
        RAISE INFO 'new book added';
    END IF;
END;
/
```



### 删除包

可以使用以下命令删除包体或完成包：

- DROP PACKAGE BODY [package name]

```
ivorysql=# DROP PACKAGE BODY mybooks;
DROP PACKAGE BODY
```



- DROP PACKAGE [package name]

```
ivorysql=# DROP PACKAGE mybooks;
DROP PACKAGE
```



### 具有不同权限的包调用

我们将创建两个具有调用者和定义者权限的包，并查看结果以了解它们之间的区别。

```
ivorysql=> SELECT current_user;
 current_user 
--------------
 ivorysql
(1 row)
```



--创建具有INVOKER权限的包

```
CREATE OR REPLACE PACKAGE pkg_invrights AUTHID CURRENT_USER AS
    PROCEDURE curr_user;
END;
/

CREATE OR REPLACE PACKAGE BODY pkg_invrights AS
    PROCEDURE curr_user AS
    BEGIN
        RAISE INFO 'Current User: %', current_user;
    END;
END;
/
```



--创建一个具有DEFINER权限的包

```
CREATE OR REPLACE PACKAGE pkg_defrights AUTHID DEFINER AS
    PROCEDURE curr_user;
END;
/

CREATE OR REPLACE PACKAGE BODY pkg_defrights AS
    PROCEDURE curr_user AS
    BEGIN
        RAISE INFO 'Current User: %', current_user;
    END;
END;
/
```



让我们先查看具有调用程序权限的包。

```
ivorysql=> CALL pkg_invrights.curr_user;
INFO:  Current User: ivorysql
CALL
```



让我们来看看具有定义权限的包。

```
ivorysql=> CALL pkg_defrights.curr_user;
INFO:  Current User: ivorysql
CALL
```



让我们切换到另一个名为ivuser的用户。

```
ivorysql=> \c ivorysql ivuser;
You are now connected to database "ivorysql" as user "ivuser".
```



让我们先看看具有调用程序权限的包。

```
ivorysql=> CALL pkg_invrights.curr_user;
INFO:  Current User: ivuser
CALL
```



让我们看看具有定义权限的包。

```
ivorysql=> CALL pkg_defrights.curr_user;
INFO:  Current User: ivorysql
CALL
```



# 总结



如上所示，当调用具有调用者权限(pkg_invrights)的包时，它使用的是调用该包的用户的特权。但是，当调用(pkg_defrights)时，它仍然使用包所有者的特权。





![p](p-1.png)

---

>通过订阅邮件列表加入IvorySQL社区： 
>- **[Hackers List](https://lists.ivorysql.org/postorius/lists/hackers.ivorysql.org/)**  
>- **[Users List](https://lists.ivorysql.org/postorius/lists/general.ivorysql.org/)**  
>- 官方微信公众号：**IvorySQL开源数据库社区**
>
>***还有，别忘了在[Github](https://github.com/IvorySQL/IvorySQL)给我们一个 :star: ***
