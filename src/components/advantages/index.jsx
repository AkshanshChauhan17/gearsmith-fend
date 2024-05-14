import { useEffect, useState } from "react";
import url_main from "../../functions/url";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { ad_data, defaultData } from "./advantages.data";
import mii from "../../assets/images/makeinindia.jpg"
import { BiRightArrow, BiRightArrowAlt } from "react-icons/bi";
import { FaAtom, FaCcAmex, FaCcMastercard, FaCcVisa, FaCloudsmith, FaDollarSign, FaDrawPolygon, FaGooglePay, FaHardHat, FaLungs, FaMicroscope, FaMountain, FaRunning, FaShieldAlt, FaSnowflake, FaStarOfLife, FaSun, FaThermometerHalf, FaUserCheck, FaUsers, FaWater, FaWeight, FaWeightHanging } from "react-icons/fa";
import { FaTemperatureQuarter } from "react-icons/fa6";

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
      <div className="make-in-india" style={{padding: 20}}>
      <img className="mii-icon" src={mii} alt="Make in India Logo" />
        {/* <div className="mii-content-ar">
          <div className="mii-content">
            <span>"Make in India"</span> is an initiative launched by the Government of India to encourage companies to manufacture their products in India. It aims to promote India as a global manufacturing hub and attract foreign investment.
          </div>
          <div className="mii-content">
            The initiative focuses on various sectors such as automobiles, aviation, biotechnology, chemicals, construction, defense manufacturing, electrical machinery, and more.
          </div>
          <div className="mii-content">
            By <span>manufacturing products in India</span>, companies can benefit from factors such as a large consumer market, skilled workforce, improving infrastructure, ease of doing business reforms, and government incentives.
          </div>
          <div className="mii-content">
            <span>Gearsmith</span> Technical Clothing is proud to be a part of the <span>Make in India</span> initiative. Our products are manufactured in India, supporting local industries and contributing to the country's economic growth.
          </div>
        </div> */}
      </div>
      <div className="advantages-strip">
      <div className="container">
        <h2>Advantages of Gearsmith Technical Clothing</h2>
        <div className="advantages-list">
          <div className="advantage">
            <FaMicroscope size={32} />
            <h3>Advanced Fabric Technology</h3>
            <p>Showcase how your clothing utilizes cutting-edge fabric technology to enhance performance, durability, and comfort.</p>
          </div>
          <div className="advantage">
            <FaMountain size={32} />
            <h3>Versatility</h3>
            <p>Emphasize the versatility of your clothing, suitable for various outdoor activities such as hiking, climbing, running, and camping.</p>
          </div>
          <div className="advantage">
            <FaThermometerHalf size={32} />
            <h3>Weather Resistance</h3>
            <p>Highlight how your clothing offers protection against different weather conditions, whether it's rain, wind, or extreme temperatures.</p>
          </div>
          {/* Add more advantages as needed */}
        </div>
      </div>
    </div>
      <div className="ways-ar">
        <div className="way">
        <div className="left" style={{backgroundImage: "url('" + url_main + "static/images/av-images (5).webp" + "')"}}>
        <div className="main-heading">Pervasive Protection <AiOutlineRight className="icon" /></div>
        </div>
        <div className="right">
          <div className="container">
            {
              defaultData[0].points.map((e, i)=>{
                return <div className="content-part" key={i}>
                  <h2>{e.title}</h2>
                  <p>{e.description}</p>
                </div>
              })
            }
        </div>
        </div>
        </div>
        <div className="advantages-strip">
      <div className="container">
        <h2>Why Choose Gearsmith Technical Clothing?</h2>
        <div className="advantages-list">
          <div className="advantage">
            <FaRunning className="icon"  size={32} />
            <h3>Enhanced Performance</h3>
            <p>Experience enhanced performance with our technical clothing, designed to optimize your movement and comfort during outdoor activities.</p>
          </div>
          <div className="advantage">
            <FaHardHat className="icon"  size={32} />
            <h3>Durable Construction</h3>
            <p>Our clothing is built to withstand the rigors of outdoor adventures, ensuring durability and longevity even in the toughest conditions.</p>
          </div>
          <div className="advantage">
            <FaUserCheck  className="icon" size={32} />
            <h3>Functional Design</h3>
            <p>With thoughtful features such as reinforced seams, multiple pockets, and adjustable cuffs, our clothing offers practicality and convenience for your outdoor pursuits.</p>
          </div>
          {/* Add more advantages as needed */}
        </div>
      </div>
    </div>
        <div className="way">
          <div className="right">
          <div className="container">
            {
              defaultData[1].points.map((e, i)=>{
                return <div className="content-part" key={i}>
                  <h2>{e.title}</h2>
                  <p>{e.description}</p>
                </div>
              })
            }
          </div>
        </div>
          <div className="left" style={{backgroundImage: "url('" + url_main + "static/images/av-images (2).webp" + "')"}}>
          <div className="main-heading"><AiOutlineLeft className="icon" /> Enhanced</div>
          </div>
        </div>
        <div className="advantages-strip">
        <div className="container">
          <h2>Benefits of Gearsmith Technical Clothing</h2>
          <div className="advantages-list">
            <div className="advantage">
              <FaWater size={32} />
              <h3>Moisture Management</h3>
              <p>Efficiently wick away moisture, keeping you dry and comfortable during intense physical activities.</p>
            </div>
            <div className="advantage">
              <FaLungs size={32} />
              <h3>Breathability</h3>
              <p>Ensure proper airflow to prevent overheating during strenuous activities, maintaining your comfort.</p>
            </div>
            <div className="advantage">
              <FaSun size={32} />
              <h3>UV Protection</h3>
              <p>Shield yourself from harmful sun rays with built-in UV protection features, ensuring safety during outdoor exposure.</p>
            </div>
          </div>
        </div>
      </div>
        <div className="way">
        <div className="left" style={{backgroundImage: "url('" + url_main + "static/images/av-images (4).webp" + "')"}}>
        <div className="main-heading">Vital Visibility <AiOutlineRight className="icon" /></div>
          </div>
            <div className="right">
            <div className="container">
            {
              defaultData[2].points.map((e, i)=>{
                return <div className="content-part" key={i}>
                  <h2>{e.title}</h2>
                  <p>{e.description}</p>
                </div>
              })
            }
        </div>
          </div>
        </div>
        <div className="advantages-strip">
        <div className="container">
          <h2>Performance Features of Gearsmith Clothing</h2>
          <div className="advantages-list">
            <div className="advantage">
              <FaCloudsmith size={32} />
              <h3>Quick-Dry Fabric</h3>
              <p>Stay dry and comfortable with our quick-dry fabric technology, perfect for active pursuits and unpredictable weather.</p>
            </div>
            <div className="advantage">
              <FaWeightHanging size={32} />
              <h3>Lightweight Construction</h3>
              <p>Enjoy freedom of movement with our lightweight clothing, ideal for travel and outdoor adventures.</p>
            </div>
            <div className="advantage">
              <FaTemperatureQuarter size={32} />
              <h3>Temperature Regulation</h3>
              <p>Stay cool in the heat and warm in the cold with our clothing's advanced temperature regulation properties.</p>
            </div>
          </div>
        </div>
      </div>
        <div className="way">
          <div className="right">
          <div className="container">
          {
              defaultData[3].points.map((e, i)=>{
                return <div className="content-part" key={i}>
                  <h2>{e.title}</h2>
                  <p>{e.description}</p>
                </div>
              })
            }
      </div>
          </div>
          <div className="left" style={{backgroundImage: "url('" + url_main + "static/images/av-images (3).webp" + "')"}}>
          <div className="main-heading"><AiOutlineLeft className="icon" /> Storage</div>
          </div>
        </div>
        <div className="advantages-strip">
        <div className="container">
          <h2>Quality Assurance with Gearsmith Clothing</h2>
          <div className="advantages-list">
            <div className="advantage">
              <FaAtom size={32} />
              <h3>Premium Materials</h3>
              <p>Experience the finest quality with our selection of premium materials, ensuring comfort and durability.</p>
            </div>
            <div className="advantage">
              <FaDrawPolygon size={32} />
              <h3>Craftsmanship</h3>
              <p>Our clothing is meticulously crafted to meet the highest standards of quality and performance.</p>
            </div>
            <div className="advantage">
              <FaUsers size={32} />
              <h3>Customer Satisfaction</h3>
              <p>We prioritize customer satisfaction and strive to exceed expectations with every product we offer.</p>
            </div>
          </div>
        </div>
      </div>
        <div className="way">
        <div className="left" style={{backgroundImage: "url('" + url_main + "static/images/av-images (1).webp" + "')"}}>
        <div className="main-heading">Aesthetics <AiOutlineRight className="icon" /></div>
        </div>
          <div className="right">
          <div className="container">
          {
              defaultData[4].points.map((e, i)=>{
                return <div className="content-part" key={i}>
                  <h2>{e.title}</h2>
                  <p>{e.description}</p>
                </div>
              })
            }
      </div>
          </div>
        </div>
      </div>
      <div className="advantages-ar">
        {
          ad_data.map((d, i)=>{
            return <div className="adv">
              <div className="title">{d.title} <BiRightArrowAlt className="icon"/></div>
              <div className="content">{d.description}</div>
            </div>
          })
        }
      </div>
    </div>
  );
}
