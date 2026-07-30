---
slug: vibe-coding
title: "PG as the Perfect Partner for Vibe Coding: AI Agent Development the 'Simplicity-First' Way"
authors: [萧少聪]
category: IvorySQL
image: img/blog/covers/vibe-coding-en.png
tags: [PostgreSQL, AI, Agent, VibeCoding, HOW2026]
---

> Based on Xiao Shaocong's presentation at HOW 2026. Xiao is the former PostgreSQL Association President, Chinese Community Chair, and IvorySQL Expert Advisory Committee member.

Over the past two years, I've held one firm conviction: in the era of AI-driven development with LLMs, PostgreSQL will inevitably become the **default database** for any AI project. Not that PG can rule the world forever — at some point, certain workloads and business scenarios may indeed require migrating specific data to specialized databases. But as a **starting point**, PG is undisputedly the best choice.

Today I'll cover four topics: first, our headache — Token Anxiety; second, how "One SQL" lets you achieve more with less; third, how a unified data plane gives AI "blind-spot-free" operation; and fourth, the boundaries of PG as the AI-first database.

## 1. The Vibe Coding Headache: System Complexity as a "Token Incinerator"

When building a system, you typically start with one database — business isn't that complex at first. But as you develop — whether AI applications or others — you find you need JSON, search, AI capabilities. Each addition is a new data model, each decision perfectly reasonable at the time. The result? Your system grows from 1 database to 5, or more. You bring in MongoDB for documents, Elasticsearch for search, Milvus for vectors — you've responsibly chosen the industry's best. But here's the question: **has your business taken off?** The project just started, and you're already saddled with the most complex architecture. That's not ideal.

Worse, in Vibe Coding, multi-database architectures inccur a cost that manifests as **Token inflation**:

- Different databases have different syntax — AI must learn multiple query languages
- Data must sync across systems — AI must write and maintain ETL logic
- Cross-system queries get split into multiple steps — each consuming tokens
- Context windows get flooded, models become "dumb"

This isn't Vibe Coding — it's a **Token Incinerator**.

**The solution?** Within one boundary, use one database to solve all problems. That database is PostgreSQL.

## 2. One SQL, Double the Output: 10 Days, 50K Lines Validated

Last November, I ran an experiment: pure AI-assisted development to build a project called OntologyAlpha in 10 days — ~54,000 lines generated, ~11,300 effective lines deployed.

This is an "ontology" system, requiring four data types at the storage layer:

- **JSON**: AI input/output, frontend-backend communication
- **Vectors**: Semantic representation of text for similarity search
- **Graph**: Knowledge point relationship tracking and hierarchical management
- **Time-series**: Contextual communication sequence recording

The architecture: **PostgreSQL native multi-modal storage** at the bottom, Async Workers and Python sandbox above, Next.js visualization on top — all code AI-generated, zero lines written by me.

**Development approach**: I used Google Gemini as "Chief Data Officer/CTO" for architecture planning and task breakdown; Cursor (free tier) for code implementation. Total: 82 work hours, ~10 person-days.

**Results**:

- CPU/memory monitoring with precise search and fuzzy semantic search
- Elementary math textbook knowledge vectored into a knowledge graph (using two relational tables, no dedicated graph DB)
- PDF documents (e.g., Singapore talent policy) auto-extracting keywords and business relationships into upstream/downstream chains
- Python sandbox integration: CPU overheating automatically triggers upstream chain state changes

**The key SQL looks like this**:

```sql
-- One SQL: JSON extraction + relational graph traversal + vector similarity
SELECT ...
FROM ...
WHERE name->>'xxx' = '...'   -- JSON field extraction
  AND relation_type = '...'   -- Relational graph logic
  AND embedding <-> '...'     -- Vector similarity
```

One SQL, three data models. In PG, transactions, permissions, and backups are one unified system — no cross-system consistency headaches.

Throughout development, I used the most basic AI packages — Google Gemini at $20/month, Cursor free tier. Token consumption was very manageable.

## 3. Unified Data Plane, One Step Ahead: AI's Full-Coverage Operation

Many complain PG can't do vectors at scale — memory-hungry, hard to reach hundred-million scale.

Here I recommend a project: **pgvectorscale**, by the TimescaleDB team. It places vector indexes on disk via DiskANN + quantization, breaking the memory barrier for massive-scale vector retrieval at reduced cost.

But PG's advantage isn't being #1 in any single category. If your system must handle 100M+ vectors at extreme QPS, definitely choose a specialized vector database. But when your business needs to manage relational, vector, JSON, time-series, and graph data simultaneously, **PG is an all-rounder scoring ~80 in everything**.

The combined advantage? **Dramatically reduced system fragmentation, significantly lower development and operations complexity.**

In multi-database architectures, your application must manage:

- Relational DB uses SQL, the vector DB might not support SQL at all
- Do you need transactions between systems? How to guarantee consistency?
- With ETL, the app must track latency — which data is trustworthy, which is stale?
- How to unify permissions? How to unify backups?

Managing all this degrades Vibe Coding quality — consumption, accuracy, output all suffer.

In PG's unified data plane:

- **1 Network Hop**: Application accesses only one database
- **1 Transaction**: All operations in a single transaction
- **1 Permission Model**: Unified access control
- **1 Backup System**: Unified disaster recovery

**System complexity overhead often outweighs pure single-point performance gains. Most of the time, you're paying the tax for multi-system architecture.**

## 4. PG as AI's "Safe Bet": Boundaries Give Confidence

I love PG. So when should you consider introducing specialized databases?

My recommendation: **Use PG to solve 80% of problems first. Build business capability fast. Once you earn your first dollar, then consider whether to migrate.**

Specifically:

| Data Type | PG's Limit | When to Migrate |
|-----------|-----------|-----------------|
| **Vector** | Sub-100M scale, moderate QPS | Billion-scale vectors + extreme QPS |
| **Time-series** | Regular logs, metrics, monitoring | Massive volume + special compression needs |
| **JSON** | Most scenarios | Ultra-large JSON (thousands of lines) or high-frequency updates |
| **Graph** | 3-4 level shallow relationships | Graph depth and complexity exceeding PG's capability |

**Clear boundaries actually make you more confident to use it.**

PG 19 will natively support better graph queries. Today, use the AGE extension, or like me, "fake" graph structures with a few relational tables — sufficient for most AI applications.

## Conclusion: Fewer Systems, Not Stronger Systems

In the AI era, I believe everyone should think like an architect. But from an architectural mindset, **the goal should be fewer systems, not stronger systems.**

There was once this idea: the more complex my architecture, the harder it is for the boss to fire me. But today, with AI here, if your boss lets you go, it's not because of AI — it's business reality. We don't need that burden.

What truly matters:

> **PostgreSQL is the default starting point, not the destination.**

Start with PG, validate your business model fast, save tokens, save management time, focus on monetization. Once your business is stable and profitable, and you hit clear technical bottlenecks, then carefully evaluate whether to introduce specialized databases.

A clean, simple architecture is the most resilient architecture for the future.
