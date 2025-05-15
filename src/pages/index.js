import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React, { useEffect }  from 'react';
import Slider from "react-slick";
import RecruitPhone from "../../static/img/index-recruit-phone.jpg";
import Recruit from "../../static/img/index-recruit.jpg";
import indexbug from '../../static/img/indexbug.png';
import indexbugphone from '../../static/img/indexbugphone.png';
import Elephant from '../../svg/img-elephant-balloon.svg';
import HOW from '../../static/img/ivorysql-how.jpg';
import HomepageFeatures from '../components/HomepageFeatures';
import styles from './index.module.css';
import SliderIndex from './slider';
import SliderBug from './slider-bug';
import SliderBugPhone from './slider-bug-phone';
import SliderPhoneIndex from './slider-phone';
import { customFields } from '../../docusaurus.config';
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
          {/* HOW */}
          <div>
            <a href="https://ivorysql.io/" target="_blank" rel="noopener noreferrer">
              <img 
                src={require('../../static/img/ivorysql-how.jpg').default} 
                alt="IvorySQL Banner" 
                style={{width: '100%', cursor: 'pointer'}}
              />
            </a>
          </div>
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
        </Slider>
      </div>
  );
}

function ChatWidget() {
  const {siteConfig:{customFields}} = useDocusaurusContext();
  
  useEffect(() => {
    // 创建外部 script 标签加载 SDK
    const script = document.createElement('script');
    script.src = "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.1.0-beta.3/libs/cn/index.js";
    script.async = true;

    // 当脚本加载完成后调用初始化代码
    script.onload = () => {
      if (window.CozeWebSDK && window.CozeWebSDK.WebChatClient) {
        new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: customFields.botId,
          },
          componentProps: {
            title: 'IvorySQL Chatroom',
            icon: 'https://raw.githubusercontent.com/IvorySQL/Ivory-www/main/static/img/ivory-black.png',

          },
          auth: {
            type: "token",
            token: customFields.patToken,
            onRefreshToken: function () {
              return customFields.patToken;
            }
          }
        });
      } else {
        console.error('CozeWebSDK 未加载成功！');
      }
    };

    // 将 script 标签添加到 body 中
    document.body.appendChild(script);

    // 可选：组件卸载时清除 script 标签
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // 该组件不需要渲染任何内容
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Open Source Oracle compatible PostgreSQL">
      <ChatWidget />
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
