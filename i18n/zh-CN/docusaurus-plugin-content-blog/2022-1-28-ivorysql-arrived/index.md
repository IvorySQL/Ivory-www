---
slug: IvorySQL
title: IvorySQL已经来了
authors: [official]
authorTwitter: IvorySql
tags: [IvorySQL, Welcome, Database, Oracle Compatible, PostgreSQL, Join Us]
---

![Hello](Hello-banner.png)  

正当全世界都在为节日打包行李，迎接新年的到来时，我们正努力工作，并为我们的团队从2021年初开始的项目做最后的润色。那天是12月15日，就在那天结束之前，我们得到了所有的绿灯，在清理桌子之前，我们默默地发布了IvorySQL的第一个版本。

## IvorySQL概览

IvorySQL是**Apache 2.0**许可的开源Oracle兼容PostgreSQL。IvorySQL的第一个版本源自PostgreSQL 14，它坚定地承诺始终保持100%的兼容性，并减少了对最新PostgreSQL的替换。 

IvorySQL在现有标准PostgreSQL配置参数的基础上添加了一个兼容的_db GUC。 ```compatible_db``` 是一个切换开关，用于在Oracle和PostgreSQL兼容模式之间切换。IvorySQL的第二大亮点是 ```PL/iSQL``` 支持oracle PL/SQL语法的过程语言。这两个新增功能在不破坏标准PostgreSQL兼容性的情况下，是IvorySQL的Oracle兼容性的核心。```compatible_db``` 切换在Oracle和PostgreSQL中存在的函数和对象的行为，并以不同的方式运行，而```PL/iSQL``` 为在最小的更改上运行IORYSQL的Oracle代码奠定了基础。 

IvorySQL具有许多与Oracle兼容的功能，包括Oracle风格的**PACKAGES**, **DATA Types**, 和 **Conversion Functions**. 有关IvorySQL中Oracle兼容性功能的详细信息，请参阅 *[IvorySQL文档](https://www.ivorysql.org/zh-CN/docs/intro)*   

## 我们致力于遵循开源方式的原则

IvorySQL致力于遵守 ***[open-source ways](https://opensource.com/open-source-way)*** 我们坚信建设一个健康、包容的社区。我们坚持认为好的想法可以来自任何地方，最好的想法应该获胜。只有包含不同的观点，我们才能做出最佳决策。虽然IvorySQL的第一个版本主要关注Oracle兼容性功能，但未来的路线图和功能集将由社区以开源的方式确定。

## 为IvorySQL做贡献

有很多方法可以帮助IvorySQL。您可以通过提供文档更新和文档翻译来做出贡献。如果你有设计技能，你可以为IvorySQL网站项目做出贡献。
测试IvorySQL和报告问题，通过发布bug修复或新功能的pull请求，或回答邮件列表上的问题，是对IvorySQL项目做出贡献的一些方式，IvorySQL社区欢迎并赞赏所有类型的贡献。

## 快速开始

所有与IvorySQL相关的项目，包括数据库服务器、网站和文档，都通过Github托管和管理。您可以通过IvorySQL [Github page](https://github.com/IvorySQL/)下载源代码或发布的软件包.  

浏览 http://www.ivorysql.org 阅读项目文档和贡献指南。

---

>通过订阅邮件列表加入IvorySQL社区： 
>- **[Hackers List](https://lists.ivorysql.org/postorius/lists/hackers.ivorysql.org/)**  
>- **[Users List](https://lists.ivorysql.org/postorius/lists/general.ivorysql.org/)**  
>  
>***还有，别忘了在[Github](https://github.com/IvorySQL/IvorySQL)给我们一个 :star: ***
