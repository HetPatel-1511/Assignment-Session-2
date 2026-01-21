import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Home from './pages/home'
import './App.css'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import Checkout from './pages/Checkout'

const App = () => {
  return (
    <Router>
      <div className='bg-gray-200 h-max'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
