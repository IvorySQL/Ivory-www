import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '../components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';
import '../css/index.css';

function HomepageHeader() {
  return (
    <div class="homepage-header" id="id-homepage-header">
        <div class="header-font">
            <p class="header-title">
              <Translate>
                Open Source PostgreSQL with Oracle
                compatibility Features
              </Translate>
            </p>
            {/* <p class="header-content">基于PostgreSQL兼容Oracle的开源数据库</p> */}
        <div id="Link" class="Link">
            <Link
              className="button button--secondary button--lg" 
              id="header-link-getstart"
              to="https://github.com/IvorySQL/IvorySQL">
                <div class="button-font-getstart" id="id-button-font-getstart">Get Started</div>
            </Link>
            <Link 
              className="button button--secondary button--lg" 
              id="header-link-viewmore"
              to="https://github.com/IvorySQL/IvorySQL/blob/master/README.md">
                <div class="button-font-viewmore" id="id-button-font-viewmore">View More</div>
            </Link>
        </div>
      </div>
    </div>
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
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
