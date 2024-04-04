import { useEffect, useState } from "react";
import url_main from "../../functions/url";

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
      <h1 className="main-heading">About Us</h1>
      <hr />
      <br />
      <section>
        <div style={{backgroundImage: "url('"+ url_main +"static/images/about-i.webp')", backgroundPositionY: scrollY*0.2 - 300}} className="image"></div>
        <div className="text" style={{backgroundImage: "url('"+ url_main +"static/images/about-i.webp')", backgroundPositionY: scrollY*0.2 - 300}}>
            <h2 className="inner-heading">Aim</h2>
            <p className="content">To meet the demand of men in uniform seeking the most up to date tactical equipments</p>
        </div>
        <div className="hidden-layer"></div>
      </section>
      <br />
      <hr />
      <br />
      <section>
        <div className="text" style={{backgroundImage: "url('" + url_main + "static/images/about-ii.webp')", backgroundPositionY: scrollY*0.2 - 300}}>
            <h2 className="inner-heading">Vision</h2>
            <p className="content">To design and manufacture Military grade tactical equipments suited for Indian climatic conditions and to prove their worthiness for mission-oriented operations.</p>
        </div>
        <div style={{backgroundImage: "url('" + url_main + "static/images/about-ii.webp')", backgroundPositionY: scrollY*0.2 - 300}} alt="" className="image" />
        <div className="hidden-layer"></div>
      </section>
      <br />
      <hr />
      <br />
      <section>
        <div style={{backgroundImage: "url('" + url_main + "static/images/about-iii.webp')", backgroundPositionY: scrollY*0.2 - 300}} alt="" className="image" />
        <div className="text" style={{backgroundImage: "url('" + url_main + "static/images/about-iii.webp')", backgroundPositionY: scrollY*0.2 - 300}}>
            <h2 className="inner-heading">Conceptualization</h2>
            <p className="content">Designed by Ex Indian Army Special Forces who has the rich experience of having served in the icy Himalayas to the lush subtropical jungles of the northeast, from urban built-up areas in Delhi to the saline waters of the Indian ocean. We would like to provide the products to get the job done when it counts the most.</p>
        </div>
        <div className="hidden-layer"></div>
      </section>
    </div>
  )
}
