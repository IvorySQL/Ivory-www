
import React, { Component } from "react";
import Link from '@docusaurus/Link';
import '../css/oneday.css';
export default class OneDay extends Component {
    render () {
        return (
            <div id="oneday">
                <div class="oneday-title">IvorySQL 2022 一日开源活动</div>
                <div class="oneday-data" id="oneday-data">12.09-11 / 济南喜来登酒店</div>
                <div class="onedayimg">
                    <img src={require('../../svg/banner-activity-opensource.png').default} class="od-img" alt="" />
                </div>
                <Link 
                    className="button" 
                    id="oneday-link"
                    to="/building">
                      <span>→</span>
                      <div>立即报名</div>
                </Link>
            </div>
        );
    };
}