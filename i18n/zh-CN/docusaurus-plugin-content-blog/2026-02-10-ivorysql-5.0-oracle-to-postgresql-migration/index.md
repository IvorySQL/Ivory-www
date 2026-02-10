---
slug: ivorysql-5.0-oracle-to-postgresql-migration
title: IvorySQL 5.0+：助力 Oracle 平滑过渡至 PostgreSQL 的里程碑式产品
authors: [Yasir Hussain Shah]
category: IvorySQL
image: img/blog/2026-2-10-cover.png
tags: [IvorySQL, Database, Oracle Compatible, PostgreSQL, migration]
---

[IvorySQL](https://github.com/IvorySQL/IvorySQL)：一种“先进、功能完备、开源且兼容 Oracle 的 PostgreSQL 数据库，始终致力于保持 100% 兼容性，并可作为最新 PostgreSQL 的无缝替代”。

同时，这款引擎也是我们团队将各类外部 SQL 语句及应用适配至 PostgreSQL 时的首选工具！我们秉持平滑过渡、而非整体迁移的理念 —— 让旧数据库引擎向新引擎逐步切换，核心为降低迁移风险、优化实施效果。借助这类方案，能为实现这两大目标带来关键助力。

尽管 IvorySQL 最新主版本发布已有一段时间，但其中的全新特性依旧让我们倍感振奋，特此为大家分享。

## 新特性概览

IvorySQL 5.0 版本（[5.0 发布说明](https://github.com/IvorySQL/IvorySQL/releases/tag/IvorySQL_5.0)）于 2025 年 11 月 25 日发布，随后在 2025 年 12 月 18 日推出 5.1 版本（[5.1 发布说明](https://github.com/IvorySQL/IvorySQL/releases/tag/IvorySQL_5.1)）。这两个版本凝聚了 IvorySQL 团队的大量投入，不仅带来了多项高品质的功能优化，还完成了对 PostgreSQL 18 的兼容性适配。

IvorySQL v5 带来了一系列关键能力，包括：

- **PLiSQL** —— 兼容 Oracle PL/SQL 的子集
- Oracle 兼容包支持
- Oracle 风格序列支持
- **v5.0** 增强能力包括：`ROWID`、`%TYPE`、`%ROWTYPE` 以及嵌套子函数

我们尤其喜欢很多功能升级。

例如，IvorySQL 现在改进了 `NULL` 值处理逻辑，在兼容模式下（与 Oracle 的行为一致），`NULL` 值现在被视为空字符串，以避免迁移过程中出现错误。以 `SELECT CONCAT ('a' || NULL)` 语句为例，IvorySQL 将返回结果 `'a'`，而非沿用 PostgreSQL 默认的 `NULL` 值返回逻辑。

我们非常喜欢的一项增强功能是：你现在可以嵌套函数和存储过程。函数能够嵌入到其他函数内部（类似于 Oracle 的包，但更简单，仅使用私有方法）。这让你能够在一个地方集中组织复杂的逻辑。

与之类似，系统还增加了对 `DO [ LANGUAGE lang_name ] 代码块 [USING IN | OUT | IN OUT, ...]` 语法的支持。

## 实测验证

目前，我们已基于该版本完成多类应用的迁移适配测试，适配对象规模跨度极大：既有仅包含少量包、存储过程及函数的轻量应用（约 10-50 个数据库对象），也有包含海量数据库对象的大型业务系统（约 5 万个对象，其中存储过程超 1 万个、数据库包达数百个）。

尽管后续仍需持续迭代、补充更多功能特性，但当前版本已能大幅降低从 Oracle 向 PostgreSQL 平滑过渡的实施成本，助力迁移工作高效落地。

若你计划亲自体验测试，IvorySQL 提供了丰富的快速上手方式，包括源码编译、容器部署等，甚至还支持 WASM 构建！WASM 的独特优势在于，无需在本地完成完整安装，即可在浏览器中直接运行 IvorySQL，便于快速验证语法兼容性并开展 PostgreSQL 体系的初步探索。

你可参照 IvorySQL 官方发布的[相关文章](https://www.ivorysql.org/blog/ivorysql-wasm/)，通过简单几步完成 IvorySQL-WASM 项目的本地部署。也可直接访问 IvorySQL 官网，体验[在线托管的 WASM 版本](https://trial.ivorysql.org/)。

## 后续规划

我们团队很高兴聘用 IvorySQL 项目的贡献者，目前我们团队已有多位贡献者加入 IvorySQL 的核心研发工作。其中 Cédric Villemain、Yasir Hussain Shah 等成员的贡献，已在 5.0 和 5.1 版本的发布说明中专门致谢 —— 未来我们还将吸纳更多优秀开发者参与项目建设。

针对下一个版本，我们已规划了多项重磅新特性开发工作，具体包括：

- `ENABLE / DISABLE` 约束语法支持
- `UTL_FILE` 包新增适配
- Oracle 风格的 `CREATE TRIGGER` 触发器体（无需预先创建函数）
- 支持 Oracle 旧式连接运算符 `(+)`

我们同样期待社区为下一个版本持续贡献的研发成果落地。目前已有多项优质功能正处于积极开发与合入阶段，例如项目新晋贡献者 Rophy Tsai 近期新增了 `DBMS_OUTPUT` 和 `DBMS_UTILITY` 包的适配支持 —— 这两个包是 Oracle 生态 SQL 代码库中应用极为广泛的工具包。该特性现已合入 IvorySQL 主分支，预计将随下一个小版本或主版本正式发布。

对于希望在无需对现有数据库逻辑和应用程序进行大量改造的前提下，完成向 PostgreSQL 迁移或探索 PostgreSQL 生态的开发者而言，IvorySQL（尤其是 5.x 系列版本）提供了一套切实可行的解决方案。直接迁移至 PostgreSQL 在部分场景下，可能需要对数据库对象和应用代码做出大量调整，而 IvorySQL 能够有效填补这一适配鸿沟，凭借更高的兼容性，助力开发者更平滑地完成 PostgreSQL 生态的落地与适配。

您还可以通过以下渠道深入了解 IvorySQL：

- 官网 blog：https://www.ivorysql.org/zh-CN/blog
- 社区活动：https://www.ivorysql.org/zh-CN/webinars-page
- HOW 2025 相关会议录像：https://www.youtube.com/@ivorysql

值得一提的是，2026 年的 HOW 大会已确定于 4 月 26 日至 28 日举行，[议题征集](https://jsj.top/f/uebqBc)截止日期为 2026 年 2 月 27 日。

## 更多参考

- [PostgreSQL.org 发布的 IvorySQL 5.0 公告](https://www.postgresql.org/about/news/ivorysql-50-released-major-oracle-compatibility-expansion-on-postgresql-180-foundation-3180/)
- [GitHub 上的 IvorySQL 5.0 路线图](https://github.com/orgs/IvorySQL/projects/19)
