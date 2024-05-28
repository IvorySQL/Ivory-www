import React, { useEffect } from 'react';

import Translate, { translate } from '@docusaurus/Translate';

import { followingDotCursor } from '../../utils/cursor'

import styles from './index.module.css';

const FeatureList = [
  {
    title: <Translate>Open Source</Translate>,
    Svg: require('../../../svg/icon-01.svg').default,
    description: (
      <>
        <Translate>No Vendor Lock-In.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Powered by PostgreSQL</Translate>,
    Svg: require('../../../svg/icon-02.svg').default,
    description: (
      <>
        <Translate>Based on PostgreSQL, with full SQL, rock-solid reliability, and a massive ecosystem.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Oracle Compatible</Translate>,
    Svg: require('../../../svg/icon-03.svg').default,
    description: (
      <>
        <Translate>Migrate your Oracle DB to IvorySQL.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Customization</Translate>,
    Svg: require('../../../svg/icon-04.svg').default,
    description: (
      <>
        <Translate>Just download the code and make it as you like.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Backed by HighGo</Translate>,
    Svg: require('../../../svg/icon-05.svg').default,
    description: (
      <>
        <Translate>Supported by HighGo, The leading provider of PostgreSQL database.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Open Community</Translate>,
    Svg: require('../../../svg/icon-06.svg').default,
    description: (
      <>
        <Translate>A creative and open community, work together to create more possibilities.</Translate>
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={styles.feature}>
      <div className={styles.iconContainer}>
        <Svg alt={title} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}


// Open Source Icons in homepage
export default function HomepageFeatures() {
  useEffect(() => {
    const dotCursor = new followingDotCursor({
      dotWidth: 15,
      color: '#eeeeee',
      changeDotBg: true
    })

    return () => {
      dotCursor.destroy()
    }
  }, [])


  return (
    <section className="container">
      <div className={styles.layout}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
