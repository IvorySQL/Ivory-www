---
slug: ivorysql-private-cloud
title: PostgreSQL/IvorySQL in Private Cloud Practice
authors: [唐成]
category: IvorySQL
image: img/blog/covers/private-cloud.jpg
tags: [IvorySQL, PostgreSQL, Private Cloud, HOW2026, Cloud Native]
---

> This article is based on the talk given at HOW 2026 — by Tang Cheng, Senior Database Architect, Founder & CTO of Zqshucheng Technology, and author of "The Way to PostgreSQL Mastery".

Recording: https://www.youtube.com/watch?v=HTJEjcgmBtA

Over the past few years, "full cloud migration" was the dominant direction for database infrastructure. But as core business systems continue to scale, more enterprises are turning their attention back to private cloud architectures — especially in finance, government, and telecom, where databases must balance cloud capabilities with data security, resource control, cost optimization, domestic platform adaptation, high availability, and stability. Database private clouds have evolved from simple "resource virtualization platforms" into full-fledged data infrastructure platforms.

## Why Choose PostgreSQL / IvorySQL for Private Cloud

### Business Challenges

As business scenarios grow more complex and data volumes explode, traditional database architectures reveal several pain points:

1. **Insufficient elasticity**: Long expansion cycles, low resource utilization, unable to adapt to dynamic peaks and valleys.
2. **Growing operational complexity**: Manual deployment, scaling, and failover can no longer support large-scale cluster management.
3. **Security & compliance pressure**: Core business data demands higher data sovereignty, access control, and audit oversight.
4. **Rising database costs**: Commercial license fees, high-end storage costs, and DBA expenses continue to grow — enterprises are paying more attention to TCO.

### Private Cloud Advantages & Database Selection

Private clouds emphasize unified resource management and platform capabilities. In this context, PostgreSQL and IvorySQL have become key choices. PostgreSQL relies on a mature open-source ecosystem, rich extensibility, and enterprise-grade reliability. IvorySQL builds on PostgreSQL compatibility while adding Oracle compatibility, making it especially suitable for domestic substitution and migration scenarios.

### IvorySQL Advantages

As a PG-based open-source database, 100% PG-compatible and highly Oracle-compatible, built for cloud-native environments:

1. **100% PostgreSQL compatible**: Built on the latest PostgreSQL versions with all core features.
2. **Highly Oracle compatible**: PL/iSQL syntax, data types, functions, stored procedures — dramatically reducing Oracle migration costs.
3. **Apache 2.0 licensed**: Free to use, modify, and distribute without vendor lock-in.
4. **Rich cloud-native ecosystem**: Full cloud-native toolchain supporting K8s deployment, elastic scaling, and automated operations.
5. **Comprehensive Oracle compatibility**: 21 Oracle key features including ROWID, %ROWTYPE, %TYPE, NLS parameters, and case sensitivity.
6. **Performance & stability**: PG 18.0 async I/O, skip scan, and enterprise-level optimizations.

## Private Cloud Architecture Design

The core of a database private cloud is infrastructure capability.

### Infrastructure — Bare Metal Servers

For high-concurrency, high-IO core workloads, bare metal remains a key deployment option — running databases directly on physical machines avoids virtualization overhead.


Key considerations include NVMe SSDs, local high-performance storage, 10GbE/25GbE networking, and RDMA — especially critical for PostgreSQL streaming replication.


### Infrastructure — Containers

For systems demanding maximum resource utilization, Kubernetes (K8S) provides an elastic runtime for IvorySQL instances.


The Operator pattern is the core component for HA deployment:

- Operator: https://github.com/IvorySQL/ivory-operator/
- Cloud Frontend: https://github.com/IvorySQL/ivory-cloud-web
- Cloud Backend: https://github.com/IvorySQL/ivory-cloud

### High Availability

PostgreSQL HA is built on streaming replication. Production environments typically use primary-standby, synchronous replication, and automatic failover.


### Database Performance Optimization

Database performance tuning goes beyond parameter tweaking. Key areas include OS, database parameters, connection pooling, SQL execution efficiency, and storage I/O.


Storage I/O is often the bottleneck — optimization spans RAID, filesystem, kernel scheduling, and disk partitioning:

- RAID: HDD with cache RAID card (RAID10 preferred); NVMe with software RAID
- Filesystem: XFS for production, optimized for high concurrency and large file I/O
- I/O scheduler: `noop` for NVMe, `deadline` for regular disks
- Read-ahead & alignment: partition alignment with physical sectors, appropriate read-ahead tuning

## Intelligent Monitoring & Operations

### Real-time Monitoring & Alerting

The core goal of monitoring in a database private cloud is rapid problem detection and diagnosis.


### Building Intelligent Monitoring

Using open-source tools to upgrade monitoring from reactive alerting to proactive prediction:

- **Metrics & Alerting**: Prometheus Operator with node_exporter and pg_exporter for host and database metrics
- **Log Management**: EFK or Loki for centralized log collection
- **Tracing Integration**: Database monitoring integrated with APM (SkyWalking, Jaeger) for end-to-end tracing
- **Anomaly Detection**: Machine learning on historical metrics for baseline prediction and anomaly detection

### Key Metrics

- Host-level: CPU, memory, disk I/O, network throughput
- Instance-level: active connections, cache hit ratio, TPS, QPS, lock wait count
- Object-level: table CRUD frequency, index usage, index bloat, WAL generation rate
- Session & SQL: slow queries, long transactions, idle transactions

### Getting Database Metrics

PostgreSQL provides built-in system views for granular performance metrics:

- Session waits: `pg_wait_events`, `pg_stat_activity`
- WAL: `pg_stat_wal`
- Checkpointer: `pg_stat_checkpointer`
- Async I/O: `pg_aios`
- Memory & NUMA: `pg_stat_memory_usage`, `pg_shmem_allocations_numa`
- Vector operations: `pg_stat_vector_ops`
- Parallel queries: `pg_stat_parallel_queries`

### Automated Operations

As database scale grows, automation becomes essential — covering infrastructure as code, configuration management, and CI/CD pipelines.


## Summary

As enterprise core workloads continue to evolve toward cloud-native, database private clouds are no longer just about "putting databases in the cloud" — they are moving toward platform-centric, intelligent, and cloud-native infrastructure.

PostgreSQL, with its stability, extensibility, and mature open-source ecosystem, has become a key technical foundation for database private clouds. IvorySQL builds on this foundation with enhanced Oracle compatibility and cloud-native capabilities, opening more possibilities for domestic database adoption and smooth migration.

Operations are shifting from manual to automated, from reactive alerting to intelligent prediction, and from single-instance management to unified platform management. As AI-powered operations, self-service database platforms, and multi-modal data capabilities continue to evolve, database private clouds will gradually become complete data infrastructure platforms.
