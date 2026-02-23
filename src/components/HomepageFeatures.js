import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Translate from '@docusaurus/Translate';

const AdvantageList = [
  { title: <Translate>Core Open Source</Translate>, icon: "🔓", desc: <Translate>Open source under Apache 2.0 license with no vendor lock-in, transparent code, and support for custom development.</Translate> },
  { title: <Translate>Deep Oracle Compatibility</Translate>, icon: "🔄", desc: <Translate>Achieves PL/SQL syntax compatibility through PL/iSQL and ivorysql_ora plugin, supporting smooth Oracle migrations.</Translate> },
  { title: <Translate>Full Platform Compatibility</Translate>, icon: "💻", desc: <Translate>Compatible with mainstream hardware/software and local chip architectures, providing packages for easy deployment.</Translate> },
  { title: <Translate>Cloud Native Support</Translate>, icon: "☁️", desc: <Translate>Container solutions covering mainstream technologies like Docker Compose/Swarm, K8S Operator, and cloud platforms.</Translate> },
  { title: <Translate>Enterprise Grade Support</Translate>, icon: "🛡️", desc: <Translate>Backed by Highgo with solid technical support and verified in real-world enterprise production environments.</Translate> },
  { title: <Translate>Ecosystem Integration</Translate>, icon: "🌐", desc: <Translate>Inherits PostgreSQL's complete SQL support, rock-solid reliability, and a massive global developer ecosystem.</Translate> },
  { title: <Translate>Wide Scenario Coverage</Translate>, icon: "🗺️", desc: <Translate>Supports enterprise DB, LBS applications, data warehousing, web development, and database migrations.</Translate> },
  { title: <Translate>Highly Usable</Translate>, icon: "⚡", desc: <Translate>Reduces system management costs with developer-friendly interfaces and rich third-party tool integration.</Translate> },
];

export default function HomepageFeatures() {
  return (
    <section className={styles.advSection}>
      <div className="container">
        <div className={styles.centeredHeader}>
          <h2 className={styles.sectionTitle}><Translate>Core Advantages</Translate></h2>
          <div className={styles.titleLine}></div>
        </div>
        <div className={styles.advGrid}>
          {AdvantageList.map((item, idx) => (
            <div key={idx} className={styles.advCard}>
              <div className={styles.advIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}