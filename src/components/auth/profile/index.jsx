import { AiFillPlusCircle, AiOutlineLogout, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Profile({um, ud, logOut}) {
    return (
        <div className="profile">
            <img src={um.profile_photo.large} alt="" className="profile-image" />
            <div className="info-text"><b>Email.</b> {ud.email}</div>
            <div className="info-text"><b>Name. </b>{um.first_name} {um.last_name}</div>
            <div className="info-text"><b>Mob.</b> {um.mobile_no}</div>
            {
                ud.is_admin===1 &&
                <Link to="/admin">
                    <button to="/admin" className="profile-button-action">
                        <div className="text">Add Product</div> <AiOutlinePlusCircle className="icon" />
                    </button> 
                </Link>
            }
            <button className="profile-button-action" onClick={()=>logOut()}>
                <div className="text">Log Out</div> <AiOutlineLogout className="icon" />
            </button>
        </div>
    )
}