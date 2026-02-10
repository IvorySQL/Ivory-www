---
slug: ivorysql-5.0-oracle-to-postgresql-migration
title: IvorySQL 5.0+ - a game changer for Oracle to PostgreSQL transitions
authors: [Yasir Hussain Shah]
category: IvorySQL
image: img/blog/2026-2-10-cover.png
tags: [IvorySQL, Database, Oracle Compatible, PostgreSQL, migration]
---

## Introduction

IvorySQL: “advanced, fully featured, open source Oracle compatible PostgreSQL with a firm commitment to always remain 100% compatible and a Drop-in replacement of the latest PostgreSQL.”（[GitHub](https://github.com/IvorySQL/IvorySQL)）

Also, it’s our team’s favorite engine to translate both foreign SQL and foreign applications for PostgreSQL! We believe in transitions, not migrations - a gradual shift from the old database engine to the new, specifically to reduce risk and optimize results. Using a project like this makes a huge difference in achieving both these goals.

It’s been a little bit since the latest major version was released, but we’re still excited about what’s new and wanted to share.

## What’s new

Version 5.0 ([release notes](https://github.com/IvorySQL/IvorySQL/releases/tag/IvorySQL_5.0)) came out on November 25, 2025 and there’s already been a minor version released since then ([5.1 release notes](https://github.com/IvorySQL/IvorySQL/releases/tag/IvorySQL_5.1)) on December 18, 2025. These editions of the project were the direct result of massive efforts from the IvorySQL team to provide a lot of quality feature improvements as well as implement PostgreSQL 18 compatibility.

IvorySQL 5 brought a lot of necessary changes with it, including:

- **PLiSQL** - a compatible subset of Oracle PL/SQL
- **Oracle-Compatible Package Support**
- **Oracle-Style Sequence Support**
- v5.0 enhancements such as **ROWID**, **%TYPE**, **%ROWTYPE**, and **nested subfunctions**

In particular, we really enjoy a lot of the functionality upgrades.

For example, IvorySQL now has **better NULL handling**, where NULL is now treated like an empty string in compatible mode (matching Oracle behavior) to avoid bugs during migration. So, when you have situations such as `SELECT CONCAT ('a' || NULL)`, IvorySQL will now return `'a'` instead of following PostgreSQL’s behavior of returning `NULL`.

One enhancement we really enjoy is that you can now **nest functions and procedures**. Functions are able to be embedded inside other functions (like Oracle packages, but simpler, using only private methods). This lets you organize complex logic in one place.

Along the same lines, support was also added for `DO [ LANGUAGE lang_name ] code [USING IN | OUT | IN OUT, ...]`.

## Trying it out

Currently, we’re ingesting applications that range from only a few packages, procedures, and functions (around 10-50 objects) to massive data loads that include around 50,000 objects (10,000+ procedures and hundreds of packages).

While there are still many features that will need to be added over time, it considerably reduces the effort taken to complete the transition from Oracle to PostgreSQL successfully.

If you’re thinking about testing it for yourself, there are a plethora of options to get started (including building it from source, using containers, etc.)… and even a WASM build! This in particular allows IvorySQL to be run directly in the browser without having to fully install it locally; it’s very convenient to look at syntax support and take the first step into the world of PostgreSQL.

You can deploy the IvorySQL-WASM project locally in just a few steps, following the [blog post IvorySQL published](https://www.ivorysql.org/blog/ivorysql-wasm/) on the subject.

Or, you can [try out the hosted WASM](https://trial.ivorysql.org/) on the IvorySQL website.

## What’s next

Hoping to learn more about how to use IvorySQL yourself? Keep an eye out for recorded webinars on their website ([coming soon!](https://www.ivorysql.org/webinars-page)), or [check out recordings](https://www.youtube.com/@ivorysql) from the HOW2025 conference in Jinan, China in the meantime.

[The next conference in Jinan](https://ivorysql.io/) is already scheduled, from April 26th to the 28th! (By the way, the [Call for Proposals is open](https://sessionize.com/how2026) until February 27th, 2026.)

Our team is happy to employ contributors to the IvorySQL project. Some of our team members (Cédric Villemain, Yasir Hussain Shah) have been recognized in the release notes for 5.0 and 5.1 - and we have more additions planned. For the next release, we have planned some exciting developments, including:

- `ENABLE/DISABLE` constraint syntax
- `UTL_FILE` package addition
- Oracle-style `CREATE TRIGGER` body (without needing to create a function beforehand)
- Support for Oracle’s legacy join operator `(+)`

We’re looking forward to seeing the result of ongoing community work for the next release as well. Many great features are actively being added; for example, recently a new contributor to the project, Rophy Tsai, added the `DBMS_OUTPUT` and `DBMS_UTILITY` packages: something widely used across Oracle-based SQL codebases. It was recently merged to IvorySQL’s main branch, and will likely be included in the next minor or major release.

For those looking to transition to or explore PostgreSQL without extensive modifications to their existing database logic and applications, IvorySQL (specially v5.x) offers a practical solution. A direct migration to PostgreSQL could, in some cases, require significant changes to both database objects and application code. IvorySQL helps bridge this gap, allowing a smoother adoption of PostgreSQL with greater compatibility.

## Additional resources

- [PostgreSQL.org announcement for IvorySQL 5](https://www.postgresql.org/about/news/ivorysql-50-released-major-oracle-compatibility-expansion-on-postgresql-180-foundation-3180/)
- [IvorySQL 5.0 roadmap on GitHub](https://github.com/orgs/IvorySQL/projects/19)