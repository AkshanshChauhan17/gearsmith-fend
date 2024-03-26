import { AiOutlineLogout } from "react-icons/ai";

export default function Profile({um, ud, logOut}) {
    return (
        <div className="profile">
            <img src={um.profile_photo.large} alt="" className="profile-image" />
            {ud.email}
            <button className="profile-button-action" onClick={()=>logOut()}>
                <div className="text">Log Out</div> <AiOutlineLogout className="icon" />
            </button>
        </div>
    )
}