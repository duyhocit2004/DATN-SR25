import React from 'react';
import { Routes, Route } from "react-router-dom";

import Product from "../component/Products/Products";
import Login from "../client/auth/login";
import Register from "../client/auth/register";
import MyAccount from "../component/MyAccount";
import Checkout from "../component/Checkout";
import ProductDetail from '../component/ProductDetail';
import Orders from '../component/Orders/Orders';
import OrderDetail from '../component/Orders/OrderDetail';
import HomePage from '../component/HomePage';
import Cart from '../component/Cart';



const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/products' element={<Product />} />
                <Route path='/product/:id' element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/my_account" element={<MyAccount />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
            </Routes>
        </>
    );
};

export default UserRoutes;
