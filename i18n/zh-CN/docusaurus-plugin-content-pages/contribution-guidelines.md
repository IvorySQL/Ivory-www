# IvorySQL 贡献指南

IvorySQL 的成长离不开<strong>全球开发者、测试人员、文档作者、翻译者、社区布道者和使用者的持续参与</strong>。本页面概述社区当前的主要贡献方式与激励政策，详细的操作指南请参阅 <a href="https://docs.ivorysql.org/cn/ivorysql-doc/master/contribution/contribution_guide" target="_blank" rel="noopener noreferrer">IvorySQL 文档站贡献指南</a>。

## 贡献方式

IvorySQL 社区始终坚持<strong>"开源无门槛，贡献无大小"</strong>。你可以根据自己的经验、兴趣和时间，选择适合自己的参与方式：

- <strong>代码类贡献</strong>：内核开发、功能迭代、Bug 修复、插件开发、生态工具适配、回归测试、代码评审等。
- <strong>非代码类贡献</strong>：Issue 反馈、文档完善、技术翻译、社区问答、线上或线下技术分享、案例征集、迁移实践总结、社区推广等。

如果你暂时还不准备直接修改代码，也完全可以先从<strong>问题复现、需求梳理、文档改进、测试建议或社区讨论</strong>开始参与。

## 激励政策

为鼓励更多开发者持续参与 IvorySQL 社区建设，社区也在不断完善贡献者的认可与激励机制：

- <strong>荣誉认可</strong>：为贡献者颁发<strong>社区电子证书</strong>，并在官网<a href="https://www.ivorysql.org/zh-cn/contributors" target="_blank" rel="noopener noreferrer">贡献者墙</a>记录社区足迹。
- <strong>导师支持</strong>：通过<strong>"灯塔"导师机制</strong>，提供资深开发者的一对一技术支持与 Code Review 帮助，协助贡献者成长。
- <strong>社区活动权益</strong>：活跃贡献者可获得 <strong>HOW</strong> 等社区活动的演讲、分享或参会机会。
- <strong>年度激励</strong>：社区会结合全年贡献情况评选优秀贡献者，并提供周边礼品、宣传展示和更多社区合作机会。

具体激励安排会根据社区计划持续迭代，但<strong>每一类持续、真实且有价值的贡献，都会被社区认真记录与认可</strong>。

## 社区协作流程

IvorySQL 社区采用一套闭环式开源协作流程，确保从问题提出到版本发布，每一个环节都能闭合反馈、持续改进。这一流程鼓励用户与开发者形成良性互动，让社区开发始终围绕实际需求持续演进。

整个协作闭环流程如下：

🐛 <strong>提问题（Issue）</strong>

用户或开发者在 GitHub 的 Issues 页面提交 Bug、功能建议或使用反馈。

💬 <strong>问题讨论（Discussion）</strong>

维护者与社区成员就问题展开讨论，确认问题性质与优先级，加入 ToDo List。

🛠️ <strong>开发分支（Fork & Dev）</strong>

开发者认领 Issue，Fork 仓库并在本地开发测试，准备提交代码。

🚀 <strong>提交 Pull Request（PR）</strong>

将开发分支 Push 到 Fork 仓库后，向上游仓库发起合并请求。

🧐 <strong>代码评审（Review）</strong>

维护者或核心开发者对 PR 进行评审，提出修改建议并确保质量。

🔀 <strong>合并主分支（Merge）</strong>

审核通过后，PR 被合并至主分支，对应的 Issue 被关闭。

📦 <strong>版本发布（Release）</strong>

项目定期发布新版本（每季度小版本，每年大版本），包含最新的修复与功能。

🧪 <strong>用户测试（Test）</strong>

用户升级使用新版，反馈新问题，新的 Issue 随之产生，形成完整的反馈循环。

![process](/img/p23.jpg)

通过这套完整的闭环协作机制，IvorySQL 实现了问题响应 → 开发贡献 → 质量保障 → 发布反馈的全流程闭合，推动项目持续健康演进。

📢 请务必阅读并遵守我们的 <a href="https://github.com/IvorySQL/IvorySQL/blob/master/CODE_OF_CONDUCT_CN.md" target="_blank" rel="noopener noreferrer">IvorySQL社区行为准则</a>。

## 快速开始

准备好参与贡献了吗？以下是开始的方式：

1. <strong>注册 GitHub 账号</strong>，熟悉基本的 Git 工作流
2. <strong>签署贡献者许可协议（CLA）</strong>：
   - [个人贡献者](/pdf/individual_cla.pdf)
   - [企业贡献者](/pdf/corporate_cla.pdf)
   - <strong>提示</strong>：如果在 AtomGit 上进行贡献，可以自动完成 CLA 签署。
3. <strong>阅读详细<a href="https://docs.ivorysql.org/cn/ivorysql-doc/master/contribution/contribution_guide" target="_blank" rel="noopener noreferrer">贡献指南</a></strong>，了解：
   - 社区协作流程
   - 代码贡献指南
   - 生态组件适配流程
   - 测试和文档要求
4. <strong>选择感兴趣的方向</strong>，找到要处理的 Issue
5. <strong>提交你的第一个 PR</strong>，加入社区！

## 需要帮助？

- <strong>邮件列表</strong>：https://lists.ivorysql.org
- <strong>GitHub Discussions</strong>：https://github.com/IvorySQL/IvorySQL/discussions
- <strong>社区群组</strong>：微信、Discord 等聊天群

如果你对代码贡献感兴趣，但暂时还没有明确的切入点，或者这是你第一次参与 IvorySQL，<a href="https://docs.ivorysql.org/cn/ivorysql-doc/master/contribution/contribution_guide" target="_blank" rel="noopener noreferrer">详细贡献指南</a>将帮助你找到清晰的起点，降低参与门槛。
