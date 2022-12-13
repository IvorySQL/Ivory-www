import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './building.css';
function HomepageHeader() {
  return (
    <body>
      <div class="building-all">
        <div class="building">
          <img src={require('../../svg/img-under-construction.jpg').default} class="actionimg-l" alt="" />
        </div>
        <div class="b-building">页面正在建设中...</div>
      </div>
    </body>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Open Source Oracle compatible PostgreSQL">
      <main>
      <HomepageHeader />
      </main>
    </Layout>
  );
}
