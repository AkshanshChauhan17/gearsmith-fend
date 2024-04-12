import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import { MdAccessTime, MdOutlineLocalHospital, MdOutlineSecurity } from "react-icons/md";
import url_main from "../../functions/url";
import { Link } from "react-router-dom";
import { FaGem, FaGlobe, FaLeaf, FaLightbulb, FaUser, FaUsers } from "react-icons/fa";

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

    const aboutData = {
        "About Gearsmith Section": {
          "title": "About Gearsmith",
          "points": [
            {
              "icon": <FaUsers className="icon" />,
              "text": "Community: At Gearsmith, we're more than just a clothing brand – we're a community of outdoor enthusiasts, athletes, and adventurers."
            },
            {
              "icon": <FaGem className="icon" />,
              "text": "Quality: We believe in delivering exceptional quality in every product we offer, ensuring that our gear stands up to the demands of your active lifestyle."
            },
            {
              "icon": <FaLightbulb className="icon" />,
              "text": "Innovation: We're constantly pushing the boundaries of technical apparel, incorporating the latest advancements in materials and design to enhance performance and comfort."
            },
            {
              "icon": <FaLeaf className="icon" />,
              "text": "Sustainability: We're committed to reducing our environmental footprint and promoting sustainable practices throughout our supply chain, from sourcing materials to manufacturing and distribution."
            },
            {
              "icon": <FaUser className="icon" />,
              "text": "Meet the Team: Get to know the passionate individuals behind the Gearsmith brand, from our designers and product developers to our customer support team. We're here to help you find the perfect gear for your adventures."
            },
            {
              "icon": <FaGlobe className="icon" />,
              "text": "Join the Adventure: Become a part of the Gearsmith community and connect with like-minded adventurers from around the world. Share your stories, photos, and experiences with us and fellow gear enthusiasts."
            }
          ]
        }
      }
      
    
    const product_type_links = ["New Arrivals", "Bag & Packs", "Footwear", "Accessories"]
    return (
        <div className="home">
            <div className="ad">
                <div className="text">
                    <div className="title">
                        Conquer the Elements with Gear Smith
                    </div>
                    <div className="subtitle">
                        Stay Dry, Stay Comfortable, Stay Adventurous
                    </div>
                    <button>
                        SHOP NOW
                    </button>
                </div>
            </div>
            <div className="product-types">
                {
                    product_type_links.map((product_name, i)=>{
                        return <div className="product" key={i}>
                            <div className="product-heading">{product_name}</div>
                            <Link to={"/product/" + product_name} className="product-button">Shop Now<AiOutlineRight className="arrow" /></Link>
                        </div>
                    })
                }
            </div>
            <div className="home-about">
                <div className="title">
                    {
                        aboutData["About Gearsmith Section"].title
                    }
                </div>
                <div className="points">
                    {
                        aboutData["About Gearsmith Section"].points.map((points, i)=>{
                            return <div className="point">
                                {points.icon}
                                <div className="text">{points.text}</div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="ad2">
                <div className="text">
                    <div className="title">
                        Discover the Technical Revolution
                    </div>
                    <div className="subtitle">
                        Unleash Your Potential with Innovative Technical Clothing
                    </div>
                    <button>
                        EXPLORE NOW
                    </button>
                </div>
            </div>
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
                <div className="left" onMouseMove={(e)=>handleMovement(e)} style={{filter: `brightness(10) drop-shadow(0px 20px 5px rgba(0, 0, 0, 0.2))`}}></div>
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