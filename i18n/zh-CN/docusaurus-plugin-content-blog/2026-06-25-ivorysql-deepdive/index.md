---
slug: ivorysql-deepdive
title: "IvorySQL 深度解析：融合 PostgreSQL 生态与 Oracle 兼容性的革新之路"
authors: [杨宇]
category: IvorySQL
image: img/blog/covers/ivorysql-deepdive.jpg
tags: [IvorySQL, PostgreSQL, Oracle, Migration, PL/iSQL]
---

> 作者：杨宇，PG ACE，第八届 PG 数据库生态大会 2025 年度金牌讲师，PG 分会哈尔滨用户组核心成员，负责本公司数据库、云计算等相关运维工作。曾主持对公司 PostgreSQL 数据库进行架构设计、容灾系统搭建及报表优化工作，发表多篇架构、优化相关的原创文章。目前拥有 ORACLE 11G/12C OCM、MYSQL 5.7/8.0 OCP、TIDB PCTP、OBCP V4、电科金仓 KCP 等资质认证。

## 引言：数据库领域的 "最佳桥梁"

在当今多元化的数据库技术栈中，企业常常面临一个两难选择：是拥抱开源、生态丰富、性能卓越的 PostgreSQL，还是沿用商业强大、生态成熟但成本高昂的 Oracle 数据库？迁移的复杂性、高昂的许可费用以及对现有应用的兼容性担忧，往往让企业在技术选型和迁移上举步维艰。

IvorySQL 正是在这一背景下应运而生。它并非一个简单的数据库，而是一个旨在架起 PostgreSQL 与 Oracle 之间桥梁的革新性开源项目。它基于 PostgreSQL 开发，在保持与原版数据库 100% 语法兼容的同时，深度兼容 Oracle 语法，为企业提供了一条平滑、低成本的迁移与融合路径。

## 核心定位：生于 PostgreSQL，优于 Oracle 兼容

IvorySQL 的核心哲学可以概括为：以 PostgreSQL 为基石，以 Oracle 兼容性为核心。

### 坚守开源与 PostgreSQL 生态

IvorySQL 社区明确承诺，始终与 PostgreSQL 数据库保持 100% 兼容，并可直接替换最新版本的 PostgreSQL。这意味着 PostgreSQL 强大的扩展生态系统（如 PostGIS、pgvector、pg_cron 等）在 IvorySQL 中得以完整保留。

### 强大的 Oracle 兼容性

这是 IvorySQL 区别于其他基于 PostgreSQL 的分支的核心竞争力。其关键在于 `ivorysql.compatible_mode` 这个 GUC 参数。通过将其设置为 `oracle` 或 `pg`，用户可以在同一套数据库系统内无缝切换 Oracle 兼容模式和原生 PostgreSQL 模式，这在数据库产品中是极为创新的设计。

## 深度技术解析：如何实现 "无缝兼容"？

### 1. GUC 参数驱动的双模式与初始化

#### 初始化时指定模式

**初始化为纯 PostgreSQL 模式**：`initdb -D /usr/ivory-5/data -m pg`，使用 `-m pg` 模式后 `ivorysql.compatible_mode` 参数将失效，系统行为与原生 PostgreSQL 完全一致。

**初始化为 Oracle 兼容模式（默认）**：`initdb -D /usr/ivory-5/data -m oracle`

#### 运行时动态切换

```sql
SHOW ivorysql.compatible_mode;
-- 输出: oracle

SET ivorysql.compatible_mode TO pg;
SHOW ivorysql.compatible_mode;
-- 输出: pg
```

### 2. PL/iSQL：Oracle PL/SQL 的无缝兼容

**匿名块兼容**

```sql
DECLARE
    i integer := 10;
    grade CHAR(1) := 'B';
BEGIN
    CASE grade
        WHEN 'A' THEN RAISE NOTICE 'Excellent';
        WHEN 'B' THEN RAISE NOTICE 'Very Good';
    END CASE;
EXCEPTION
    WHEN CASE_NOT_FOUND THEN
        RAISE NOTICE 'No such grade';
END;
/
```

