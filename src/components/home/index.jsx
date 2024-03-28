import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { MdAccessTime, MdOutlineLocalHospital, MdOutlineSecurity } from "react-icons/md";
import url_main from "../../functions/url";

export default function Home() {
    const [sliderIndex, setSliderIndex] = useState(0)
    const slider_images = [url_main + "static/images/home-slider-1.webp", url_main + "static/images/home-slider-2.webp"]
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(Math.round(window.scrollY));
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="home">
            <div className="section">
                <div className="section-left">
                    <div className="section-left-upper">
                        <div className="big-font">
                            TACTICAL APPAREL FOR THE INDIAN masses & armed FORCES.
                        </div>
                    </div>
                    <div className="section-left-bottom">
                        <div className="small-font">
                            Reliable and functional gear can optimise and increase the efficiency of an operator. We'll get you the best. 
                        </div>
                    </div>
                </div>
                <div className="section-right">
                    <AiOutlineArrowLeft className="arrow" onClick={()=>setSliderIndex(sliderIndex===0 ? 1 : 0)}/>
                    <div className="slider-ar">
                        <img src={slider_images[sliderIndex]} className="slider-image" />
                    </div>
                    <AiOutlineArrowRight className="arrow" onClick={()=>setSliderIndex(sliderIndex===1 ? 0 : 1)}/>
                </div>
            </div>
            <div className="middle" style={{backgroundPositionY: scrollY*0.5}}>
                <div className="big-font">Tactical  apparel elevates the operator's</div>
                <div className="middle-flex">
                    <div className="middle-flex-box">
                        <MdOutlineSecurity className="icon" />
                        <div className="text">SECURITY</div>
                    </div>
                    <div className="middle-flex-box">
                        <MdAccessTime className="icon" />
                        <div className="text">SECURITY</div>
                    </div>
                    <div className="middle-flex-box">
                        <MdOutlineLocalHospital className="icon" />
                        <div className="text">SECURITY</div>
                    </div>
                </div>
                <button className="middle-button">
                    <div className="text">Shop Now</div>
                    <AiOutlineArrowRight className="icon" />
                </button>
            </div>
            <form action="" className="bottom">
                <div className="left"></div>
                <div className="right">
                    <div className="right-title">Get Updates</div>
                    <div className="right-subtitle">
                    Get info about our latest products & updates. Subscribe to our newsletter.
                    </div>
                    <div className="inputs">
                        <input type="text" name="" id=""  placeholder="Email" required/>
                        <input type="submit" value="Subscribe" />
                    </div>
                </div>
            </form>
        </div>
    )
}