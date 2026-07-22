---
slug: oracle-compat-kernel
title: "Why Can Oracle Run on PostgreSQL? The Answer Lies in the Kernel"
authors: [ZhangChen]
category: IvorySQL
image: img/blog/covers/oracle-compat-kernel-en.png
tags: [IvorySQL, Oracle, PostgreSQL, Kernel, PL/iSQL, Migration]
---

In recent years, more and more enterprises have been evaluating migration from Oracle to PostgreSQL. The reasons are clear: high licensing costs, vendor lock-in, and increasing pressure for open-source alternatives. PostgreSQL is mature and has an active ecosystem. But once a migration project actually starts, the real challenge is rarely data migration — it's the Oracle habits deeply embedded in the organization.

A legacy system doesn't just store tables in Oracle. Business logic lives in stored procedures, functions, triggers, and packages. SQL is full of `ROWNUM`, `SYSDATE`, `DUAL`, `NUMBER`, `VARCHAR2`. Applications query `ALL_TAB_COLUMNS` and `DBA_PROCEDURES`. Then there are subtle behavioral differences: empty strings treated as NULL, implicit type conversions, case rules, NLS parameters.

This is the hardest part of Oracle-to-PG migration: full PG syntax rewrites mean massive application changes and extended testing cycles; superficial SQL rewrites can't cover stored procedures, packages, and data dictionary dependencies.

**IvorySQL** was created to solve exactly this problem. It's a deeply Oracle-compatible kernel in the PG ecosystem, tracking the latest community releases, and it's open-source and free.

## What Is IvorySQL?

IvorySQL is an open-source database project built on PostgreSQL. Its goal is to provide deep Oracle compatibility while preserving PG's kernel capabilities and ecosystem compatibility. It's not a rewrite, nor is it a string replacement layer — it works at the PostgreSQL kernel, extension, and system object level.

The compatibility scope covers: Oracle mode entry, independent Oracle parser, Oracle data types, implicit conversions, PL/iSQL, Packages, built-in functions, built-in packages, system views, `ROWNUM`, `ROWID`, `FORCE VIEW`, MERGE semantics, sequence behavior, and session-level differences like NLS, empty strings, and identifier case.

This is what sets it apart from typical compatibility layers. IvorySQL focuses on whether your application can run with its original business logic.

## How IvorySQL Achieves Oracle Compatibility: From Source Code

### Dual Parser Architecture

The compatibility entry point is mode isolation. `ora_compatible.h` defines database types (`DB_PG`, `DB_ORACLE`) and parser types (`PG_PARSER`, `ORA_PARSER`). Oracle mode defines a specialized search path:

```c
#define ORA_SEARCH_PATH "sys,\"$user\", public"
```

`sys` comes first so Oracle-compatible objects are found first. Mode switching is controlled by two variables in `ivy_guc.c`:

```c
int database_mode = DB_PG;
int compatible_db = PG_PARSER;
```

The dual parser approach at `parser.c` uses two function pointers:

```c
raw_parser_hook_type sql_raw_parser = standard_raw_parser;
raw_parser_hook_type ora_raw_parser = NULL;
```

`raw_parser()` no longer calls the PG parser directly — it calls `(*sql_raw_parser)`. In Oracle mode, the pointer switches to `ora_raw_parser`. This is crucial: rather than stuffing Oracle syntax into PG's grammar (a maintenance nightmare), the two parsers diverge at the raw parse stage, then both feed into PostgreSQL's analysis, rewriting, optimization, and execution framework.

### ROWNUM Handling

`ROWNUM` isn't a normal column or a window function. Its assignment timing depends on scan, qual, sort, and limit phases. IvorySQL handles it at multiple levels:
- `parse_expr.c` generates `RownumExpr` when `rownum` appears in Oracle mode
- `execExprInterp.c` implements `ExecEvalRownum()` from executor state
- The optimizer in `planner.c` converts simple `ROWNUM <= N` patterns to `LIMIT`, but only when semantically equivalent

