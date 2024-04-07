import { useEffect, useState } from "react";
import url_main from "../../functions/url";
import { AiFillQuestionCircle, AiFillRightSquare, AiOutlineFacebook, AiOutlineInstagram, AiOutlineRight, AiOutlineYoutube } from "react-icons/ai";
import { mission_statement, our_value } from "./about.data";

export default function AboutUs() {
    const [scrollY, setScrollY] = useState(0);


    useEffect(() => {
        const handleScroll = () => {
            setScrollY(Math.round(window.scrollY));
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
  return (
    <div className="about">
      <div className="main-heading">
        <div className="left">
          <div className="heading">ABOUT US <AiFillQuestionCircle className="icon" /></div>
          <div className="subheading">Welcome to GearSmith, where innovation meets style in the world of technical clothing. At GearSmith, we're passionate about providing high-performance apparel that empowers adventurers, athletes, and outdoor enthusiasts to push their limits and explore with confidence.</div>
        </div>
        <div className="right">
          <div className="bg"></div>
          <div className="logo"></div>
        </div>
      </div>
      <div className="story">
        <div className="left">
        <div className="story-heading">OUR STORY</div>
        <div className="story-subheading">GearSmith was born out of a shared love for outdoor adventures and a frustration with the lack of technical clothing options that truly met the needs of modern explorers. Fueled by our passion for innovation and commitment to quality, we set out on a journey to redefine what technical clothing means. Since our inception, we've been dedicated to designing and curating a collection of cutting-edge apparel that seamlessly blends performance, durability, and style.</div>
        </div>
        <div className="right"></div>
      </div>
      <section>
        <div style={{backgroundImage: "url('"+ url_main +"static/images/about-i.webp')", backgroundPositionY: scrollY*0.2 - 300}} className="image"></div>
        <div className="text">
            <h2 className="inner-heading">AIM <AiFillRightSquare /></h2>
            <p className="content">GearSmith specializes in cutting-edge tactical gear, catering to the diverse requirements of uniformed professionals. Our range seamlessly integrates advanced technology and practicality, guaranteeing peak performance and safety in every scenario. Join our community and gear up with confidence, supported by GearSmith's unwavering dedication to perfection.</p>
        </div>
      </section>
      <div className="values-ar">
      <div className="values-heading">Our Values <AiOutlineRight className="icon" /></div>
      <hr />
        <div className="values">
          {
            our_value.sections.map((vc, i)=>{
              return <div className="values-columns" key={i}>
              <div className="h">{vc.content.icon} {vc.title}</div>
              <div className="sh">{vc.content.text}</div>
            </div>
            })
          }
        </div>
      </div>
      <section>
        <div className="text">
            <h2 className="inner-heading">VISION <AiFillRightSquare /></h2>
            <p className="content">We specialize in crafting military-grade tactical equipment tailored for Indian climates, ensuring their suitability for mission-oriented operations. Our dedication to excellence guarantees gear that performs reliably in any situation, empowering personnel with confidence in their equipment.</p>
        </div>
        <div style={{backgroundImage: "url('" + url_main + "static/images/about-ii.webp')", backgroundPositionY: scrollY*0.2 - 300}} alt="" className="image" />
      </section>
      <div className="values-ar">
      <div className="values-heading">Our Mission <AiOutlineRight className="icon" /></div>
      <hr />
        <div className="values">
          {
            mission_statement.subheadings.map((ms, i)=>{
              return <div className="values-columns" key={i}>
              <div className="h">{ms.icon} {ms.title}</div>
              <div className="sh">{ms.content}</div>
            </div>
            })
          }
        </div>
      </div>
      <section>
        <div style={{backgroundImage: "url('" + url_main + "static/images/about-iii.webp')", backgroundPositionY: scrollY*0.2 - 300}} alt="" className="image" />
        <div className="text">
            <h2 className="inner-heading">CONCEPTUALIZATION <AiFillRightSquare /></h2>
            <p className="content">Designed by Ex Indian Army Special Forces who has the rich experience of having served in the icy Himalayas to the lush subtropical jungles of the northeast, from urban built-up areas in Delhi to the saline waters of the Indian ocean. We would like to provide the products to get the job done when it counts the most.</p>
        </div>
      </section>
      <div className="promises">
        <div className="promises-heading">Our Promise <AiOutlineRight className="icon" /></div>
        <div className="promises-subheading">When you shop with GearSmith, you can trust that you're getting more than just a piece of clothing – you're investing in quality, performance, and adventure. Whether you're tackling the great outdoors or navigating the urban jungle, we've got you covered every step of the way.</div>
        <br />
        <hr />
        <br />
        <div className="promises-social-ar">
          <div className="promises-social-head">Join the GearSmith family today and gear up for your next adventure!</div>
          <div className="promises-social-links">
              <a href="https://www.instagram.com/gearsmith_/?hl=en" className="icon flex center d-none link-white" target="_blank"><AiOutlineInstagram/>/gearsmith</a>
              <a href="https://www.facebook.com/specialforceofindia/" className="icon flex center d-none link-white" target="_blank"><AiOutlineFacebook />/specialforceofindia/</a>
              <a href="https://www.youtube.com/channel/UCOgCqMgoKNo-g2fYiI-bptA" className="icon flex center d-none link-white" target="_blank"><AiOutlineYoutube />/channel/UCOgCqMgoKNo-g2fYiI-bptA</a>
            </div>
        </div>
      </div>
    </div>
  )
}
