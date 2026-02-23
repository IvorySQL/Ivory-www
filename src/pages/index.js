import React, { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Slider from "react-slick";
import HomepageFeatures from '../components/HomepageFeatures';
import styles from './index.module.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroSection() {
  return (
    <header className={styles.techHero}>
      <div className={styles.gridOverlay}></div>
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.versionTag}><Translate>Latest Release: IvorySQL 5.1</Translate></div>
          <h1 className={styles.heroSlogan}>
            <Translate>An Open Source 100% Oracle-Compatible PostgreSQL</Translate>
          </h1>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="https://github.com/IvorySQL/IvorySQL/releases"><Translate>Free Download</Translate></Link>
            <Link className="button button--secondary button--lg" to="http://trial.ivorysql.org:8080/"><Translate>Online Trial</Translate></Link>
            <Link className={clsx("button button--outline button--lg", styles.btnOutlineCustom)} to="/events"><Translate>Latest Events</Translate></Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function IntroSection() {
  return (
    <section className={styles.introBlock}>
      <div className="container">
        <div className={styles.contentCard}>
          <h2 className={styles.introTitle}><Translate>What is IvorySQL?</Translate></h2>
          <p className={styles.introText}>
            <Translate>IvorySQL is an advanced, fully featured, open-source Oracle-compatible PostgreSQL, dedicated to maintaining 100% compatibility and serving as a drop-in replacement for the latest PostgreSQL. IvorySQL adds a "compatible_db" switch, allowing switching between Oracle and PostgreSQL modes. A highlight is the PL/iSQL procedural language, supporting Oracle's PL/SQL syntax and Oracle-style packages.</Translate>
          </p>
          <div className={styles.versionFooter}>
            <span><Translate>Latest Release: </Translate><strong>IvorySQL 5.1</strong></span>
            <Link to="https://github.com/IvorySQL/IvorySQL/releases" className={styles.releaseLink}><Translate>View Release Notes</Translate> →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScenarioSection() {
  const scenarios = [
    { title: <Translate>Enterprise DB</Translate>, desc: <Translate>For ERP, trading, and financial systems requiring high availability.</Translate>, icon: '🏢' },
    { title: <Translate>LBS Applications</Translate>, desc: <Translate>Supports geospatial queries via PostGIS for location services.</Translate>, icon: '📍' },
    { title: <Translate>Data Warehouse</Translate>, desc: <Translate>Build analysis platforms using rich data types and calculation power.</Translate>, icon: '📊' },
    { title: <Translate>Web/App Dev</Translate>, desc: <Translate>Enhance efficiency with high-performance database features.</Translate>, icon: '🚀' },
    { title: <Translate>DB Migration</Translate>, desc: <Translate>Directly migrate Oracle databases to IvorySQL with ease.</Translate>, icon: '🔄' },
  ];
  return (
    <section className={styles.scenarioSection}>
      <div className="container">
        <div className={styles.centeredHeader}>
          <h2 className={styles.sectionMainTitle}><Translate>Application Scenarios</Translate></h2>
          <div className={styles.titleLine}></div>
        </div>
        <div className={styles.scenarioGrid}>
          {scenarios.map((s, idx) => (
            <div key={idx} className={styles.scenarioCard}>
              <div className={styles.scIcon}>{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DiagramSection({ title, img, gray }) {
  return (
    <section className={clsx(styles.diagramBlock, gray && styles.bgGray)}>
      <div className="container text--center">
        <div className={styles.centeredHeader}>
          <h2 className={styles.sectionMainTitle}><Translate>{title}</Translate></h2>
          <div className={styles.titleLine}></div>
        </div>
        <div className={styles.imgWrapper}>
          <img src={useBaseUrl(img)} alt={title} />
        </div>
      </div>
    </section>
  );
}

function CertSlider() {
  const settings = {
    dots: false, infinite: true, speed: 4000, slidesToShow: 4, slidesToScroll: 1, 
    autoplay: true, autoplaySpeed: 0, cssEase: "linear", arrows: false, pauseOnHover: true,
    responsive: [{ breakpoint: 1024, settings: { slidesToShow: 2 } }]
  };
  
  const certs = [
    '/img/partners/cert1.jpg',
    '/img/partners/cert2.jpg',
    '/img/partners/cert3.jpg',
    '/img/partners/cert4.jpg',
    '/img/partners/cert5.png'
  ];

  return (
    <section className={styles.certBlock}>
      <div className="container">
        <div className={styles.centeredHeader}>
          <h2 className={styles.sectionMainTitle}><Translate>Compatibility Certification</Translate></h2>
          <div className={styles.titleLine}></div>
        </div>
        <div className={styles.carouselContainer}>
          <div className={styles.carouselFadeLeft}></div>
          <Slider {...settings}>
            {certs.map((c, i) => (
              <div key={i} className={styles.certItem}>
                <div className={styles.certImageCard}>
                  <img src={useBaseUrl(c)} alt="IvorySQL Cert" />
                </div>
              </div>
            ))}
          </Slider>
          <div className={styles.carouselFadeRight}></div>
        </div>
      </div>
    </section>
  );
}

function ChatWidget() {
  const {siteConfig} = useDocusaurusContext();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.1.0-beta.3/libs/cn/index.js";
    script.async = true;
    script.onload = () => {
      if (window.CozeWebSDK && window.CozeWebSDK.WebChatClient) {
        new window.CozeWebSDK.WebChatClient({
          config: { bot_id: siteConfig.customFields.botId },
          componentProps: { title: 'IvorySQL Chatroom', icon: 'https://raw.githubusercontent.com/IvorySQL/Ivory-www/main/static/img/ivory-black.png' },
          auth: { type: "token", token: siteConfig.customFields.patToken, onRefreshToken: () => siteConfig.customFields.patToken }
        });
      }
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);
  return null;
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="Oracle-compatible PostgreSQL">
      <ChatWidget />
      <HeroSection />
      <IntroSection />
      <HomepageFeatures />
      <ScenarioSection />
      <DiagramSection title="IvorySQL Architecture" img="/img/architecture.png" gray />
      <DiagramSection title="IvorySQL Ecosystem Full Map" img="/img/ecosystem.png" />
      <CertSlider />
    </Layout>
  );
}