import { PiArrowArcRightFill, PiCaretRight } from "react-icons/pi";
import { ts_data } from "./tc.data";

export default function TermAndCondition() {
    return (
        <div className="tc-ar">
            <div className="tc-main-heading">
                Teams & Conditions
            </div>
            <div className="small-text">Effective Date: December 15, 2022</div>
            <div className="small-text">Website Covered: www.gearsmith.in</div>
            <div className="small-text">THE AGREEMENT: The use of this website and services on this website provided by Gearsmith Private Limited (hereinafter referred to as "Owner") are subject to the following Terms & Conditions (hereinafter the "Terms of Service"), all parts and sub-parts of which are specifically incorporated by reference here together with the Privacy Policy. Following are the Terms of Service governing your use of www.gearsmith.in (the "Website"), all pages on the Website and any services provided by or on this Website ("Services"). By accessing either directly or through a hyperlink, the Website, and/ or purchasing something from us, you engage in our "Service" and agree to be bound by the Terms of Service including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation vendors, buyers, customers, merchants, browsers and/ or contributors of content. You acknowledge and agree that the Website may use your personal information in the manner described in our Privacy Policy which sets forth how information collected about you is collected, used and stored.</div>
            <div className="content-ar">
                {
                    ts_data.map((data, i)=>{
                        return(
                            <div className="tc-content">
                                <div className="tc-content-title">{data.title} <PiCaretRight className="icon"/></div>
                                <pre className="tc-content-text">{data.content}</pre>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}