---
slug: ivorysql-agent
title: "IvorySQL Agent: AI-Powered Database Management"
authors: [Oreo Yang]
category: IvorySQL
image: img/blog/covers/ivorysql-agent-en.png
tags: [IvorySQL, AI, Agent, RAG, NL2SQL, PostgreSQL]
---

> Based on Oreo Yang's presentation at HOW 2026.
> Video replay: https://www.youtube.com/watch?v=e5QJUBXgJ7k

## 1. Project Background

### 1.1 What is IvorySQL

IvorySQL is an open-source relational database built on PostgreSQL with Oracle compatibility, providing flexible, high-performance data management. Key features include Oracle type/PL/SQL/Package support, an active open-source community, and multiple deployment options (traditional, containerized, cloud, sandbox).

### 1.2 Project Goals

Database operations face multiple challenges: scattered metrics, difficult diagnostics, high labor costs, cumbersome documentation. The IvorySQL Agent leverages LLM technology for intelligent conversations and automated analysis, building a unified monitoring, diagnostics, and operations platform. Six core problems: intelligent documentation retrieval, database operations, performance tuning, SQL efficiency, enterprise knowledge management, transitioning from "passive search" to "proactive service."

### 1.3 What is an Agent

Agent = LLM + Tools + Reasoning. An agent combines language models with tool capabilities to reason about tasks, decide which tools to use, and iterate toward solutions.

IvorySQL Agent tech stack:
- **Model Layer**: OpenAI GPT, Anthropic Claude, Zhipu AI, and other backends
- **Tool Layer**: 21 database tools across 7 expert domains
- **Framework Layer**: LangGraph workflow orchestration with ReAct loop iteration
- **Knowledge Layer**: Matrix knowledge base covering multiple versions and modes

## 2. System Architecture

### 2.1 Overall Architecture

Four-layer design:

| Layer | Tech Stack | Responsibility |
|-------|-----------|----------------|
| Web Access | FastAPI + static + CORS | User interface |
| Smart Router | LangGraph + state management | Intent recognition & dispatch |
| Expert Agents | NL2SQL / Analysis / Ops / Backup / Install / Knowledge / General | Domain tasks |
| Tools & Storage | DB tools + LLM + vector store + TSDB | Data access & execution |

### 2.2 Core Data Flows

**Monitoring collection flow**: Collector covers 50+ metrics (connections, cache, locks, transactions, queries, table bloat, etc.). Oracle-compatible mode dynamically registers custom type codecs. Data stored as JSONB in PostgreSQL; APScheduler runs every 30s with Delta incremental computation.

**Conversation flow**: User input routed to corresponding Agent, context built, tool chain invoked for reasoning, response generated.

### 2.3 Anomaly Detection: Rule Engine + LLM

Dual-track mechanism: predefined threshold rules trigger LLM analysis; Claude/OpenAI/Zhipu AI for intelligent interpretation; 512-dim local vectors (configurable 256-2048) with pgvector indexing; historical case retrieval reuses diagnostic experience.

## 3. Key Technical Implementation

### 3.1 Two-Stage Smart Routing

- **Phase 1 (Deterministic)**: Keyword + regex matching, ~0ms, ~70% coverage
- **Phase 2 (LLM Classification)**: LLM intent recognition on rule mismatch, ~300ms
- **Post-Confirm**: Cache hit reuse, 0ms

Key design decisions: mutually exclusive keywords preventing cross-domain conflicts, bilingual regex, progressive fallback (keyword → LLM → general), mode-aware tool table pruning based on compat_mode, LLM fault tolerance (exponential backoff ×2, timeout fallback to general), domain isolation to prevent tool pollution.

### 3.2 Local Vector Retrieval (Zero External Dependencies)

BAAI/bge-small-zh-v1.5 embedding model, 512-dim, fully offline. pgvector + IVFFlat index. Knowledge base includes IvorySQL docs, PostgreSQL docs, and historical analysis. RAG uses "weighted vector search + BM25 reranking + MMR diversification." Document chunks managed by chapter with YAML frontmatter metadata including version and mode tags.

### 3.3 Context Management & Smart Compression

Schema cache: 1-hour TTL, auto-invalidate on DDL. Package cache: IvorySQL Oracle mode package info. Real-time metrics: dynamic session, lock, slow query loading. Smart compression for 15+ turn conversations: DDL detection → selective retention (DDL + last 6 turns) → token check → LLM summary → context injection.

### 3.4 Tool System & Security

21 built-in tools across domains. Four-layer SQL validation: prompt pre-filtering (80% invalid SQL blocked) → syntax cache verification → pre-confirmation validation → error feedback retry (max 3 attempts). API Token + SHA256 authentication with hot-reload. Audit logging. Oracle/PG mode tool differentiation.

### 3.5 Chat Flow: Plan · Generate · Validate · Stream

LLM generates JSON step plans. SSE streaming pushes token, tool_start, tool_end events in real time. State round-tripping maintains multi-step plan coherence across rounds.

### 3.6 Deployment

Docker containerized: PostgreSQL storage + Agent service + Grafana + knowledge import. settings.json runtime config with hot updates. Multi-target monitoring. docker-compose one-click launch.

## 4. Technical Features

- Fully offline local operation, no external API dependencies
- Multi-RAG domain expansion (7 Agents currently, extensible)
- Intelligent context caching and compression
- Multi-layer security validation and audit logging
- Modular extensible design supporting custom tools and knowledge bases

## 5. Application Scenarios

| Scenario | User Query | Agent |
|----------|-----------|-------|
| Connection spike diagnosis | "Why are connections so high?" | Ops Agent analyzes active sessions, long transactions |
| Slow query optimization | "Find my slowest queries" | NL2SQL Agent retrieves slow query logs |
| Backup status check | "Is backup config OK?" | Backup Agent checks WAL archiving |
| Knowledge base Q&A | "How to use %rowtype?" | Knowledge Agent queries RAG |

## 6. Future Plans

### 6.1 Short-Term

- Refine Agent framework with multi-model backend and streaming
- Dual-mode IvorySQL/PostgreSQL compatibility
- Multi-modal input: file analysis, screenshot recognition, voice
- Knowledge base management: online CRUD for entries

### 6.2 Long-Term

Multi-version support, automated low-risk repairs, multi-instance management, granular access control, alerting (email/WeChat/Slack), self-learning from user preferences, more domain Agents (security, HA, performance tuning).

**Vision**: IvorySQL as AI data infrastructure — native pgvector integration, multi-language SDK (3-line RAG), Agent development kit with LangGraph/LlamaIndex templates, one-click Docker Compose deployment.

## 7. Summary

The IvorySQL Agent is a systematic exploration of AI-powered database management. Built on the ReAct framework with LangGraph orchestration, it delivers end-to-end automation from natural language to database operations, covering routing, retrieval, context management, tool invocation, and security auditing. As the project evolves toward multi-modal interaction, automated repairs, and an SDK ecosystem, IvorySQL aims to be not just a great database, but the infrastructure for intelligent data management.
