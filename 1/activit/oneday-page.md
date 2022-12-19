---
sidebar_position: 1
sidebar_label: 'IvorySQL 2022 一日开源活动'
title: IvorySQL 2022 一日开源活动
---

## IvorySQL Release - 1.5

export const Img = () => (
  <img
    src={require('./banner-activity-opensource.png').default}
    style={{
        width: '394px',
        height: '180px',
        display: 'block',
        position: 'relative',
        left:'-1px',
        top: '-10px',
    }}>
  </img>
);

export const Block = () => (
  <div
    style={{
        width: '300px',
        height: '80px',
        }}>
  </div>
);

export const Time = () => (
  <div
    style={{
        width: '100%',
        height: '50px',
        fontSize: '9px',
        fontFamily: 'Microsoft YaHei',
        fontWeight: '400',
        color: '#333333',
        lineHeight: '14px',
        position: 'relative',
        top: '1px',}}>12.09-11 / 济南喜来登酒店
  </div>
);

export const Link = () => (
  <a href='/blog'>
  <div
    style={{
        width: '89px',
        height: '30px',
        background: '#FFD673',
        borderRadius: '3px',
        position: 'relative',
        left: '-1px',
        top: '-60px',
        fontColor: 'red',
    }}>
    <div
    style={{
        width: '90px',
        height: '40px',
        fontSize: '13px',
        fontFamily: 'Microsoft YaHei',
        fontWeight: '800',
        color: '#252424',
        position: 'relative',
        left: '10px',
        top: '5px',
    }}>→ 立即报名
   </div>
  </div>
  </a>
);

<Time />

<Img />

<Block />

<Link />

硅谷Postgres会议是西海岸最大的PG会议，也是美国乃至全球Postgres年度重要会议之一，于2022年4月7日至8日（PDT）在美国加利福尼亚州圣何塞希尔顿酒店召开。作为面向全球PostgreSQL技术专家、从业者、爱好者的年度技术交流活动，硅谷会议致力于汇集和讨论关于人、Postgres和数据间的关系！会议与主办地硅谷一样极具包容和公平精神，这里汇集了最优秀的演讲者、听众和赞助商，所有人努力为全球Postgres生态系统创造发展机会。 

会议现场人数大概有200多人，是疫情以来聚集人数最多的一次线下会议。

**社区核心人员Bruce Momjian出席**，会议由PostgresConf,Joshua D.Drake, Jim Mlodgenski 等组织。来自中国、美国、加拿大、巴西、西班牙、德国、印度、巴基斯坦等多个国家的人员参与。

**瀚高北美研究院兼中国PostgreSQL分会国际顾问委员会秘书长Grant Zhou作为唯一中国代表，将携IvorySQL项目亮相本次会议。**


以下是由**IvorySQL开源数据库社区**为您带来的硅谷Postgres两日会议简报。

## 部分演讲议题

**IvorySQL--一个基于PostgreSQL的兼容Oracle的开源数据库 --by GRANT ZHOU**


有很多用户需要将他们的应用程序从Oracle迁移到开放源码的Postgres，但是为了支持新的数据库，用户经常需要重新开发应用程序，这很不方便。如果有一个基于Postgres的数据库，并且兼容大多数Oracle语法和函数，对客户来说就太方便了。然而官方的Postgres项目不接受这种代码提交。毕竟，Postgres是Postgres, Oracle是Oracle。因此，IvorySQL项目团队创建一个Oracle兼容的数据库。

本演讲中介绍了如何基于PG实现与Oracle语法兼容的数据库，并介绍IvorySQL项目。这个项目是一个开源项目(Apache 2.0)，由Highgo软件领导，目前已经发布了基于PostgreSQL 14.2版本的IvorySQL 1.2。