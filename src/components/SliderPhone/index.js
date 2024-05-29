import React from 'react'
import Translate from '@docusaurus/Translate';

import './slider-phone.css'

export default function SliderPhoneIndex(){
    return(
        <div class="phone-main">
                <div class="phone-main-top">
                    <p class="top-toptitle"><Translate>IvorySQL China User Group is Recruiting!</Translate></p>
                    <p class="top-nexttitle"><Translate>We want you!</Translate></p>
                    <p class="top-thirdtitle"><Translate>First batch community members will receive</Translate></p>
                    <p class="top-lasttitle"><Translate>a surprise mystery gift pack!</Translate></p>
                </div>
                <div class="phone-main-buttom">
                    <div class="phone-buttom-main">
                        <span class="phone-buttom-title"><Translate>Recruiting Cities:</Translate></span><span class="phone-buttom-city"><Translate>Nanjing、Guangzhou、Qingdao</Translate></span>
                    </div>
                    <div>
                        <div class="phone-buttom-font">
                            <div class="phone-buttom-title"><Translate>Recruiting Roles:</Translate></div>
                            <div><div class="phone-point"></div><span class="phone-work"><Translate>ICC</Translate></span></div>
                            <div><div class="phone-point"></div><span class="phone-work"><Translate>ICA</Translate></span></div>
                            <div><div class="phone-point"></div><span class="phone-work"><Translate>ICM</Translate></span></div>
                            <div><div class="phone-point"></div><span class="phone-work"><Translate>ICT</Translate></span></div>
                            <div><div class="phone-point"></div><span class="phone-work"><Translate>ICD</Translate></span></div>
                        </div>
                        <div class="phone-QRcode"></div>
                        <div class="phone-lasttext"><Translate>Please scan the codeto join IvorySQL China User Group</Translate></div>
                    </div>
                </div>
        </div>
    )
}