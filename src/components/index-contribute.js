import React, { Component } from "react";
import Link from '@docusaurus/Link';
import '../css/index-contribute.css';
// import Svgleft from '../../svg/img-girl.svg';
// import Svgright from '../../svg/img-leaf.svg';
export default class IndexContribute extends Component {
    render () {
        return (
                <div class="contribute">
                    {/* <div class="contribute-girl">
                       <img src={require('../../svg/img-started-left.jpg').default} alt="" />
                    </div> */}
                    <div class="contribute-middle-content" id="contribute-middle-content">
                        <div class="contribute-title">How to Contribute?</div>
                        <div class="contribute-font">IvorySQL社区包括来自世界各地的开发和使用开源数据库的人员。 我们欢迎并鼓励大家参与。</div>
                        <Link 
                            className="button" 
                            id="contribute-link"
                            to="https://github.com/IvorySQL/IvorySQL">
                              <span id="contribute-span">Get Started</span>
                        </Link>
                    </div>
                    {/* <div class="contribute-leaf">
                       <img src={require('../../svg/img-started-right.jpg').default} alt="" />
                    </div> */}
                </div>
        );
    };
}