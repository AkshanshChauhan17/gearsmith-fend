import { AiOutlineLogout } from "react-icons/ai";

export default function Profile({um, ud, logOut}) {
    return (
        <div className="profile">
            <img src={um.profile_photo.large} alt="" className="profile-image" />
            <div className="info-text"><b>Email.</b> {ud.email}</div>
            <div className="info-text"><b>Name. </b>{um.first_name} {um.last_name}</div>
            <div className="info-text"><b>Mob.</b> {um.mobile_no}</div>
            <button className="profile-button-action" onClick={()=>logOut()}>
                <div className="text">Log Out</div> <AiOutlineLogout className="icon" />
            </button>
        </div>
    )
}