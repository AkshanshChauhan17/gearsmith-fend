import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation'
import Shop from './components/shop'
import Products from './components/shop/products'
import Admin from './components/admin'
import UserLogin from './components/auth/user.login'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:name' element={<Products />} />
          <Route path='/user/login' element={<UserLogin />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
