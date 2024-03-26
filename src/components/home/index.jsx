import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Home() {
    const [sliderIndex, setSliderIndex] = useState(0)
    const slider_images = ["http://localhost:1000/static/images/home-slider-1.webp", "http://localhost:1000/static/images/home-slider-2.webp"]
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
        </div>
    )
}