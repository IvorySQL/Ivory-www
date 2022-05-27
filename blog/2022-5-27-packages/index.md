---
slug: IvorySQL-Packages
title: Introduction to IvorySQL Packages
authors: [Asif]
tags: [IvorySQL, Oracle, Packages, PostgreSQL, Join Us]
---

# Introduction to IvorySQL Packages

IvorySQL is an open source project. One of the core goals of this project is to deliver oracle
compatibility, So that one can use the oracle code on IvorySQL database server.

Providing Oracle compatibility on top of PostgreSQL is a multi-dimensional task. Ranging from providing the Oracle compatible SQL syntax to adding support for data types that are either missing or behaves differently in PostgreSQL. One of the main core of Oracle compatibility is to provide the compatible PL (procedural language) in PostgreSQL that is functionally and syntactical compatible with Oracle's PL/SQL. For that purpose IvorySQL has added a new PL language PL/iSQL that that accepts, understands and executes the PL/SQL syntax.
And as you know one of the core feature of Oracle's PL/SQL is the PACKAGES.
Package is a schema object in Oracle that contains definitions for a group of related functionalities and is one of the most widely used feature of Oracle.

So In this blog I will give a introduction of Packages followed by an example on how you can create, use, and destroy Oracle style packages with IvorySQL.


## Packages

So what are packages? The Packages are grouping of PL/iSQL code, divided in logical program units. In other words
a package can be considered a collection of related functions, procedures, variables or cursors. This collection is
collectively be accessed via the common name.

IvorySQL has PL/iSQL language that accepts, understands and executes the PL/SQL code. The packages use this same language. The packages have two main components.

- Package Specification
The package specification lists all the items that can be accessed from outside the package. such as functions, procedures, variables and cursors. This is also know as public specification.

- Package Body
The Package Body contains the implementation of all functions and procedures that are listed in the package specification. In addition these, it can also implement more function and procedure or other elements.

These elements that are not in the package specification, will be treated private members of the package and these can only be referenced from within the package. The outside access is not permitted.

The package body can also have a special code block called initializer block. This is a special because this block is
executed only once per session, at the very beginning when the package is first accessed.


Let's see some example of the code and see how a package operates.

## Example

### Generic Example
First let's set the compatibility mode, so we can access oracle compatible features available in the ivorysql database.

```SET compatible_mode TO oracle;```

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


Let's create a simple package. This package declares a cursor to list all available books. Have some subprograms to list, add and remove books. It also declares a some private variables to keep count and book information.

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

Let checkout the count. This anonymous block tries to access the private members of the package, which should result in error.
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

Let's list all available books using the subprogram ```list_books``` of the package ```mybooks```.
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

Let's add a new book using the subprogram ```add_book``` of the package ```mybooks```.
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

### Dropping a Package

One can either drop the package body or complete package using:
- DROP PACKAGE BODY [package name]

```
ivorysql=# DROP PACKAGE BODY mybooks;
DROP PACKAGE BODY
```
- DROP PACKAGE [package name
```
ivorysql=# DROP PACKAGE mybooks;
DROP PACKAGE
```

### Package Invocation with different rights
We are going to create two packages with invoker and definer rights and watch the results to see how they differentiate.

```
ivorysql=> SELECT current_user;
 current_user 
--------------
 ivorysql
(1 row)
```

-- Create a Package with INVOKER rights
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

-- Create a Package with DEFINER rights
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

Let's see the package with invoker rights first.
```
ivorysql=> CALL pkg_invrights.curr_user;
INFO:  Current User: ivorysql
CALL
```
Let's see the package with definer rights.
```
ivorysql=> CALL pkg_defrights.curr_user;
INFO:  Current User: ivorysql
CALL
```
Let's switch to another user named ```ivuser```
```
ivorysql=> \c ivorysql ivuser;
You are now connected to database "ivorysql" as user "ivuser".
```
Let's see the package with invoker rights first.
```
ivorysql=> CALL pkg_invrights.curr_user;
INFO:  Current User: ivuser
CALL
```
Let's see the package with definer rights.
```
ivorysql=> CALL pkg_defrights.curr_user;
INFO:  Current User: ivorysql
CALL
```

As shown above when the package with invoker rights (```pkg_invrights```) is called, it's using the privileges of the user that invoked the package. However, when a definer package (```pkg_defrights```) is called, it still uses the privileges of the package owner.
