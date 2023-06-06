import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Translate, {translate} from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate>Open Source</Translate>,
    Svg: require('../../svg/icon-01.svg').default,
    description: (
      <>
        <Translate>No Vendor Lock-In</Translate>
      </>
    ),
  },
  {
    title: <Translate>Powered by PostgreSQL</Translate>,
    Svg: require('../../svg/icon-02.svg').default,
    description: (
      <>
        <Translate>Based on PostgreSQL, with full SQL, rock-solid reliability, and a massive ecosystem.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Oracle Compatible</Translate>,
    Svg: require('../../svg/icon-03.svg').default,
    description: (
      <>
        <Translate>Migrate your Oracle DB to IvorySQL.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Customization</Translate>,
    Svg: require('../../svg/icon-04.svg').default,
    description: (
      <>
        <Translate>Just download the code and make it as you like.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Backed by HighGo</Translate>,
    Svg: require('../../svg/icon-05.svg').default,
    description: (
      <>
        <Translate>Supported by HighGo, The leading provider of PostgreSQL database.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Open Community</Translate>,
    Svg: require('../../svg/icon-06.svg').default,
    description: (
      <>
        <Translate>A creative and open community, work together to create more possibilities.</Translate>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')} style={{height:'300px'}}>
      <div className="text--center" id="homepage-svg" style={{
        backgroundColor:'#f4f4f4',
        width:'130px',
        height:'130px',
        margin:'auto',
        textAlign:'center',
        borderRadius:'65px',
      }}>
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md" style={{
        position:'relative',
        top:'20px',
      }}>
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