**函数兼容**

```sql
CREATE OR REPLACE FUNCTION add_numbers(p_a NUMBER, p_b NUMBER) RETURN NUMBER IS
BEGIN
    RETURN p_a + p_b;
END;
/

SELECT add_numbers(10, 20) FROM dual;
```

**包（PACKAGE）兼容**

```sql
CREATE OR REPLACE PACKAGE my_pkg IS
    var1 INTEGER;
    FUNCTION get_double(p_id INTEGER) RETURN INTEGER;
    PROCEDURE print_message(p_msg VARCHAR2);
END my_pkg;
/

CREATE OR REPLACE PACKAGE BODY my_pkg IS
    FUNCTION get_double(p_id INTEGER) RETURN INTEGER IS
    BEGIN
        RETURN p_id * 2;
    END;
    PROCEDURE print_message(p_msg VARCHAR2) IS
    BEGIN
        DBMS_OUTPUT.PUT_LINE(p_msg);
    END;
BEGIN
    var1 := 100;
END my_pkg;
/
```

### 3. 数据类型与函数

IvorySQL 支持大量 Oracle 独有的数据类型和函数：

```sql
CREATE TABLE customers (
    cust_id NUMBER PRIMARY KEY,
    cust_name VARCHAR2(100)  -- 非标准PG类型，IvorySQL兼容
);
```

**常用内置函数**：SYSDATE、ADD_MONTHS、NVL、DECODE、INSTRB、SUBSTRB 等。

```sql
SELECT SYSDATE FROM dual;
SELECT NVL(NULL, 'Default Value') FROM dual;
SELECT DECODE(1, 1, 'One', 2, 'Two', 'Other') FROM dual;
```

**RowID 伪列**：`SET ivorysql.default_with_rowids TO on;`

### 4. 其他关键特性

支持 Sequence 序列、不可见列（INVISIBLE COLUMN）、%TYPE 和 %ROWTYPE 属性、CALL INTO 子句等。通过 `identifier_case_switch` 参数解决 Oracle 与 PG 标识符大小写差异问题，提供 normal、interchange、lowercase 三种模式。

## 安装部署：从单机到云原生的全景图

### Yum 一键安装

```bash
sudo tee /etc/yum.repos.d/ivorysql.repo <<EOF
[ivorysql5]
name=IvorySQL Server 5
baseurl=https://yum.highgo.com/dists/ivorysql-rpms/5/redhat/rhel-\$releasever-\$basearch
enabled=1
gpgcheck=0
EOF

sudo dnf install -y ivorysql5-5.3
```

### Docker 部署

```bash
docker pull ivorysql/ivorysql:5.3-ubi8
docker run --name ivorysql -p 5432:5432 -p 1521:1521 \
  -e IVORYSQL_PASSWORD=mysecretpassword -d ivorysql/ivorysql:5.3-ubi8
```

### K8s/Harbor Operator 云原生部署

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
      dataVolumeClaimSpec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
```

## 运维生态：让管理更简单，让性能更卓越

高可用集群基于流复制搭建主备集群。结合 pgMonitor + Grafana 搭建监控大屏。提供常用诊断 SQL：

```sql
-- 查看执行计划
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM large_table WHERE id = 100;

-- 查看当前活跃会话
SELECT pid, state, query, wait_event_type FROM pg_stat_activity WHERE state = 'active';
```

使用 `pg_dump` 完成同架构数据迁移。

## 结论：面向未来的数据基础设施

IvorySQL 不是一个简单的 PostgreSQL 再发行版，而是一个思考深、设计巧、价值高的开源数据库项目。它成功解决了 Oracle 用户向开源和云原生生态迁移的核心障碍——兼容性。它将 Oracle 的强大与 PostgreSQL 的灵活结合在了一起，为用户在未来的数据结构、混合多模态数据处理上提供了无限的想象空间。

IvorySQL 的出现，标志着数据库领域 "融合" 趋势的进一步发展。它不是去颠覆谁，而是在做一件更有意义的事：让历史与未来，在一个高效、可靠的平台上共存共生。
