---
slug: ivorysql-deepdive
title: "IvorySQL Deep Dive: Bridging PostgreSQL Ecosystem and Oracle Compatibility"
authors: [杨宇]
category: IvorySQL
image: img/blog/covers/ivorysql-deepdive.jpg
tags: [IvorySQL, PostgreSQL, Oracle, Migration, PL/iSQL]
---

> By Yang Yu, PG ACE, 2025 PG Ecosystem Conference Gold Speaker, Harbin User Group core member. Oracle OCM, MySQL OCP, TiDB PCTP, OBCP V4, KCP certified. Specializes in PostgreSQL architecture design, disaster recovery, and performance optimization.

## Introduction: The "Best Bridge" in the Database World

In today's diverse database landscape, enterprises often face a dilemma: embrace PostgreSQL with its rich open-source ecosystem, or stick with Oracle's powerful but costly solutions? The complexity of migration, high licensing fees, and application compatibility concerns often paralyze decision-making.

**IvorySQL** was born to bridge this gap. Built on PostgreSQL, it maintains 100% compatibility while deeply integrating Oracle syntax compatibility, providing a smooth, low-cost migration path.

## Core Positioning: Born from PostgreSQL, Excelling in Oracle Compatibility

IvorySQL's philosophy: PostgreSQL as the foundation, Oracle compatibility as the core.

### Committed to Open Source & PostgreSQL Ecosystem

The community commits to 100% compatibility with the latest PostgreSQL, preserving the full extension ecosystem (PostGIS, pgvector, pg_cron, etc.).

### Powerful Oracle Compatibility

The key innovation is the `ivorysql.compatible_mode` GUC parameter. Toggling between `oracle` and `pg` modes at the session level enables "one database, two modes."

## Deep Technical Analysis: How "Seamless Compatibility" Works

### 1. GUC-Driven Dual-Mode Initialization

```bash
# PostgreSQL-only mode
initdb -D /usr/ivory-5/data -m pg

# Oracle-compatible mode (default)
initdb -D /usr/ivory-5/data -m oracle
```

```sql
SHOW ivorysql.compatible_mode;   -- oracle
SET ivorysql.compatible_mode TO pg;
```

### 2. PL/iSQL: Seamless Oracle PL/SQL Compatibility

```sql
CREATE OR REPLACE FUNCTION add_numbers(p_a NUMBER, p_b NUMBER) RETURN NUMBER IS
BEGIN
    RETURN p_a + p_b;
END;
/
```

Full support for anonymous blocks, packages, exception handling, and other Oracle core programming features.

### 3. Data Types & Functions

VARCHAR2, NUMBER, NVL, DECODE, SYSDATE, ADD_MONTHS, ROWID — all Oracle-native features:

```sql
SELECT SYSDATE FROM dual;
SELECT NVL(NULL, 'Default Value') FROM dual;
SELECT DECODE(1, 1, 'One', 2, 'Two', 'Other') FROM dual;
```

Also supports sequences, invisible columns, %TYPE/%ROWTYPE attributes, and `identifier_case_switch` for Oracle-PG case mapping.

## Deployment: From Standalone to Cloud-Native

### Yum Install

```bash
sudo dnf install -y ivorysql5-5.3
```

### Docker

```bash
docker pull ivorysql/ivorysql:5.3-ubi8
docker run --name ivorysql -p 5432:5432 -p 1521:1521 \
  -e IVORYSQL_PASSWORD=mysecretpassword -d ivorysql/ivorysql:5.3-ubi8
```

### K8s Operator

```yaml
apiVersion: ivory-operator.ivorysql.org/v1beta1
kind: IvoryCluster
metadata:
  name: hippo
spec:
  image: ivorysql/ivorysql:5.3-ubi8
  instances:
    - name: instance1
      replicas: 2
```

## Operations Ecosystem

Streaming replication for HA, pgMonitor + Grafana for observability, and built-in diagnostics:

```sql
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM large_table WHERE id = 100;
SELECT pid, state, query FROM pg_stat_activity WHERE state = 'active';
```

## Conclusion: A Future-Ready Data Infrastructure

IvorySQL successfully solves the fundamental Oracle migration barrier: compatibility. It combines Oracle's power with PostgreSQL's flexibility — not to replace either, but to let history and the future coexist on an efficient, reliable platform.
