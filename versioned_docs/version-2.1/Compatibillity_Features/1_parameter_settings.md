---
sidebar_position: 1
sidebar_label: 'Compatibility Parameters'
title: Compatibility Parameters
tags:
  - Compatibility Parameters
---



| Parameter | Description|
| ----------- | ----------- |
| ivorysql.compatible_mode | Indicates which database (pg/oracle) is currently compatible with, which can be viewed through the show command. The set command changes this variable, and the reset command resets it to the database mode at the time of connection. Resetting all will affect this variable|
| ivorysql.database_mode | Indicates the current database schema (pg/oracle), which can be viewed through the show command. The set/reset/reset all command does not affect this variable|
| ivorysql.datetime_ignore_nls_mask | Indicates whether the date format will be affected by the NLS parameter. The default value is 0, which can be set using the set command. The reset command resets the date format, and the reset all command resets the variable|
| ivorysql.enable_emptystring_to_NULL | The value is (on/off), and when this variable is on, it will convert the inserted empty string into a NULL value for storage|
| ivorysql.identifier_case_switch | Set character case conversion mode|
| ivorysql.listen_address | Indicates the address for compatibility mode |listening. When initializing the database, read the configuration from the ivorysql.conf file, modify the value in the configuration file, and restart the database to take effect. This can be viewed through the show command|
| ivorysql.port | Indicates the port number for connecting in compatibility mode. When initializing the database, read the configuration from the ivorysql.conf file and modify the value in the configuration file. To take effect, restart the database and view it through the show command|
| nls_date_format | Represents the default date format, which can be viewed through the show command and defaults to 'YYYY-MM-DD'. It can be set through the set command and reset back to the default value through the reset command. The reset all command will reset this variable|
| nls_length_semantics | Compatible with oracle parameters of the same name, controlling the size of memory occupied by a character|
| nls_timestamp_format | Compatible with oracle parameters of the same name, controlling date format with time|
| nls_timestamp_tz_format | Compatible with oracle parameters of the same name, controlling the date format with time zone|
| shared_preload_libraries | When initializing the database, read from the ivorysql.conf file and view it through the show command. Modify the value in the configuration file and restart the database to take effect.|

