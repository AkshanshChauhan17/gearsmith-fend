import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { Link } from "react-router-dom"
import icon_g_pay from '../../assets/images/google-pay.png'
import icon_master_card from '../../assets/images/master-card.webp'
import icon_visa from '../../assets/images/visa.png'
import icon_american_express from '../../assets/images/american-express.png'

export default function Footer() {
    return (
        <div className="footer-ar">
            <div className="footer-upper">
                <div className="section">
                    <div className="section-heading">Socials</div>
                    <div className="section-content">
                    Check out our social media pages for awesome content and updates about us!
                    </div>
                    <div className="link-white-ar">
                        <a href="https://www.instagram.com/gearsmith_/?hl=en" className="flex center d-none link-white" target="_blank"><AiOutlineInstagram /></a>
                        <a href="https://www.facebook.com/specialforceofindia/" className="flex center d-none link-white" target="_blank"><AiOutlineFacebook /></a>
                        <a href="https://www.youtube.com/channel/UCOgCqMgoKNo-g2fYiI-bptA" className="flex center d-none link-white" target="_blank"><AiOutlineYoutube /></a>
                    </div>
                </div>
                <div className="section">
                    <div className="section-heading">Quick Links</div>
                    <Link className="section-link" to="/">Home</Link>
                    <Link className="section-link" to="/shop">Store</Link>
                    <Link className="section-link" to="/about">About Us</Link>
                    <Link className="section-link" to="/advantages">Advantages</Link>
                    <Link className="section-link" to="/account">Account</Link>
                    <Link className="section-link" to="/forum">Forum</Link>
                    <Link className="section-link" to="/policy">Private Policy</Link>
                </div>
                <div className="section">
                    <div className="section-heading">Contact Us</div>
                    <div>
                        <div className="section-content">
                        <b>Mail us at:</b> gmithpvtltd@gmail.com
                        </div>
                        <br />
                        <div className="section-content">
                        <b>Send us a note at:</b> Gearsmith Pvt Ltd RZ-72A, Street N0-07, Block Y Near Roshan Pura Ext, Najafgarh, New Delhi-110043
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footer-bottom">
                <div className="bottom-section-inner">
                    <img src={icon_g_pay} alt="" height={50} />
                    <img src={icon_visa} alt="" height={50} />
                    <img src={icon_master_card} alt="" height={50} />
                    <img src={icon_american_express} alt="" height={50} />
                </div>
                <div className="bottom-section-inner">
                    <div className="copy">
                    Copyright ©2022 by Gearsmith
                    </div>
                </div>
            </div>
        </div>
    )
}