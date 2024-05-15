import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import Slider from "react-slick";

import Elephant from '../../../svg/img-elephant-balloon.svg';
import Recruit from "../../../static/img/index-recruit.jpg"
import RecruitPhone from "../../../static/img/index-recruit-phone.jpg"
import indexbug from '../../../static/img/indexbug.png'
import indexbugphone from '../../../static/img/indexbugphone.png'
import SliderIndex from '../Slider'
import SliderPhoneIndex from '../SliderPhone'
import SliderBug from '../SliderBug'
import SliderBugPhone from '../SliderBugPhone'

import styles from './index.module.css';

// Slider in homepage
export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
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
