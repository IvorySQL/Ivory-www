---
sidebar_position: 1
sidebar_label: '配置参数'
title: 兼容配置参数
tags:
  - Compatibility Parameters
---



| 参数名 | 描述 |
| ----------- | ----------- |
| ivorysql.compatible_mode | 表示当前兼容哪种数据库（pg/oracle），可以通过show命令查看，set命令更改该变量，reset命令重置为连接时的数据库模式，reset all会影响该变量 |
| ivorysql.database_mode | 表示当前数据库的模式（pg/oracle），可以通过show命令查看，set/reset/reset all命令不影响该变量|
| ivorysql.datetime_ignore_nls_mask | 表示日期格式是否会受NLS参数影响，默认为0，可以通过set命令设置，reset 命令重置，reset all命令会重置该变量|
| ivorysql.enable_emptystring_to_NULL | 取值为（on/off）,该变量为on时，会将插入的空字符串转成NULL值存储|
| ivorysql.identifier_case_switch | 设置字符大小写转换模式|
| ivorysql.listen_address | 表示兼容模式监听的地址，在初始化数据库时，从ivorysql.conf文件中读取该配置，在配置文件中修改该值，需要重启数据库生效，可以通过show命令查看|
| ivorysql.port | 表示兼容模式下连接的端口号，在初始化数据库时，从ivorysql.conf文件中读取该配置，在配置文件中修改该值，需要重启数据库生效，可以通过show命令查看|
| nls_date_format | 表示默认的日期格式，可以通过show命令查看，默认为‘YYYY-MM-DD’，可以通过set命令设置，可以通过reset命令重置回默认值，reset all 命令会重置该变量|
| nls_length_semantics | 兼容Oracle的同名参数，控制一个字符所占内存的大小|
| nls_timestamp_format | 兼容Oracle的同名参数，控制带时间的日期格式|
| nls_timestamp_tz_format | 兼容Oracle的同名参数，控制带时区的日期格式|
| shared_preload_libraries | 在初始化数据库时，从ivorysql.conf文件中读取，可以通过show命令查看，在配置文件中修改该值，重启数据库生效。|
