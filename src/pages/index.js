import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React, { useEffect } from 'react';
import styles from './index.module.css';

const Icon01 = require('../../svg/icon-01.svg').default;
const Icon02 = require('../../svg/icon-02.svg').default;
const Icon03 = require('../../svg/icon-03.svg').default;
const Icon04 = require('../../svg/icon-04.svg').default;
const Icon05 = require('../../svg/icon-05.svg').default;
const Icon06 = require('../../svg/icon-06.svg').default;
const HeroElephant = require('../../svg/img-elephant-balloon.svg').default;

const CoreAdvantageIcon = Icon01;
const ScenarioIcon = Icon03;
const EcosystemIcon = Icon02;
const CertificateIcon = Icon05;
const InstallDeployIcon = Icon04;

const CORE_CARD_ICONS = [Icon01, Icon03, Icon04, Icon02, Icon05, Icon06, Icon01, Icon03];
const SCENARIO_CARD_ICONS = [Icon04, Icon02, Icon06, Icon01, Icon05];
const INSTALL_CARD_ICONS = [Icon04, Icon01, Icon06];

const RELEASES_URL = 'https://github.com/IvorySQL/IvorySQL/releases';
const ONLINE_TRIAL_URL = 'http://trial.ivorysql.org:8080/';

const ECOSYSTEM_TOOL_STATUS = {
  progress: new Set(['citus', 'pg_ai_query', 'stackgres', 'databene', 'madlib']),
  planned: new Set(['shardingsphere', 'pacemaker corosync', 'postgresql age', 'yukon', 'powa']),
  proprietary: new Set(['ivymigration', 'ivyevaluation', 'ivorysql serverless']),
};

function normalizeToolName(toolName) {
  return toolName.replace(/\u200c/g, '').toLowerCase().trim();
}

function getEcosystemToolTone(toolName) {
  const normalizedName = normalizeToolName(toolName);
  if (ECOSYSTEM_TOOL_STATUS.proprietary.has(normalizedName)) {
    return 'proprietary';
  }
  if (ECOSYSTEM_TOOL_STATUS.progress.has(normalizedName)) {
    return 'progress';
  }
  if (ECOSYSTEM_TOOL_STATUS.planned.has(normalizedName)) {
    return 'planned';
  }
  return 'supported';
}

