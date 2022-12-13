import React from 'react';
import Layout from '@theme/Layout';
import Releaseimg from '../../svg/img-release.svg';
import Up from '../../svg/icon-btn-up.svg';
import Down from '../../svg/icon-btn-down.svg';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './release.css';
function Release() {
  return (
    <body>
        <div class="release">
            <div class="release-left">
                <div class="release-left-uppertitle">
                    <div class="colorblock"></div>
                    <div class="uppertile-font">IvorySQL Releases</div>
                </div>
                <div class="release-left-timeline">
                    <div class="timeline-line">
                        <div class="release-left-years"><Up class="upimg"></Up><span>2022</span></div>
                        <div class="spot"></div>
                        <div class="line"></div>
                        <div class="spot"></div>
                        <div class="line"></div>
                        <div class="spot"></div>
                        <div class="line"></div>
                        <div class="spot"></div>
                        <div class="line"></div>
                        <div class="spot"></div>
                        <div class="release-left-years" id="release-left-years-2021"><Down class="upimg"></Down><span>2021</span></div>
                        <div class="spot" id="last-spot"></div>
                    </div>
                    <div class="alltimeline">
                        <div class="timeline-15">
                            <span class="timeline-date">09/09</span><a href="/ivorysql-v1-5-release-page"><span class="timeline-edition">IvorySQL 1.5 STABLE</span></a><span class="timeline-new">New!</span>
                        </div>
                        <div class="timeline-14">
                            <span class="timeline-date">06/28</span><a href="ivorysql-v1-4-release-page"><span class="timeline-edition">IvorySQL 1.4 STABLE</span></a>
                        </div>
                        <div class="timeline-13">
                            <span class="timeline-date">05/27</span><a href="ivorysql-v1-3-release-page"><span class="timeline-edition">IvorySQL 1.3 STABLE</span></a>
                        </div>
                        <div class="timeline-12">
                            <span class="timeline-date">02/28</span><a href="ivorysql-v1-2-release-page"><span class="timeline-edition">IvorySQL 1.2 STABLE</span></a>
                        </div>
                        <div class="timeline-11">
                            <span class="timeline-date">01/25</span><a href="ivorysql-v1-1-release-page"><span class="timeline-edition">IvorySQL 1.1 STABLE</span></a>
                        </div>
                        <div class="timeline-10">
                            <span class="timeline-date">12/15</span><a href="ivorysql-v1-0-release-page"><span class="timeline-edition">IvorySQL 1.0 STABLE</span></a>
                        </div>
                    </div>
                </div>
                <div class="reelase-left-hr"></div>
                <div class="release-left-lowcontent">
                    <div class="release-left-lowertitle"></div>
                    <div class="release-left-content">
                        <div class="content-title">
                            <div class="colorblock"></div>
                            <div class="uppertile-font">Packages</div>
                            <div class="content-title-font">Maintainer</div>
                        </div>
                        <div class="content-highgo">
                            <div>
                                <img src={require('../../svg/logo-hg.jpg').default} class="release-left-img" alt="" />
                            </div>
                            <div class="content-highgo-line"></div>
                            <div class="YUM">Link</div>
                        </div>
                        <div class="content-font">
                            <span>To provide IvorySQL packages contact</span><span>support@ivorysql.org</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="release-right-img">
                <Releaseimg></Releaseimg>
            </div>
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
      <Release />
      </main>
    </Layout>
  );
}
