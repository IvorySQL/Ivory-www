import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Translate, {translate} from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate>Open Source</Translate>,
    Svg: require('../../static/img/fp_open_source.svg').default,
    description: (
      <>
        <Translate>No Vendor Lock-In</Translate>
      </>
    ),
  },
  {
    title: <Translate>Powered by PostgreSQL</Translate>,
    Svg: require('../../static/img/postgresql-icon.svg').default,
    description: (
      <>
        <Translate>Based on PostgreSQL, with full SQL, rock-solid reliability, and a massive ecosystem.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Backed by HighGo</Translate>,
    Svg: require('../../static/img/fp_backed_by_highgo.svg').default,
    description: (
      <>
        <Translate>Supported by HighGo, The leading provider of PostgreSQL database.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Oracle Compatible</Translate>,
    Svg: require('../../static/img/fp_ora_compitable.svg').default,
    description: (
      <>
        <Translate>Migrate your Oracle DB to IvorySQL.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Customization</Translate>,
    Svg: require('../../static/img/fp_advanced_customization.svg').default,
    description: (
      <>
        <Translate>Just download the code and make it as you like.</Translate>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
