---
sidebar_position: 1
sidebar_label: 'Compatibility Parameters'
title: 兼容配置参数
tags:
  - Compatibility Parameters
---


## 参数名称和值
参数设置采用与原生 PostgreSQL 相同的方法。 所有参数名称都不区分大小写。 每个参数都采用以下五种类型之一的值：布尔值、字符串、整数、浮点数或枚举 (enum)。


### `compatible_mode (enum)`
此参数控制数据库服务器的行为。 默认值为 `postgres`，表示它是原生安装，服务器将作为原生 PG 安装。 如果它设置为“oracle”，那么查询的输出和系统行为整体会发生变化，因为它会更像 Oracle。

当设置为 `oracle` 时，此参数会隐式地将同样名字的Schema添加到 `search_path`。
以便可以定位 Oracle 兼容对象。

该参数可以通过`postgresql.conf`配置文件设置，对整个数据库生效。 或者可以通过客户端使用 `set` 命令在会话上进行设置。


### `nls_length_semantics (enum)`
此参数控制如何根据长度语义创建`CHAR`和`VARCHAR2`列。 默认设置为`NONE`，这不会产生任何影响。 `BYTE` 可以设置为以字节长度语义存储数据。 `CHAR` 使用字符长度语义。