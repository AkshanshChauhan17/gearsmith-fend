import { useEffect, useState } from "react";
import url_main from "../../functions/url";

export default function Advantages() {
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
    <div className="advantage">
      <div
        className="scrolling-text"
        style={{ backgroundPositionY: scrollY * 0.5 }}
      >
        <div className="st-head">Advantages of OUR Tactical Apparel</div>
        <div className="st-content">
          Our product selection criteria are based on functionality, reliability
          and quality.
          <br />
          <br />
          MAKE IN INDIA is the core working module, and we are putting in
          valuable experience from various spec ops operators to design and
          produce specific gear as desired by those operating in varied
          spectrums of combat.
          <br />
          <br />
          We have a continuous feedback system to upgrade our products and
          constantly strive to improve & expand to offer our customers the best
          choice.
          <br />
          <br />
          <br />
          <div className="st-content-b">
            Here are 5 ways our gear can help you on the field:
          </div>
        </div>
      </div>
      <div className="ways-ar">
        <div className="way">
          <div className="left">
            <img
              src={url_main + "static/images/av-images (5).webp"}
              alt=""
              className="image"
            />
          </div>
          <div className="right">
            <div className="main-heading">01 Pervasive Protection</div>
            <ul className="main-list">
              <li className="main-item">Endure extreme climatic conditions</li>
              <li className="main-item">Protection against surveillance</li>
              <li className="main-item">Minimizing combat fatigue</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="way">
          <div className="right">
            <div className="main-heading">02 Enhanced Flexibility</div>
            <ul className="main-list">
              <li className="main-item">
                Increased ability to move arms, legs etc
              </li>
              <li className="main-item">
                Reacting to signs of danger and grappling with someone if
                necessary
              </li>
              <li className="main-item">Maneuverability and comfort</li>
            </ul>
          </div>
          <div className="left">
            <img
              src={url_main + "static/images/av-images (2).webp"}
              alt=""
              className="image"
            />
          </div>
        </div>
        <hr />
        <div className="way">
          <div className="left">
            <img
              src={url_main + "static/images/av-images (4).webp"}
              alt=""
              className="image"
            />
          </div>
          <div className="right">
            <div className="main-heading">03 Vital Visibility</div>
            <ul className="main-list">
              <li className="main-item">Fine line of visibility</li>
              <li className="main-item">
                Operations in varied terrain consisting of different flora and
                fauna
              </li>
              <li className="main-item">
                Blending in for surveillance & own security
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="way">
          <div className="right">
            <div className="main-heading">04 Storage</div>
            <ul className="main-list">
              <li className="main-item">
                Outfitted with ample pockets both inside and outside
              </li>
              <li className="main-item">
                Adequate space to hold and accommodate specific equipments
              </li>
              <li className="main-item">
                Easy user interface by faster access to weapons and equipments
              </li>
              <li className="main-item">
                Secured compartments to prevent loss of equipments
              </li>
            </ul>
          </div>
          <div className="left">
            <img
              src= {url_main + "static/images/av-images (3).webp"}
              alt=""
              className="image"
            />
          </div>
        </div>
        <hr />
        <div className="way">
          <div className="left">
            <img
              src={url_main + "static/images/av-images (1).webp"}
              alt=""
              className="image"
            />
          </div>
          <div className="right">
            <div className="main-heading">05 Aesthetics</div>
            <ul className="main-list">
              <li className="main-item">Display of soft power</li>
              <li className="main-item">Upkeep of morale</li>
              <li className="main-item">Competitive edge</li>
              <li className="main-item">Uniformity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
