import './App.scss'
import './App.media.scss'
import { Routes, Route, useLocation } from 'react-router-dom'
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

function App({login_status, setLoginStatus}) {
  const [userData, setUserData] = useState([])
  const [userMeta, setUserMeta] = useState({})
  const [loading, setLoading] = useState(true)
  

  const handleVerifyToken = async ()=> {
    await verifyToken()
      .then((res)=>{
        console.log(res)
        if(res.message != "Authorized") {
          setLoginStatus(false)
          navigate("/")
        } else {
          setLoginStatus(true)
          setUserData(res.result[0])
          setUserMeta(JSON.parse(res.result[0].meta))
        }
      })
      setLoading(false)
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

  useEffect(()=>{
    handleVerifyToken()
  }, [])

  if(loading) {
    return <div className="logo-loading-ar">
      <div className="logo-loader">
        <AiOutlineLoading3Quarters className='loader white' />
      </div>
    </div>
  }

  if(!login_status) {
    return <>
      <Routes>
        <Route path='/' element={<UserLogin lsDef={setLoginStatus} />} />
        <Route path='/register' element={<UserSignin ls={login_status} lsDef={setLoginStatus} />} />
      </Routes>
    </>
  }

  return (
    <div className="app">
        <Navigation lsDef={setLoginStatus} ls={login_status} ud={userData} um={userMeta} />
        <Routes>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:name' element={<Products ud={userData} />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/advantage' element={<Advantages />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/user/cart' element={<Cart ud={userData} />} />
          <Route path='/user/profile' element={<Profile ud={userData} um={userMeta} logOut={handleLogout} />} />
          <Route path='/order' element={<PaymentForm />} />
          <Route path='/reviews' element={<Review />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-conditions' element={<TermAndCondition />} />
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