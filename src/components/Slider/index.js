import React from 'react'
import Translate, {translate} from '@docusaurus/Translate';

import './silder.css'

export default function SliderIndex(){
    return(
        // <d class="silder-main"> 
            <div class="recruit-content">
                <div class="content-left">
                  <div class="content-left-top">
                    <div class="left-top-title"><Translate>IvorySQL China User Group is Recruiting!</Translate></div>
                    <div class="left-top-font"><Translate>We want you!</Translate></div>
                  </div>
                  <div class="content-left-buttom">
                    <div class="left-air"></div>
                    <div class="left-buttom-font">
                        <div class="buttom-title"><Translate>First batch community members will receive</Translate></div>
                        <div class="buttom-font"><Translate>a surprise mystery gift pack!</Translate></div>
                    </div>
                  </div>
                </div>
                <div class="content-right">
                    <div class="content-right-top">
                        <div class="right-want">
                            <span class="right-top-title"><Translate>Recruiting Cities:</Translate></span><span class="right-top-city"><Translate>Nanjing、Guangzhou、Qingdao</Translate></span>
                        </div>
                        <div class="right-top-font">
                            <div class="right-top-title"><Translate>Recruiting Roles:</Translate></div>
                            <div><div class="point"></div><span class="work"><Translate>ICC (lvorySQL City Chief)</Translate></span><span class="work-english">(IvorysqL City Chief)</span></div>
                            <div><div class="point"></div><span class="work"><Translate>ICA (IvorySQL City Ambassador)</Translate></span><span class="work-english">(IvorysqL City Ambassador)</span></div>
                            <div><div class="point"></div><span class="work"><Translate>ICM (IvorySQL City Member)</Translate></span><span class="work-english">(IvorysqL City Member)</span></div>
                            <div><div class="point"></div><span class="work"><Translate>ICT (IvorySQL City Core Tester)</Translate></span><span class="work-english">(IvorysqL City Core Testers)</span></div>
                            <div><div class="point"></div><span class="work"><Translate>ICD (IvorySQL City Core Developers)</Translate></span><span class="work-english">(IvorySQL City Core Developers)</span></div>
                        </div>
                    </div>
                    <div class="content-right-buttom">
                        <div class="right-air"></div>
                        <div class="right-buttom-content">
                            <div class="right-buttom-title"></div>
                            <div class="right-buttom-font"><Translate>Please scan the codeto join IvorySQL China User Group</Translate></div>
                        </div>
                    </div>
                </div>
            </div>
    );
}