---
slug: IvorySQL
title: IvorySQL Has Arrived
authors: [official]
authorTwitter: IvorySql
tags: [IvorySQL, Welcome, Database, Oracle Compatible, PostgreSQL, Join Us]
---

![Hello](Hello-banner.png)  

Just when the world was packing the bags for the holiday season and getting ready to welcome the New year we were hard at work and were giving the final touches to the project that our team was working on since the start of 2021. And it was the 15th of December just before the day end we got all green lights and silently released the very first version of IvorySQL before cleaning up the desk for that day.

## IvorySQL at Glance

IvorySQL is **Apache 2.0** licensed Open Source Oracle compatible PostgreSQL. The very first release of IvorySQL is derived from PostgreSQL 14 with a firm commitment to always remain 100% compatible and a Drop-in replacement of the latest PostgreSQL.  

IvorySQL adds a compatible_db GUC on top of existing standard PostgreSQL configuration parameters. The ```compatible_db``` is a toggle switch to switch between Oracle and PostgreSQL compatibility modes. The second major highlight of IvorySQL is ```PL/iSQL``` procedural language that supports oracle’s PL/SQL syntax. These two additions sit at the core of Oracle compatibility of IvorySQL without breaking the standard PostgreSQL compatibility. The ```compatible_db``` switches the behavior of functions and objects that exist in both Oracle and PostgreSQL and acts differently, while ```PL/iSQL``` builds the foundation for running the oracle code on IvorySQL with minimal changes.  

IvorySQL comes with numerous Oracle compatibility features including Oracle style  **PACKAGES**, **DATA Types**, and **Conversion Functions**. For details of Oracle compatibility features in IvorySQL refer to *[IvorySQL documentation](https://www.ivorysql.org/docs/intro)*   

## We are committed to following the principles of open source way

IvorySQL is committed to abiding by the principles of ***[open-source ways](https://opensource.com/open-source-way)*** and we strongly believe in building a healthy and inclusive community. We maintain that good ideas can come from anywhere, and the best ideas should win. Only by including diverse perspectives, we can reach to the best decision. While the first version of IvorySQL is mainly focused on Oracle Compatibility features, going forward the future road map and feature set will be determined by the community in an open-source way.

## Contributing to the IvorySQL

There are plenty of ways to contribute to IvorySQL. You can contribute by providing the documentation updates, by providing the translations for the documentation. If you have design skills you can contribute to the IvorySQL website project.  
Testing the IvorySQL and reporting issues, by issuing pull requests for bug fixes or new features or answering the questions on mailing lists are some ways to contribute to the IvorySQL project and all types of contributions are welcomed and appreciated by the IvorySQL community.  

## Getting Started

All IvorySQL related projects including database server, website, and documentation are hosted and managed through Github. You can download the source code or released packages and track the current issues, pull requests, and discussions through the IvorySQL [Github page](https://github.com/IvorySQL/).  

Visit http://www.ivorysql.org and read the project documentation and contribution guidelines.  

---

>Join the IvorySQL community by subscribing to mailing lists:  
>- **[Hackers List](https://lists.ivorysql.org/postorius/lists/hackers.ivorysql.org/)**  
>- **[Users List](https://lists.ivorysql.org/postorius/lists/general.ivorysql.org/)**  
>  
>***Also, don't forget to give us a :star: on [Github](https://github.com/IvorySQL/IvorySQL)***
