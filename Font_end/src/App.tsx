import { Routes, Route, Link, Navigate } from "react-router-dom"
import Header from "./component/Header";
import React from "react";
import HomePage from "./component/HomePage";
import Product from "./component/Products";
import ProductDetail from "./component/ProductDetail";
import Login from "./client/auth/login";
import Register from "./client/auth/register";
import Footer from "./component/Footer";
import Cart from "./component/Cart";



function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<Product />} />
        <Route path='/productdetail' element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
