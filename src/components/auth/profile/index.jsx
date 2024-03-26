export default function Profile({um, ud}) {
    return (
        <div className="profile">
            <img src={um.profile_photo.large} alt="" />
            {ud.email}
        </div>
    )
}