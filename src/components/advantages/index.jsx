import { useEffect, useState } from "react";

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
              src="http://localhost:1000/static/images/av-images (5).webp"
              alt=""
              className="image"
            />
          </div>
          <div className="right">
            <div class="main-heading">01 Pervasive Protection</div>
            <ul class="main-list">
              <li class="main-item">Endure extreme climatic conditions</li>
              <li class="main-item">Protection against surveillance</li>
              <li class="main-item">Minimizing combat fatigue</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="way">
          <div className="right">
            <div class="main-heading">02 Enhanced Flexibility</div>
            <ul class="main-list">
              <li class="main-item">
                Increased ability to move arms, legs etc
              </li>
              <li class="main-item">
                Reacting to signs of danger and grappling with someone if
                necessary
              </li>
              <li class="main-item">Maneuverability and comfort</li>
            </ul>
          </div>
          <div className="left">
            <img
              src="http://localhost:1000/static/images/av-images (2).webp"
              alt=""
              className="image"
            />
          </div>
        </div>
        <hr />
        <div className="way">
          <div className="left">
            <img
              src="http://localhost:1000/static/images/av-images (4).webp"
              alt=""
              className="image"
            />
          </div>
          <div className="right">
            <div class="main-heading">03 Vital Visibility</div>
            <ul class="main-list">
              <li class="main-item">Fine line of visibility</li>
              <li class="main-item">
                Operations in varied terrain consisting of different flora and
                fauna
              </li>
              <li class="main-item">
                Blending in for surveillance & own security
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="way">
          <div className="right">
            <div class="main-heading">04 Storage</div>
            <ul class="main-list">
              <li class="main-item">
                Outfitted with ample pockets both inside and outside
              </li>
              <li class="main-item">
                Adequate space to hold and accommodate specific equipments
              </li>
              <li class="main-item">
                Easy user interface by faster access to weapons and equipments
              </li>
              <li class="main-item">
                Secured compartments to prevent loss of equipments
              </li>
            </ul>
          </div>
          <div className="left">
            <img
              src="http://localhost:1000/static/images/av-images (3).webp"
              alt=""
              className="image"
            />
          </div>
        </div>
        <hr />
        <div className="way">
          <div className="left">
            <img
              src="http://localhost:1000/static/images/av-images (1).webp"
              alt=""
              className="image"
            />
          </div>
          <div className="right">
            <div class="main-heading">05 Aesthetics</div>
            <ul class="main-list">
              <li class="main-item">Display of soft power</li>
              <li class="main-item">Upkeep of morale</li>
              <li class="main-item">Competitive edge</li>
              <li class="main-item">Uniformity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
