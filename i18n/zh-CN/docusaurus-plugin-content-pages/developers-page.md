---
标题: IvorySQL 开发者
---

# 欢迎来到 IvorySQL 开发者版块

## Roadmap

IvorySQL 是一个非商业性的全志愿者开源软件项目，因此开发过程中并没有正式的功能需求列表。我们鼓励开发者探索自己感兴趣的主题，同时也确保所有提交到 IvorySQL 的新功能都经过我们社区贡献者和提交者的严格审核。

### 小版本
IvorySQL 项目旨在按照预定计划，每个季度发布一个小版本。如果因重要的错误修复或安全问题需要发布额外版本，则可能会在这些日期之间增加发布。因此，该列表应被视为最低发布频率。IvorySQL紧跟PostgreSQL发布计划，每个季度，都会发布一个最新内核的小版本。

今年的版本发布情况如下：
- 2025年第一季度发布v4.2（PG内核17.2） ```特性：添加架构设计相关文档```
- 2025年第一季度发布v4.4（PG内核17.4） ```特性：IvorySQL Operator内核升级```
- 2025年第二季度发布v4.5（PG内核17.5） ```特性：在线体验IvorySQL```
- 2025年第三季度发布v4.6（PG内核17.6） ```特性：IvorySQL Cloud v4```

### 下一次主版本发布
IvorySQL 的下一个主版本计划为v5.0，预计于 2025年 第四季度发布。IvorySQL v5.0的兼容特性如下表所示，当前的开发计划可以前往[GitHub的Project页面](https://github.com/orgs/IvorySQL/projects/19)查看。

| 类型 | 特性 | 描述 |
|---------|---------|---------|
| 数据库编码 | GB18030 | 实现字符在服务器上的存储采用GB18030编码，同时支持在初始化数据库（initdb）以及创建数据库（create database）过程中指定使用GB18030编码 |
| 内置函数 | rawtohex | 与Oracle数据库兼容的RAWTOHEX函数。该函数用于将RAW数据类型转换为其十六进制表示的字符串格式 |
| 内置函数 | sys_guid | 与Oracle数据库兼容的SYS_GUID函数。该函数用于生成全局唯一标识符(GUID)，通常以16字节RAW值形式返回 |
| 内置函数 | sys_context | 与Oracle数据库兼容的SYS_CONTEXT函数。该函数用于从预定义的命名空间（如USERENV）中检索当前会话或系统环境的相关信息 |
| 内置函数 | userenv | 与Oracle数据库兼容的USERENV函数 |
| 内置函数 | instr | 支持Oracle中的instr函数 |
| PL/iSQL | CALL调用语法 | PL/iSQL引入的CALL调用语法通过提供标准化存储过程调用方式，增强了过程语言能力。该特性简化了存储过程调用流程，提升代码可读性，并与支持类似功能的其他数据库系统保持语法一致性 |
| PL/iSQL | %ROWTYPE | %ROWTYPE属性允许开发者声明表示整张表或游标行的变量。该特性无需为表中每列手动定义变量，从而减少冗余代码并提高可维护性 |
| PL/iSQL | %TYPE | %TYPE属性允许声明与表列或其他变量数据类型相同的变量。该特性确保变量类型始终与源类型匹配，即使源数据类型发生变化也能保持同步 |
| 函数 | 函数 | 支持函数(FUNCTION),满足兼容Oracle函数，比如：EDITIONABLE/NONEDITIONABLE, return, IS,out参数NOCOPY功能、函数后面不带（）、参数个数最多32767、alter function等 |
| 存储过程 | 存储过程 | 支持函数存储过程(PROCEDURE),满足兼容Oracle存储过程，比如：EDITIONABLE/NONEDITIONABLE,、函数后面不带（）、参数个数最多32767、存储过程调用支持EXEC 、ALTER PROCEDURE语法等 |
| OUT参数 | libpq | Oracle OCI接口中支持SQL语句按名字绑定参数。IvorySQL目前libpq接口中只支持SQL语句按位置绑定参数，不支持按名字绑定参数。需求构造与OCI接口类似的prepare、bind以及execute函数 |
| OUT参数 | 存储过程 | 创建存储过程参数的语法，其中参数模式可以是IN、OUT、 IN OUT，创建含有out参数的存储过程语法和存储过程调用与Oracle相同 |
| OUT参数 | 函数 | 创建函数参数的语法，其中参数模式可以是IN、OUT、 IN OUT，创建含有out参数的函数语法和函数调用与Oracle相同 |
| 嵌套子函数 | 嵌套子函数 | IvorySQL的PLISQL功能是为满足兼容Oracle的PLSQL而开发的。而Oracle中的PLSQL支持在子过程中声明与定义子过程，并且子过程是可以重载的，这样的子过程包括函数与存储过程，同样，子过程中又可以嵌套子过程，这样非常方便，并有利于PLSQL编程人员灵活运用，为了在以后项目中Oracle的PLSQL程序能够顺利迁入IvorySQL，故在PLISQL端，我们也支持上述语法与用法 |
| SQL | rowid | 提供与Oracle兼容的rowid伪列 |
| SQL | 操作符-like | 兼容 Oracle 的like 操作符而开发的，Oracle 的like 操作符支持对数字、时间、字符串类型的字段配合通配符来实现模糊查询，ivorySQL只支持字符串类型的字段进行模糊查询，为了兼容Oracle 中的 like 操作符的模糊查询 |
| SQL | 大小写兼容 | 该特性通过支持区分大小写的标识符，确保与Oracle数据库兼容，从而实现与基于Oracle的应用系统无缝集成 |
| SQL | NLS参数 | 支持国家语言支持(NLS)参数可确保与Oracle的区域特定设置兼容，例如NLS_DATE_FORMAT(日期格式)、NLS_TIMESTAMP_FORMAT(时间戳格式)等 |
| SQL | 空转NULL | 该特性可确保数据库中的空值或未定义值自动转换为NULL。此机制在处理数据导入、用户输入或遗留系统时尤为实用——当缺失值或空白值未被显式标记为NULL时，系统通过自动转换提供统一处理方式，从而减少潜在错误并提升数据完整性 |
| 视图 | force view | 创建视图时，指定FORCE选项，则视图的基表不存在、引用了不存在的对象类型或者当前模式的拥有者不具有创建视图的权限这几种情况下，可以创建视图成功，不会报错，但会出现警告 |
| 工具 | 切换parser | 该特性支持在Oracle与PostgreSQL两种SQL解析模式间自由切换，允许用户根据需求选择最适合的语法规则和运行行为，从而确保同时兼容Oracle和PostgreSQL生态体系 |

### 以往版本的兼容特性
以往版本已经实现的Oracle兼容特性，可以查看IvorySQL文档中心的[Oracle兼容功能列表](https://docs.ivorysql.org/cn/ivorysql-doc/v4.4/v4.4/14)。