const CONTENT = {
  zh: {
    slogan: '一款开源的兼容 Oracle 的 PostgreSQL',
    intro:
      'IvorySQL 是一款先进、功能齐全的开源 Oracle 兼容 PostgreSQL，致力于保持高兼容性，并可作为最新 PostgreSQL 的完全替代品。通过 compatible_mode 开关可在 Oracle 与 PostgreSQL 兼容模式间切换，PL/iSQL 支持 Oracle PL/SQL 语法及 Oracle 风格包（Packages）。',
    heroBadges: ['Oracle 兼容', 'Apache 2.0 开源', '基于 PostgreSQL 内核'],
    latestVersionPrefix: '最新版本',
    latestVersionLabel: 'IvorySQL 5.1',
    actions: [
      { label: '免费下载', to: '/releases-page' },
      { label: '在线体验', href: ONLINE_TRIAL_URL },
      { label: '最新活动', to: '/webinars-page' },
    ],
    coreTitle: 'IvorySQL 核心优势',
    coreDesc: '从内核兼容到生态扩展，提供面向企业生产环境的数据库能力。',
    coreItems: [
      {
        title: '核心开源',
        description: '采用 Apache 2.0 协议开源，无厂商限制，代码透明且支持定制化开发。',
      },
      {
        title: '深度 Oracle 兼容',
        description: '通过 PL/iSQL 过程语言和 ivorysql_ora 插件实现 PL/SQL 语法兼容，支持 Oracle 数据库迁移。',
      },
      {
        title: '国产化全平台兼容',
        description: '全面兼容国内外主流软硬件，兼容国产芯片架构和操作系统，提供全平台介质包确保便捷部署。',
      },
      {
        title: '云原生支持',
        description: '容器化方案覆盖 Docker Compose/Swarm、K8S Operator 及云服务平台。',
      },
      {
        title: '企业级支持',
        description: '由瀚高股份提供技术支持，并在多个企业生产环境落地。',
      },
      {
        title: '生态融合',
        description: '继承 PostgreSQL 完整 SQL 能力、可靠性和丰富生态组件。',
      },
      {
        title: '场景覆盖广',
        description: '覆盖企业数据库、LBS、数据仓库、建站开发、数据库迁移等核心场景。',
      },
      {
        title: '易用性强',
        description: '降低系统管理成本，提供开发者友好接口和第三方工具集成能力。',
      },
    ],
    scenariosTitle: 'IvorySQL 应用场景',
    scenariosDesc: '覆盖从交易系统到分析平台的典型数据库工作负载。',
    scenarioItems: [
      {
        title: '企业数据库',
        description: '适用于 ERP、交易系统、财务系统等对高可用和复杂业务逻辑有要求的场景。',
      },
      {
        title: 'LBS 应用',
        description: '支持地理空间查询（如 O2O、游戏地图），通过 PostGIS 实现位置服务。',
      },
      {
        title: '数据仓库 / 大数据',
        description: '利用丰富数据类型和计算能力搭建分析平台。',
      },
      {
        title: '建站 / App 开发',
        description: '依托高性能能力提升网站与应用效率。',
      },
      {
        title: '数据库迁移',
        description: '支持将 Oracle 数据库迁移到 IvorySQL。',
      },
    ],
    installTitle: 'IvorySQL 安装部署',
    installDesc:
      '结合官网文档与版本发布信息，提供从快速上手到生产部署的清晰路径，可按环境选择包安装、源码构建或容器化部署。',
    installItems: [
      {
        title: '快速安装（推荐）',
        description: '通过官方安装文档完成依赖准备、实例初始化和服务启动，适合首次体验与标准化部署。',
        action: { label: '查看安装文档', to: '/docs-installation' },
      },
      {
        title: '版本与介质包安装',
        description: '在 Releases 页面查看当前稳定版本与历史版本，并根据系统环境选择对应安装介质包。',
        action: { label: '查看 Releases', to: '/releases-page' },
      },
      {
        title: '容器化部署',
        description: '基于官方 Docker 仓库进行镜像部署，便于在开发测试、CI/CD 与云原生环境中快速落地。',
        action: { label: '查看 Docker 仓库', href: 'https://github.com/IvorySQL/docker_library' },
      },
    ],
    ecosystemTitle: 'IvorySQL 及周边工具生态',
    ecosystemDesc:
      '社区提供丰富的生态工具：客户端工具、高可用工具、云原生工具、监控运维工具、备份恢复工具、地理信息工具等。',
    ecosystemGroups: [
      { title: '数据访问中间件', items: ['pgpool-II', 'pgBouncer', 'odyssey', 'HAProxy', 'ShardingSphere', 'Citus', 'vip-manager'], wide: true },
      { title: 'ORM', items: ['Go', 'NodeJS', 'MyBatis', 'Hibernate'] },
      { title: '标准 SQL 及驱动', items: ['libpq', 'JDBC', 'ODBC', 'NodeJS', 'psycopg2', 'Go', 'Python', 'Rust', 'Ruby', 'ADO.NET', 'lib/pq', 'pgx'], wide: true },
      { title: '客户端工具', items: ['DBeaver', 'pgAdmin', 'Navicat', 'Navicat Premium'] },
      { title: '内核扩展', items: ['Oracle 兼容', 'PG 兼容及跟进'] },
      { title: '高可靠', items: ['pg_rman', 'WAL-G', 'pg_probackup', 'pgBackRest'] },
      { title: '集群工具', items: ['Patroni', 'repmgr', 'Pacemaker Corosync'] },
      { title: '监控运维', items: ['Prometheus', 'Alertmanager', 'pgMonitor', 'Grafana', 'PoWA'] },
      { title: '异构数据库访问工具', items: ['Debezium', 'pglogical', 'mysql_fdw', 'oracle_fdw'] },
      { title: '多模数据库', items: ['TimescaleDB', 'DocumentDB', 'PostgreSQL AGE', 'FerretDB'] },
      { title: '地理信息', items: ['PostGIS', 'pgRouting'] },
      { title: '机器学习及 AI', items: ['pgvector', 'MADlib', 'pg_ai_query'] },
      { title: 'DDL 及数据加载工具', items: ['pg_bulkload', 'ddlx'] },
      { title: '在线体验平台', items: ['postgres-wasm', 'IVYOnlineTrial'] },
      { title: '定时任务工具', items: ['pg_cron', 'pgAgent', 'pg_jobs'] },
      { title: '生态合作', items: ['Yukon', 'StackGres', 'Databene', 'WhaleOps'] },
      { title: '迁移/评估工具', items: ['Ora2Pg', 'ivyMigration', 'ivyEvaluation'] },
      {
        title: '云生态',
        items: ['Docker Compose', 'Podman', 'Docker Swarm', 'IvorySQL Cloud', 'IvorySQL Operator', 'IvorySQL Serverless'],
      },
    ],
    ecosystemFooters: [
      '操作系统（windows / CentOS / Redhat / ubuntu / openEuler / 银河麒麟 / 统信 UOS 等）',
      'x86、鲲鹏、龙芯、兆芯、申威、海光、飞腾、MIPS、RISC-V',
    ],
    ecosystemLegend: [
      { label: '已支持', tone: 'supported' },
      { label: '正在支持', tone: 'progress' },
      { label: '未来支持', tone: 'planned' },
      { label: '闭源产品', tone: 'proprietary' },
    ],
    compatibilityTitle: 'IvorySQL 兼容认证',
    compatibilityDesc: '更多兼容认证与生态合作信息，请查看合作伙伴页面。',
    compatibilityCta: '查看兼容认证详情',
  },
  en: {
    slogan: 'An open source PostgreSQL with Oracle compatibility',
    intro:
      'IvorySQL is an advanced open source Oracle-compatible PostgreSQL distribution built for strong compatibility and smooth replacement of the latest PostgreSQL. The compatible_mode switch lets you move between Oracle and PostgreSQL modes, while PL/iSQL supports Oracle PL/SQL syntax and package-style development.',
    heroBadges: ['Oracle compatibility', 'Apache 2.0 open source', 'Built on PostgreSQL kernel'],
    latestVersionPrefix: 'Latest Version',
    latestVersionLabel: 'IvorySQL 5.1',
    actions: [
      { label: 'Free Download', to: '/releases-page' },
      { label: 'Online Trial', href: ONLINE_TRIAL_URL },
      { label: 'Latest Webinars', to: '/webinars-page' },
    ],
    coreTitle: 'Core Advantages',
    coreDesc: 'From kernel compatibility to ecosystem integration, built for production workloads.',
    coreItems: [
      {
        title: 'Open Source Core',
        description: 'Apache 2.0 licensed with no vendor lock-in, transparent code, and easy customization.',
      },
      {
        title: 'Deep Oracle Compatibility',
        description: 'PL/iSQL and the ivorysql_ora extension provide strong PL/SQL compatibility for Oracle migrations.',
      },
      {
        title: 'Full-Platform Compatibility',
        description: 'Compatible with mainstream hardware and operating systems, including domestic chip architectures.',
      },
      {
        title: 'Cloud-Native Support',
        description: 'Container-ready support across Docker Compose/Swarm, K8S Operator, and cloud platforms.',
      },
      {
        title: 'Enterprise Support',
        description: 'Backed by HighGo and validated in production-grade enterprise deployments.',
      },
      {
        title: 'Ecosystem Integration',
        description: 'Inherits PostgreSQL SQL completeness, reliability, and ecosystem extensibility.',
      },
      {
        title: 'Broad Scenario Coverage',
        description: 'Covers enterprise workloads, LBS, data warehousing, web/app development, and migrations.',
      },
      {
        title: 'Easy to Use',
        description: 'Reduces management overhead with developer-friendly interfaces and third-party integration.',
      },
    ],
    scenariosTitle: 'Application Scenarios',
    scenariosDesc: 'Supports mainstream database workloads from OLTP systems to analytical platforms.',
    scenarioItems: [
      {
        title: 'Enterprise Databases',
        description: 'Fits ERP, transaction systems, and finance systems requiring high availability and complex logic.',
      },
      {
        title: 'LBS Applications',
        description: 'Supports geospatial workloads such as O2O and game maps through PostGIS.',
      },
      {
        title: 'Data Warehouse / Big Data',
        description: 'Build analytical platforms with rich data types and robust processing capabilities.',
      },
      {
        title: 'Websites / App Development',
        description: 'Improves website and application efficiency with high-performance database capabilities.',
      },
      {
        title: 'Database Migration',
        description: 'Enables direct migration paths from Oracle databases to IvorySQL.',
      },
    ],
    installTitle: 'IvorySQL Installation & Deployment',
    installDesc:
      'Based on official docs and release resources, choose package installation, source build, or container deployment to match your environment.',
    installItems: [
      {
        title: 'Quick Installation (Recommended)',
        description:
          'Follow the official installation guide to prepare dependencies, initialize clusters, and start services quickly.',
        action: { label: 'Installation Guide', to: '/docs-installation' },
      },
      {
        title: 'Packages & Releases',
        description:
          'Use the Releases page to check stable/historical versions and pick proper installation packages for your platform.',
        action: { label: 'View Releases', to: '/releases-page' },
      },
      {
        title: 'Container Deployment',
        description:
          'Use the official Docker repository for fast setup in development, CI/CD pipelines, and cloud-native environments.',
        action: { label: 'Docker Repository', href: 'https://github.com/IvorySQL/docker_library' },
      },
    ],
    ecosystemTitle: 'IvorySQL Ecosystem & Tools',
    ecosystemDesc:
      'The community provides a rich ecosystem of tools, including client tools, high availability tools, cloud-native tools, monitoring and operations tools, backup and recovery tools, and geospatial tools.',
    ecosystemGroups: [
      {
        title: 'Data Access Middleware',
        items: ['pgpool-II', 'pgBouncer', 'odyssey', 'HAProxy', 'ShardingSphere', 'Citus', 'vip-manager'],
        wide: true,
      },
      { title: 'ORM', items: ['Go', 'NodeJS', 'MyBatis', 'Hibernate'] },
      {
        title: 'Standard SQL & Drivers',
        items: ['libpq', 'JDBC', 'ODBC', 'NodeJS', 'psycopg2', 'Go', 'Python', 'Rust', 'Ruby', 'ADO.NET', 'lib/pq', 'pgx'],
        wide: true,
      },
      { title: 'Client Tools', items: ['DBeaver', 'pgAdmin', 'Navicat', 'Navicat Premium'] },
      { title: 'Core Extensions', items: ['Oracle Compatibility', 'PG Compatibility & Upstream Tracking'] },
      { title: 'High Availability', items: ['pg_rman', 'WAL-G', 'pg_probackup', 'pgBackRest'] },
      { title: 'Cluster Management Tools', items: ['Patroni', 'repmgr', 'Pacemaker Corosync'] },
      { title: 'Monitoring & Operations', items: ['Prometheus', 'Alertmanager', 'pgMonitor', 'Grafana', 'PoWA'] },
      { title: 'Heterogeneous Access Tools', items: ['Debezium', 'pglogical', 'mysql_fdw', 'oracle_fdw'] },
      { title: 'Multi-Model Database', items: ['TimescaleDB', 'DocumentDB', 'PostgreSQL AGE', 'FerretDB'] },
      { title: 'Geospatial', items: ['PostGIS', 'pgRouting'] },
      { title: 'Machine Learning & AI', items: ['pgvector', 'MADlib', 'pg_ai_query'] },
      { title: 'DDL & Data Loading Tools', items: ['pg_bulkload', 'ddlx'] },
      { title: 'Online Demo Platform', items: ['postgres-wasm', 'IVYOnlineTrial'] },
      { title: 'Job Scheduling Tools', items: ['pg_cron', 'pgAgent', 'pg_jobs'] },
      { title: 'Ecosystem Partnerships', items: ['Yukon', 'StackGres', 'Databene', 'WhaleOps'] },
      { title: 'Migration & Assessment Tools', items: ['Ora2Pg', 'ivyMigration', 'ivyEvaluation'] },
      {
        title: 'Cloud Ecosystem',
        items: ['Docker Compose', 'Podman', 'Docker Swarm', 'IvorySQL Cloud', 'IvorySQL Operator', 'IvorySQL Serverless'],
      },
    ],
    ecosystemFooters: [
      'Operating System (windows / CentOS / Redhat / ubuntu / openEuler / kylin OS / UnionTech OS)',
      'x86 / Kunpeng / LoongArch / Zhaoxin / Sunway / Hygon / Phytium / MIPS / RISC-V',
    ],
    ecosystemLegend: [
      { label: 'Supported', tone: 'supported' },
      { label: 'Support In Progress', tone: 'progress' },
      { label: 'Support Planned', tone: 'planned' },
      { label: 'Proprietary Software', tone: 'proprietary' },
    ],
    compatibilityTitle: 'IvorySQL Compatibility Certificates',
    compatibilityDesc: 'See more compatibility certificates and ecosystem partnerships on the partners page.',
    compatibilityCta: 'View Compatibility Details',
  },
};

