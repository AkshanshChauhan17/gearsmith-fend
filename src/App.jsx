import './App.scss'
import './App.media.scss'
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom'
import Navigation from './components/navigation'
import Shop from './components/shop'
import Products from './components/shop/products'
import Admin from './components/admin'
import UserLogin from './components/auth/user.login'
import { connect } from 'react-redux'
import { setLoginStatus } from './redux/store/actions'
import verifyToken from './components/auth/verify.token'
import { useEffect, useState } from 'react'
import UserSignin from './components/auth/user.signin'
import Footer from './components/footer'
import Profile from './components/auth/profile'
import Home from './components/home'
import Advantages from './components/advantages'
import AboutUs from './components/about'
import Cart from './components/cart'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import PaymentForm from './components/order'
import { PrivacyPolicy } from './components/privacy_policy'
import TermAndCondition from './components/tc'
import Review from './components/reviews'
import Dashboard from './components/admin/dashboard'
import { getRequest } from './functions/get.req'
import MyOrder from './components/order/myorder'
import { imageList } from './functions/images'
import { SiOpsgenie } from 'react-icons/si'
import { BiError, BiExitFullscreen, BiFullscreen } from 'react-icons/bi'
import ReturnRefundCancellationPolicy from './components/rrc'
import ShippingAndDeliveryPolicy from './components/sdp'
import { BsSignTurnLeft, BsSignTurnRight } from 'react-icons/bs'

function App({login_status, setLoginStatus}) {
  const [userData, setUserData] = useState([])
  const [userMeta, setUserMeta] = useState({})
  const [loading, setLoading] = useState(true)
  const [cartData, setCartData] = useState([])
  const [isFullScreen, setIsFullScreen] = useState(false)
  const navigate = useNavigate()

  const handleVerifyToken = async ()=> {
    await verifyToken()
      .then((res)=>{
        console.log(res)
        if(res.message != "Authorized") {
          setLoginStatus(false)
          localStorage.clear()
        } else {
          setLoginStatus(true)
          setUserData(res.result[0])
          setUserMeta(JSON.parse(res.result[0].meta))
        }
      })
      setLoading(false)
  }

  function ErrorPage(){
    return <div className="error-page">
      <div className='message'>404 Page Not Found <BiError /></div>
    </div>
  }

  const location = useLocation();
  
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [location])

  const handleLogout = ()=>{
    localStorage.clear()
    setLoginStatus(false)
    navigate("/")
  }

  const g_cart = ()=>{
    getRequest("order/checkout?token=" + localStorage.token)
      .then((cart_data)=>setCartData(cart_data))
      .catch((err)=>console.error(err))
  }

  useEffect(()=>{
    handleVerifyToken()
    getRequest("order/checkout?token=" + localStorage.token)
      .then((cart_data)=>setCartData(cart_data))
      .catch((err)=>console.error(err))
  }, [])

  const handleFullScreen = ()=>{
    if(isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          console.log('Exited fullscreen mode');
        }).catch((err) => {
          console.error('Error attempting to exit full-screen mode:', err);
        });
      }
    } else {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          console.log('Entered fullscreen mode');
        }).catch((err) => {
          console.error('Error attempting to enable full-screen mode:', err);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().then(() => {
            console.log('Exited fullscreen mode');
          }).catch((err) => {
            console.error('Error attempting to exit full-screen mode:', err);
          });
        }
      }
    }
  }

  useEffect(()=>{
    document.addEventListener("fullscreenchange",()=>{
      if(!document.fullscreenElement) {
        setIsFullScreen(false)
      } else {
        setIsFullScreen(true)
      }
    })
  }, [])

  if(loading) {
    return <div className="logo-loading-ar">
      <div className="logo-loader">
        <AiOutlineLoading3Quarters className='loader white' />
      </div>
    </div>
  }

  if(!login_status) {
    return <div className="app">
      <div className='nav'>
      <div className="bottom">
        <div className="nav-left">
          <img src={imageList[0]} alt="" style={{filter: "invert(1)"}} />
        </div>
        <div className="nav-links-ar">
          <div className="nav-link">
            <Link to={"/login"} className="link button-in color-white">Login</Link>/<Link to={"/register"} className="link button-in color-white">Register</Link>
          </div>
        </div>    
      </div>
      </div>
      <Routes>
        <Route path='/' element={<Home with_login={true} />} />
        <Route path='/login' element={<UserLogin lsDef={setLoginStatus} />} />
        <Route path='/register' element={<UserSignin ls={login_status} lsDef={setLoginStatus} />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </div>
  }

  return (
    <div className="app">
        <div className={isFullScreen ? "fullscreen-control control-selected" : "fullscreen-control" } onClick={()=>{isFullScreen ? setIsFullScreen(false) : setIsFullScreen(true); handleFullScreen()}}>
          {
            isFullScreen ? <BiExitFullscreen /> : <BiFullscreen />
          }
        </div>
        <Navigation lsDef={setLoginStatus} ls={login_status} ud={userData} um={userMeta} cartData={cartData} />
        <Routes>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Home />} />
          <Route path='/rrcp' element={<ReturnRefundCancellationPolicy />} />
          <Route path='/sdp' element={<ShippingAndDeliveryPolicy />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:name' element={<Products ud={userData} gcDef={g_cart} change={location} />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/advantage' element={<Advantages />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/user/cart' element={<Cart ud={userData} gcDef={g_cart} />} />
          <Route path='/user/profile' element={<Profile ud={userData} um={userMeta} logOut={handleLogout} />} />
          <Route path='/myorder' element={<MyOrder />} />
          <Route path='/reviews' element={<Review />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-conditions' element={<TermAndCondition />} />
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
        <Footer />
    </div>
  )
}

const mapStateToProps = (state)=> ({
  login_status: state.is_login.login_status,
})

const mapDispatchToProps = (dispatch) => ({
  setLoginStatus: (login) => dispatch(setLoginStatus(login)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)