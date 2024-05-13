import { AiFillBell, AiFillMail, AiFillMessage, AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { FaAngleRight, FaArrowRight, FaCartArrowDown, FaMailBulk, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom";
import url_main from "../../../functions/url";
import ProgressiveImage from "../../image";

export default function Profile({um, ud, logOut}) {
    return (
        <div className="profile">
            <div className="profile-left">
                <div className="top-details">
                    <div className="details">
                        <ProgressiveImage lowResolutionSrc={url_main + "media/image/user/" + ud.email + "?r=50"} highResolutionSrc={url_main + "media/image/user/" + ud.email + "?r=500"} className={"profile-image"}/>
                        <div className="info-text"><b>{um.first_name} {um.last_name}</b></div>
                        <div className="info-text">{ud.email}</div>
                    </div>
                    <div className="inner-controls">
                        <button>
                            <AiFillMessage />
                        </button>
                        <button>
                            <FaUser/>
                        </button>
                        <button>
                            <AiFillBell />
                        </button>
                    </div>
                </div>
                <div className="controls">
                    {
                        ud.is_admin===1 &&
                        <Link to="/admin" className="control">
                            <FaUser className="left-icon" />
                            <div className="middle-text">Admin</div>
                            <FaArrowRight className="right-icon"/>
                        </Link>
                    }
                    <div className="control">
                        <AiFillSetting className="left-icon" />
                        <div className="middle-text">Setting</div> 
                        <FaArrowRight className="right-icon" />
                    </div>
                    <div className="control">
                        <FaCartArrowDown className="left-icon" />
                        <Link to="/myorder" className="middle-text">My Order</Link> 
                        <FaArrowRight className="right-icon" />
                    </div>
                    <div className="control" onClick={()=>logOut()}>
                        <FaSignOutAlt className="left-icon" />
                        <div className="middle-text">Logout</div> 
                        <FaArrowRight className="right-icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}