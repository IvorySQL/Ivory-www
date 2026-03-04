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
const ArchitectureIcon = Icon04;
const EcosystemIcon = Icon02;
const CertificateIcon = Icon05;

const CORE_CARD_ICONS = [Icon01, Icon03, Icon04, Icon02, Icon05, Icon06, Icon01, Icon03];
const SCENARIO_CARD_ICONS = [Icon04, Icon02, Icon06, Icon01, Icon05];

const RELEASES_URL = 'https://github.com/IvorySQL/IvorySQL/releases';
const ONLINE_TRIAL_URL = 'http://trial.ivorysql.org:8080/';

const CONTENT = {
  zh: {
    slogan: '一款开源的 100% 兼容 Oracle 的 PostgreSQL',
    intro:
      'IvorySQL 是一款先进、功能齐全的开源 Oracle 兼容 PostgreSQL，致力于始终保持 100% 兼容，并可作为最新 PostgreSQL 的完全替代品。通过 compatible_db 开关可在 Oracle 与 PostgreSQL 兼容模式间切换，PL/iSQL 支持 Oracle PL/SQL 语法及 Oracle 风格包（Packages）。',
    heroBadges: ['100% Oracle 兼容', 'Apache 2.0 开源', '基于 PostgreSQL 内核'],
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
    architectureTitle: 'IvorySQL 架构',
    architectureAlt: 'IvorySQL 架构图',
    ecosystemTitle: 'IvorySQL 及周边工具生态全景图',
    ecosystemAlt: 'IvorySQL 及周边工具生态全景图',
    compatibilityTitle: '兼容认证',
    compatibilityDesc: '更多兼容认证与生态合作信息，请查看合作伙伴页面。',
    compatibilityCta: '查看兼容认证详情',
  },
  en: {
    slogan: 'An open source PostgreSQL with 100% Oracle compatibility',
    intro:
      'IvorySQL is an advanced open source Oracle-compatible PostgreSQL distribution built for complete compatibility and smooth replacement of the latest PostgreSQL. The compatible_db switch lets you move between Oracle and PostgreSQL modes, while PL/iSQL supports Oracle PL/SQL syntax and package-style development.',
    heroBadges: ['100% Oracle compatibility', 'Apache 2.0 open source', 'Built on PostgreSQL kernel'],
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
    architectureTitle: 'IvorySQL Architecture',
    architectureAlt: 'IvorySQL architecture diagram',
    ecosystemTitle: 'IvorySQL Ecosystem Panorama',
    ecosystemAlt: 'IvorySQL ecosystem panorama',
    compatibilityTitle: 'Compatibility Certificates',
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

        <section className={clsx(styles.section, styles.sectionToneArchitecture)}>
          <div className="container">
            <SectionTitle title={content.architectureTitle} Icon={ArchitectureIcon} />
            <div className={styles.diagramCard}>
              <img src="/img/home-architecture.png" alt={content.architectureAlt} />
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionToneEcosystem)}>
          <div className="container">
            <SectionTitle title={content.ecosystemTitle} Icon={EcosystemIcon} />
            <div className={styles.diagramCard}>
              <img src="/img/home-ecosystem.png" alt={content.ecosystemAlt} />
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
