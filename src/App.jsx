import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

function App({login_status, setLoginStatus}) {
  const [userData, setUserData] = useState([])
  const [userMeta, setUserMeta] = useState({})
  const handleVerifyToken = async ()=> {
    await verifyToken()
      .then((res)=>{
        if(res.message != "Authorized") {
          setLoginStatus(false)
        } else {
          setUserData(res.result[0])
          setUserMeta(JSON.parse(res.result[0].meta))
          setLoginStatus(true)
        }
      })
  }

  useEffect(()=>{
    handleVerifyToken()
  }, [])

  if(!login_status) {
    return <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLogin lsDef={setLoginStatus} />} />
        <Route path='/register' element={<UserSignin ls={login_status} lsDef={setLoginStatus} />} />
      </Routes>
    </BrowserRouter>
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Navigation lsDef={setLoginStatus} ls={login_status} ud={userData} um={userMeta} />
        <Routes>
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:name' element={<Products />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/user/profile' element={<Profile ud={userData} um={userMeta} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
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