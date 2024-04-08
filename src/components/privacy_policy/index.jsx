import { RiArrowRightSFill, RiGhostFill, RiOctagonFill, RiVerifiedBadgeFill } from "react-icons/ri";
import { pp_data } from "./pp.data";

export function PrivacyPolicy() {
    return(
        <div className="privacy-policy">
            {pp_data.map((data, i)=>{
                return <div className="pp" key={i}>
                    <div className="title">{data.title} <RiArrowRightSFill className="icon" /></div>
                    <div className="content">{data.content}</div>
                </div>
            })}
        </div>
    )
};