import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';
import Elephant from '../../svg/img-elephant-balloon.svg';
import Slider from "react-slick";
import Recruit from "../../static/img/index-recruit.jpg"
import SliderIndex from './slider'
import RecruitPhone from "../../static/img/index-recruit-phone.jpg"
import SliderPhoneIndex from './slider-phone'
import SliderBug from './slider-bug'
import SliderBugPhone from './slider-bug-phone'
import indexbug from '../../static/img/indexbug.png'
import indexbugphone from '../../static/img/indexbugphone.png'
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
          <div>
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
              <div className="container">
                <div class="row">
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
              <img src={indexbug} className={styles.indexImgbug}></img>
              <SliderBug></SliderBug>
            </div>
            <div class="indexImg-phone">
              <img src={indexbugphone} className={styles.indexImgbugphone}></img>
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
