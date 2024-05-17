import React from "react"
import "./slider-bug.css"
import Translate, {translate} from '@docusaurus/Translate';
import Woodpecker from '../../svg/woodpecker.svg'
import ArrowLeft from '../../svg/arrow-left.svg'
import ArrowRight from '../../svg/arrow-right.svg'
import Link from '@docusaurus/Link';
export default function SliderBug(){
    return(
        <div className="index-bug">
            <div className="index-bug-content">
                {/* <div className="bug-title"><Translate>Woodpecker Plan</Translate></div> */}
                <div className="bug-content">
                    {/* <div className="bug-svg"><ArrowRight></ArrowRight></div> */}
                    {/* <div>"IvorySQL3.0版本发布之际，欢迎社区朋友参与新功能测试活动，寻找产品bug!"</div> */}
                    {/* <div className="span"><Translate>IvorySQL version 3.0 has been released. We invite community members to join our testing activities and assist in identifying any product issues！</Translate></div> */}
                </div>
                <div className="bug-content-bottom">
                    {/* <div className="bug-svg-bottom"><ArrowRight></ArrowRight></div> */}
                    {/* <div>“参与即可获得精美周边"</div> */}
                    {/* <div className="span"><Translate>Participants will receive exclusive IvorySQL-branded peripherals as a token of appreciation.</Translate></div> */}
                </div>
                <div className="bug-button">
                    <div className="buttons">
                      {/* <Link
                        className="button button--secondary button--lg"
                        to="https://kdocs.cn/l/chdVh5CuGxxr">
                        <Translate>Learn More</Translate>
                      </Link> */}
                    </div>
                    {/* <div className="bug-svg"><ArrowLeft></ArrowLeft></div> */}
                    {/* <span className="buttom-span"><Translate>Click "Learn More" to access detailed operational instructions.</Translate></span> */}
                </div>
            </div>
            {/* <div className="index-bug-svg" id="bug">
                <Woodpecker></Woodpecker>
            </div> */}
        </div>
    )
}