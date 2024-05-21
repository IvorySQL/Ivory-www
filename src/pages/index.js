import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import Slider from "react-slick";
import RecruitPhone from "../../static/img/index-recruit-phone.jpg";
import Recruit from "../../static/img/index-recruit.jpg";
import indexbug from '../../static/img/indexbug.png';
import indexbugphone from '../../static/img/indexbugphone.png';
import Elephant from '../../svg/img-elephant-balloon.svg';
import HomepageFeatures from '../components/HomepageFeatures';
import styles from './index.module.css';
import SliderIndex from './slider';
import SliderBug from './slider-bug';
import SliderBugPhone from './slider-bug-phone';
import SliderPhoneIndex from './slider-phone';
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
     const settings = {
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      };
  return (
     <div id='main'>
        <Slider {...settings}>
          {/* 页面一 */}
          <div id='pageone'>
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
              <div className="container">
                <div className={styles.tree}>
                  {/* <Tree></Tree> */}
                </div>
                <div className={styles.row}>
                  <div className={styles.heroCenterImage}>
                    <h1 className="hero__title"><Translate>IvorySQL</Translate></h1>
                    <p className="hero__subtitle"><Translate>Open Source Oracle Compatible PostgreSQL</Translate></p>
                    <div className={styles.buttons}>
                      <Link
                        className="button button--secondary button--lg"
                        to="https://github.com/IvorySQL/IvorySQL/blob/master/README.md">
                        <Translate>Learn More</Translate>
                      </Link>
                    </div>
                  </div>
                  <div className={styles.heroRightImage}>
                    <Elephant></Elephant>
                    {/* <Christmas></Christmas> */}
                  </div>
                </div>
              </div>
            </header>
          </div>
          {/* 页面二 */}
          <div className={clsx(styles.recruitBanner)}>
            <div class="indexImg">
              <img src={Recruit} className={styles.indexImg}></img>
              <SliderIndex></SliderIndex>
            </div>
            <div class="indexImg-phone">
              <img src={RecruitPhone} className={styles.indexImgPhone}></img>
              <SliderPhoneIndex></SliderPhoneIndex>
            </div>
          </div>
          {/* 页面三 */}
          <div>
            <div class="indexImg">
                <Link
                  to="https://summer-ospp.ac.cn/">
                    <img src={indexbug} className={styles.indexImgbug}></img>
                </Link>
              <SliderBug></SliderBug>
            </div>
            <div class="indexImg-phone">

                <Link
                  to="https://summer-ospp.ac.cn/">
                    <img src={indexbugphone} className={styles.indexImgbugphone}></img>
                </Link>
              <SliderBugPhone></SliderBugPhone>
            </div>
          </div>
        </Slider>
      </div>
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
