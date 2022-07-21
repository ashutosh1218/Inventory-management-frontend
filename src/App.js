import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import AddProduct from './components/AddProduct'
import Profile from './components/Profile'
function App() {
  return  <BrowserRouter>
  <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-product" element={<AddProduct />} />

      <Route path="/" element={<HomePage />} />
  </Routes>
</BrowserRouter>
}

export default App