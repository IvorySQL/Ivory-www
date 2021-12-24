import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div class="row">
          <div className={styles.heroLeftImage}>
          </div>

          <div className={styles.heroCenterImage}>
          <h1 className="hero__title"><Translate>IvorySQL</Translate></h1>
        <p className="hero__subtitle"><Translate>Open Source Oracle compatible PostgreSQL</Translate></p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://github.com/IvorySQL/IvorySQL/blob/master/README">
            <Translate>Learn More</Translate>
          </Link>
        </div>

          </div>
          <div className={styles.heroRightImage}>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Open Source Oracle compatible PostgreSQL">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