### Type System

IvorySQL adds Oracle-compatible types in `pg_type.dat` under the `sys` namespace: `number`, `binary_float`, `binary_double`, `blob`, `clob`, `raw`, `long`, `rowid`, `urowid`, `yminterval`, `dsinterval`. These types include I/O functions, typmod, casts, operators, btree/hash/brin opclasses, comparison functions, and sort support.

Implicit type conversion uses Oracle's precedence rules via `compatible_oracle_precedence.c`, only activated in Oracle mode. This lets string-to-number conversions work like Oracle without affecting PG mode behavior.

### PL/iSQL and Packages

PL/iSQL is implemented in `src/pl/plisql/src`. Packages are not stored as plain text — IvorySQL adds `pg_package` and `pg_package_body` system catalogs with their own indexes and syscache. `PackageCache` in `CacheMemoryContext` uses syscache callbacks for invalidation, linking to plan cache on DDL changes.

### Compatible Objects

Through the `ivorysql_ora` extension and `sys` schema, IvorySQL provides: Oracle functions (`sysdate`, `add_months`, `nvl`, `decode`, etc.), built-in packages (`dbms_output`, `dbms_lock`, `utl_file`), and Oracle-style data dictionary views (`SYS.DBA_PROCEDURES`, `SYS.ALL_TAB_COLUMNS`).

Additional features: `FORCE VIEW`, MERGE hooks, Oracle sequence behavior, `ROWID`/`UROWID` support at the executor level, empty-string-to-NULL, identifier case switching, and NLS parameters.

## Why Oracle Compatibility Doesn't Hurt Performance

Any feature has its own execution cost. Oracle types, functions, PL/iSQL, and packages can't be free. But IvorySQL's design ensures Oracle compatibility doesn't burden PG queries:

1. **Parser divergence at session start**: PG sessions use `standard_raw_parser`; Oracle sessions use `ora_raw_parser`. No per-query parser switching.

2. **Hook triggers are conditional**: Type precedence hooks only activate when no suitable operator is found AND in Oracle mode. Package lookups check parser type first.

3. **Native object integration**: Oracle types use PG's own function calls, expression evaluation, sorting, indexing, and caching. No external rewriting layer.

4. **Package caching**: `PackageCache` avoids repeated catalog reads and parsing. Cached objects are invalidated only on DDL changes.

5. **Conservative ROWNUM optimization**: Conversions only happen when semantically safe.

6. **Schema isolation**: Oracle objects in `sys` don't affect PG mode's name resolution.

7. **Separate test targets**: `oracle-check`, `oracle-installcheck`, `oracle-pg-check` test both modes independently.

In summary: Oracle compatibility isn't a layer placed in front of all SQL — it's placed on specific paths through modes, parser pointers, hook conditions, schemas, extensions, catalogs, and caches. PG queries run as PG. Oracle queries pay Oracle costs only when Oracle semantics are actually used.

## Conclusion: IvorySQL's Contribution to the PG Ecosystem

IvorySQL adds a kernel-level Oracle migration path to the PostgreSQL ecosystem. By handling parsers, types, packages, PL/iSQL, system views, built-in functions, and session semantics at the database level, it lowers the barrier for enterprises to embrace PostgreSQL.

For businesses, this means migration projects don't need massive rewrites from day one. Legacy stored procedures, packages, implicit conversions, and data dictionary dependencies can be partially carried by database compatibility, letting application teams focus on business logic that truly needs refactoring.

For the PG ecosystem, IvorySQL fills the compatibility depth gap that has always been a concern for enterprises coming from Oracle-heavy environments. It gives PG a realistic landing option in finance, telecom, government, and traditional manufacturing — without compromising PG's native experience. PG applications keep running as PG; Oracle migration applications get semantics closer to their original systems.

This path is ecosystem-friendly: it expands PostgreSQL's reach without turning PG itself into an unrecognizable hybrid.