function ActionLink({ action, className }) {
  if (action.href) {
    return (
      <Link className={className} href={action.href}>
        {action.label}
      </Link>
    );
  }
  return (
    <Link className={className} to={action.to}>
      {action.label}
    </Link>
  );
}

function ChatWidget() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.1.0-beta.3/libs/cn/index.js';
    script.async = true;

    script.onload = () => {
      if (window.CozeWebSDK && window.CozeWebSDK.WebChatClient) {
        new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: customFields.botId,
          },
          componentProps: {
            title: 'IvorySQL Chatroom',
            icon: 'https://raw.githubusercontent.com/IvorySQL/Ivory-www/main/static/img/ivory-black.png',
          },
          auth: {
            type: 'token',
            token: customFields.patToken,
            onRefreshToken() {
              return customFields.patToken;
            },
          },
        });
      } else {
        console.error('Failed to load CozeWebSDK.');
      }
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [customFields.botId, customFields.patToken]);

  return null;
}

function SectionTitle({ title, Icon }) {
  return (
    <div className={styles.sectionHead}>
      <div className={styles.sectionTitleRow}>
        {Icon ? (
          <span className={styles.sectionIcon} aria-hidden="true">
            <Icon />
          </span>
        ) : null}
        <h2>{title}</h2>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const isZh = i18n.currentLocale.toLowerCase().startsWith('zh');
  const content = isZh ? CONTENT.zh : CONTENT.en;
  const certImages = [
    '/img/partners/cert1.jpg',
    '/img/partners/cert2.jpg',
    '/img/partners/cert3.jpg',
    '/img/partners/cert4.jpg',
    '/img/partners/cert5.png',
  ];
  const certCarouselImages = [...certImages, ...certImages];

  return (
    <Layout title={`${siteConfig.title}`} description="Open Source Oracle compatible PostgreSQL">
      <ChatWidget />
      <main className={styles.homePage}>
        <section className={styles.heroSection}>
          <div className={clsx('container', styles.heroContainer)}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>IvorySQL</h1>
              <p className={styles.slogan}>{content.slogan}</p>
              <div className={styles.heroBadges}>
                {content.heroBadges.map((badge) => (
                  <span key={badge} className={styles.heroBadge}>
                    {badge}
                  </span>
                ))}
              </div>
              <p className={styles.heroIntro}>{content.intro}</p>
              <div className={styles.latestVersion}>
                <span>{content.latestVersionPrefix}</span>
                <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">
                  {content.latestVersionLabel}
                </a>
              </div>
              <div className={styles.heroActions}>
                {content.actions.map((action) => (
                  <ActionLink
                    key={action.label}
                    className={clsx('button button--lg', styles.actionButton)}
                    action={action}
                  />
                ))}
              </div>
            </div>
            <div className={styles.heroVisual} aria-hidden="true">
              <HeroElephant />
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionToneCore)}>
          <div className="container">
            <SectionTitle title={content.coreTitle} Icon={CoreAdvantageIcon} />
            <p className={styles.sectionDescription}>{content.coreDesc}</p>
            <div className={styles.advantagesGrid}>
              {content.coreItems.map((item, index) => {
                const CardIcon = CORE_CARD_ICONS[index % CORE_CARD_ICONS.length];
                return (
                  <article key={item.title} className={styles.infoCard}>
                    <div className={styles.cardTitleRow}>
                      <span className={styles.cardIcon}>
                        <CardIcon />
                      </span>
                      <h3>{item.title}</h3>
                    </div>
                    <p>{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionToneScenario)}>
          <div className="container">
            <SectionTitle title={content.scenariosTitle} Icon={ScenarioIcon} />
            <p className={styles.sectionDescription}>{content.scenariosDesc}</p>
            <div className={styles.scenariosGrid}>
              {content.scenarioItems.map((item, index) => {
                const CardIcon = SCENARIO_CARD_ICONS[index % SCENARIO_CARD_ICONS.length];
                return (
                  <article key={item.title} className={styles.infoCard}>
                    <div className={styles.cardTitleRow}>
                      <span className={styles.cardIcon}>
                        <CardIcon />
                      </span>
                      <h3>{item.title}</h3>
                    </div>
                    <p>{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionToneDeployment)}>
          <div className="container">
            <SectionTitle title={content.installTitle} Icon={InstallDeployIcon} />
            <p className={clsx(styles.sectionDescription, styles.wideDescription)}>{content.installDesc}</p>
            <div className={styles.deploymentGrid}>
              {content.installItems.map((item, index) => {
                const CardIcon = INSTALL_CARD_ICONS[index % INSTALL_CARD_ICONS.length];
                return (
                  <article key={item.title} className={styles.deploymentCard}>
                    <div className={styles.cardTitleRow}>
                      <span className={styles.cardIcon}>
                        <CardIcon />
                      </span>
                      <h3>{item.title}</h3>
                    </div>
                    <p>{item.description}</p>
                    <ActionLink className={clsx('button button--sm', styles.deployAction)} action={item.action} />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionToneEcosystem)}>
          <div className="container">
            <SectionTitle title={content.ecosystemTitle} Icon={EcosystemIcon} />
            <p className={clsx(styles.sectionDescription, styles.wideDescription)}>{content.ecosystemDesc}</p>
            <div className={styles.ecosystemFrame}>
              <div className={styles.ecosystemGrid}>
                {content.ecosystemGroups.map((group) => (
                  <article
                    key={group.title}
                    className={clsx(styles.ecosystemGroup, group.wide && styles.ecosystemGroupWide)}
                  >
                    <h3>{group.title}</h3>
                    <div className={styles.ecosystemItems}>
                      {group.items.map((item) => {
                        const tone = getEcosystemToolTone(item);
                        return (
                          <span
                            key={`${group.title}-${item}`}
                            className={clsx(styles.ecosystemItem, styles[`ecosystemItem${tone}`])}
                          >
                            <i className={styles[`ecosystemDot${tone}`]} aria-hidden="true" />
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.ecosystemFooters}>
                {content.ecosystemFooters.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className={styles.ecosystemLegend}>
                {content.ecosystemLegend.map((legend) => (
                  <span key={legend.label} className={styles.ecosystemLegendItem}>
                    <i className={styles[`ecosystemDot${legend.tone}`]} aria-hidden="true" />
                    {legend.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionToneCertificate)}>
          <div className="container">
            <SectionTitle title={content.compatibilityTitle} Icon={CertificateIcon} />
            <p className={styles.sectionDescription}>{content.compatibilityDesc}</p>
            <div className={styles.certCarouselContainer}>
              <div className={styles.certTrack}>
                {certCarouselImages.map((image, index) => (
                  <div className={styles.certSlide} key={`${image}-${index}`}>
                    <Link to="/partners-page" className={styles.certSlideLink}>
                      <img
                        src={image}
                        alt={`${content.compatibilityTitle} ${(index % certImages.length) + 1}`}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.compatibilityAction}>
              <Link className={clsx('button button--primary button--lg')} to="/partners-page">
                {content.compatibilityCta}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
