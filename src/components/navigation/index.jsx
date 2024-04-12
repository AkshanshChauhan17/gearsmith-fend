import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import { Link } from "react-router-dom"
import { imageList } from "../../functions/images"
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { GrClose } from "react-icons/gr"
import { BiMenu } from "react-icons/bi"

export default function Navigation({ls, ud, um}) {

    const [navigation, setNavigation] = useState([])
    const [clicked, setClicked] = useState(0)
    const [isOpenNav, setIsOpenNav] = useState(false)
    const [winSize, setWinSize] = useState(0)

    window.onresize = ()=>{
        setWinSize(window.innerWidth)
    }

    useEffect(()=>{
        setWinSize(window.innerWidth)
        getRequest("navigation")
            .then((e)=>setNavigation(e))
            .catch((err)=>console.error(err))
            .finally(()=>{
                setClicked("/" + window.location.href.split("/").splice(-1)[0])
            })
    }, [])

    return (
        <div className="nav" style={{backgroundImage: "url(" + imageList[2] + ")"}}>
            {
                winSize<750 && <div className="controls">
                {
                    isOpenNav ? <GrClose size={25} onClick={()=>setIsOpenNav(false)}/>
                    : <BiMenu size={25} onClick={()=>setIsOpenNav(true)}/>
                }
            </div>
            }
            {
                isOpenNav ?
            <>
            <div className="top">
                <Link onClick={()=>setIsOpenNav(false)} className="top-link">SHIP TO: India <div className="india-flag-icon"></div></Link>
                <Link onClick={()=>setIsOpenNav(false)} className="top-link">GIFT CARDS</Link>
                <Link onClick={()=>setIsOpenNav(false)} className="top-link">STORE LOCATION</Link>
                <Link onClick={()=>setIsOpenNav(false)} to="user/profile" className="top-link">MY ACCOUNT</Link>
            </div>
            <div className="bottom">
                <div className="nav-left">
                    <img src={imageList[0]} alt="" style={{filter: "invert(1)"}} />
                </div>
                <div className="nav-links-ar">
                    <div className="nav-link">
                        {
                            navigation.map((link, i)=>{
                                return <Link  className={clicked===link.path ? "link button-in color-white hover active" : "link button-in color-white hover inactive"} to={link.path} key={i} onClick={()=>{setClicked(link.path); setIsOpenNav(false);}}>{link.name}</Link>
                            })
                        }   
                    </div>
                    <div className="search-ar">
                        <input type="text"/>
                        <AiOutlineSearch className="icon" />
                    </div>
                    <div className="nav-controls">
                        <Link onClick={()=>setIsOpenNav(false)}  to="/user/cart" className="nav-icon">
                            <AiOutlineShoppingCart />
                        </Link>
                    </div>
                </div>
            </div>
            </> : null }
        </div>
    )
}