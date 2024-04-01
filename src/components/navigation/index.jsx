import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import { Link } from "react-router-dom"
import { imageList } from "../../functions/images"
import { AiOutlineShop, AiOutlineUser, AiTwotoneShop } from 'react-icons/ai'

export default function Navigation({ls, ud, um}) {

    const [navigation, setNavigation] = useState([])
    const [clicked, setClicked] = useState(0)

    useEffect(()=>{
        getRequest("navigation")
            .then((e)=>setNavigation(e))
            .catch((err)=>console.error(err))
            .finally(()=>{
                setClicked("/" + window.location.href.split("/").splice(-1)[0])
            })
    }, [])

    return (
        <div className="nav" style={{backgroundImage: "url(" + imageList[2] + ")"}}>
            <div className="nav-left">
                <img src={imageList[0]} alt="" style={{filter: "invert(1)"}} />
            </div>
            <div className="nav-links-ar">
                <div className="nav-link">
                    {
                        navigation.map((link, i)=>{
                            return <Link className={clicked===link.path ? "link button-in color-white hover active" : "link button-in color-white hover inactive"} to={link.path} key={i} onClick={()=>setClicked(link.path)}>{link.name}</Link>
                        })
                    }
                </div>
                <div className="nav-controls">
                    <Link to="/user/cart" className="nav-icon">
                        <AiOutlineShop />
                    </Link>
                    <div className="profile-ar">
                        <Link to="/user/profile" className="profile-icon" >
                            <img src={um.profile_photo && um.profile_photo.small} className="profile-image" />
                            <AiOutlineUser className="profile-info" onClick={()=>setClicked("null")}/>
                        </Link>
                        <div className="dropdown">
                            {
                                ud.email
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}