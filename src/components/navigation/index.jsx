import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import { Link } from "react-router-dom"
import { imageList } from "../../functions/images"
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { GrClose, GrDown, GrUp } from "react-icons/gr"
import { BiMenu } from "react-icons/bi"

export default function Navigation({ls, ud, um, cartData}) {

    const [navigation, setNavigation] = useState([])
    const [clicked, setClicked] = useState(0)
    const [isOpenNav, setIsOpenNav] = useState(true)
    const [winSize, setWinSize] = useState(0)
    const [isOpenBanner, setIsOpenBanner] = useState(true)
    const [currentTextIndex, setCurrentTextIndex] = useState(1)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 3000);
    
        return () => clearInterval(intervalId);
      }, [])

    window.onresize = ()=>{
        setWinSize(window.innerWidth)
        if(window.innerWidth > 750) {
            setIsOpenNav(true)
        } else {
            setIsOpenNav(false)
        }
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
        <div className="nav">
            {
                winSize>750 && isOpenBanner && <div className="banner">
                    <div className={currentTextIndex===0 ? "rotating-text-view" : "rotating-text-hide"}>
                        Gear Up in Technical Excellence
                    </div>
                    <div className={currentTextIndex===1 ? "rotating-text-view" : "rotating-text-hide"}>
                        Discover Innovation, Wear Confidence
                    </div>
                    <div className={currentTextIndex===2 ? "rotating-text-view" : "rotating-text-hide"}>
                        Elevate Your Performance, Define Your Style
                    </div>
                    <div className={currentTextIndex===3 ? "rotating-text-view" : "rotating-text-hide"}>
                        Unleash Adventure with GearSmith's Finest
                    </div>
                </div>
            }
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
                <Link onClick={()=>setIsOpenNav(winSize<750 ? false : true)} className="top-link">SHIP TO: India <div className="india-flag-icon"></div></Link>
                <Link onClick={()=>setIsOpenNav(winSize<750 ? false : true)} className="top-link">GIFT CARDS</Link>
                <Link onClick={()=>setIsOpenNav(winSize<750 ? false : true)} className="top-link">STORE LOCATION</Link>
                <Link onClick={()=>setIsOpenNav(winSize<750 ? false : true)} to="user/profile" className="top-link">MY ACCOUNT</Link>
                {
                    winSize>750 && isOpenBanner ? 
                        <GrUp className="top-link" style={{cursor: "pointer"}} onClick={()=>setIsOpenBanner(false)}/> 
                            :
                        <GrDown className="top-link" style={{cursor: "pointer"}} onClick={()=>setIsOpenBanner(true)}/>
                }
            </div>
            <div className="bottom">
                <div className="nav-left">
                    <img src={imageList[0]} alt="" style={{filter: "invert(1)"}} />
                </div>
                <div className="nav-links-ar">
                    <div className="nav-link">
                        {
                            navigation.map((link, i)=>{
                                return <Link  className={clicked===link.path ? "link button-in color-white hover active" : "link button-in color-white hover inactive"} to={link.path} key={i} onClick={()=>{setClicked(link.path); setIsOpenNav(winSize<750 ? false : true);}}>{link.name}</Link>
                            })
                        }   
                    </div>
                    <div className="search-ar">
                        <input type="text"/>
                        <AiOutlineSearch className="icon" />
                    </div>
                </div>
                <div className="nav-links-ar">
                    <div className="nav-controls">
                        <Link onClick={()=>setIsOpenNav(winSize<750 ? false : true)}  to="/user/cart" className="nav-icon">
                            <AiOutlineShoppingCart /><div className="text">{cartData.length}</div>
                        </Link>
                    </div>
                </div>
            </div>
            </> : null }
        </div>
    )
}