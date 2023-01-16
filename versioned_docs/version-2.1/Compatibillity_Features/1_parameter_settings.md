---
sidebar_position: 1
sidebar_label: 'Compatibility Parameters'
title: Compatibility Parameters
tags:
  - Compatibility Parameters
---


## Parameter Names and Values
The parameter settings take the same approach as native PostgreSQL. All parameter names are case-insensitive. Every parameter takes a value of one of five types: boolean, string, integer, floating point, or enumerated (enum).


### `compatible_mode (enum)`
This parameter controls the behavior of the database server. The default value is `postgres` which indicates that it's native installation and the server will behave as native PG installation. If it's set to  `oracle` then the output of the queries and system behavior overall changes, as it's expected to be more like Oracle.

When set to `oracle`, this parameter adds a schema of the same name to the `search_path` implicitly.
So that Oracle compatible objects can be located.

The parameter can be set through the `postgresql.conf` configuration file to take effect for the whole cluster. Or it can be set on session based through the client using the `set` command.


### `nls_length_semantics (enum)`
This parameter controls how to create `CHAR` and `VARCHAR2` columns based on length semantics. The default is set to `NONE` which does not effect anything. `BYTE` can be set to store data with byte length semantics. `CHAR` to use the char length semantics.
