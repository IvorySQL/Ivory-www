import React, { Component } from "react";
import Link from '@docusaurus/Link';
import Balloon from '../../svg/icon-balloon.svg';
import  '../css/index-activity.css';
export default class IndexActivity extends Component {
    render () {
        return (
                <div class="index-activity">
                    <div class="activity-title" id="activity-title">
                        <div class="svg-Balloon">
                            <Balloon></Balloon>
                        </div>
                        <div class="Recent-Activities">Recent Activities</div>
                        <div class="hr-action">— 近期活动 —</div>
                    </div>
                    <div class="activity-content">
                        <div class="content-pgconf">
                            <img src={require('../../svg/banner-pgconf2022.png').default} class="actionimg-pgconf" alt="" />
                            <div class="activity-content-title">PostgresConf.CN 2022 中国PostgreSQL数据库生态大会</div>
                            <div class="activity-content-title-small">12.09-11 / 北京中科院软件所</div>
                            <p>由中国PG分会主办的“2022中国PG生态大会”,将以“协同共进”为主题,邀请专家学者、厂商和用户代表,就PG在行业和区域的推广与应用进行深入探讨</p>
                            <Link 
                                className="button" 
                                id="link-pgconf"
                                to="https://2022.postgresconf.cn/speech/180">
                                  <span>+</span>
                                  <div>More</div>
                            </Link>
                        </div>
                        <div class="content-oneday">
                            <img src={require('../../svg/banner-activity-opensource.png').default} class="actionimg-oneday" alt="" />
                            <div class="activity-content-title">IvorySQL 2022 一日开源活动</div>
                            <div class="activity-content-title-small">12.09-11 / 济南喜来登酒店</div>
                            <p>由中国PG分会主办的“2022中国PG生态大会”,将以“协同共进”为主题,邀请专家学者、厂商和用户代表,就PG在行业和区域的推广与应用进行深入探讨</p>
                            <Link 
                                className="button"
                                id="link-oneday"
                                to="/docs/Compatibillity_Features/oneday-page">
                                  <span>+</span>
                                  <div>More</div>
                            </Link>
                        </div>
                    </div>
                </div>
        );
    };
}