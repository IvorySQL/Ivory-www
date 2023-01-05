import React, { Component } from "react";
import Link from '@docusaurus/Link';
import  '../css/index-introduce.css';
import OpenSource from '../../svg/icon-opensource.svg';
import Pgsql from '../../svg/icon-pg.svg';
import Oracle from '../../svg/icon-oracle.svg';
import Customize from '../../svg/icon-customize.svg';
import Highgo from '../../svg/icon-hg.svg';
import Translate, {translate} from '@docusaurus/Translate';
export default class IndexIntroduce extends Component {
    render () {
    return (
        <div class="index-introduce">
            <div class="top">
                <div class="top-opensource">
                    <OpenSource class="svg"></OpenSource>
                    <span class="introduce-title"><Translate>开源软件</Translate></span>
                    <span class="introduce-content" id="introduce-content-open"><Translate>没有厂商的限制</Translate>。</span>
                </div>
                <div class="top-pgsql">
                    <Pgsql class="svg"></Pgsql>
                    <span class="introduce-title"><Translate>基于PostgreSQL</Translate></span>
                    <span class="introduce-content" id="introduce-content-pg"><Translate>基于PostgreSQL,具有完整的SQL、坚如磐石的可靠性和庞大的生态系统。</Translate></span>
                </div>
                <div class="top-oracle">
                    <Oracle class="svg"></Oracle>
                    <span class="introduce-title"><Translate>兼容Oracle</Translate></span>
                    <span class="introduce-content" id="introduce-content-io"><Translate>将Oracle数据库迁移到IvorySQL。</Translate></span>
                </div>
            </div>
            <div class="buttom">
                <div class="buttom-customize">
                    <Customize class="svg-cust"></Customize>
                    <span class="introduce-title" id="introduce-title-cust"><Translate>可定制化</Translate></span>
                    <span class="introduce-content" id="introduce-content-cust"><Translate>只需下载代码，并按照你的想法自定义。</Translate></span>
                </div>
                <div class="buttom-Highgo">
                    <Highgo class="svg-hg"></Highgo>
                    <span class="introduce-title" id="introduce-title-hg"><Translate>瀚高支持</Translate></span>
                    <span class="introduce-content" id="introduce-content-hg"><Translate>由领先的PostgreSQL数据库提供商瀚高软件提供支持。</Translate></span>
                    <Link 
                      className="button" 
                      id="link-hgcom"
                      to="https://www.highgo.com/">
                        <span>+</span>
                        <div>More</div>
                    </Link>
                </div>
            </div>
        </div>
    ); 
  };   
}    