import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/home/Home'
import AllProducts from '../pages/all_products/AllProducts'
import ProductDetails from '../pages/product_details/ProductDetails'
import Cart from '../pages/cart/Cart'
import Checkout from '../pages/checkout/Checkout'
import Contact from '../pages/contact/Contact'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default Routers
