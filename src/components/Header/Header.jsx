import React, { useRef, useEffect } from 'react'
import { MenuOutlined, ReconciliationOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { AutoComplete, Badge, Button, Drawer, Dropdown, Input, Menu, message } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import defaultAvt from '../../assets/images/default-avt.png'

import { Container } from 'reactstrap'
import logo from '../../assets/images/logo.png'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCartUi } from '../../store/cart_ui/cart_ui.action.jsx'

import './header.css'

const nav__links = [
    {
        display: 'Trang chủ',
        path: '/home',
    },
    {
        display: 'Sản phẩm',
        path: '/products',
    },
    {
        display: 'Giỏ hàng',
        path: '/cart',
    },
    {
        display: 'Liên hệ',
        path: '/contact',
    },
]

const Header = () => {
    const menuRef = useRef(null)
    const isAuth = useSelector((state) => state.AuthReducer.currentUser)
    const username = useSelector((state) => state.AuthReducer.infoUser)
    const img = useSelector((state) => state.AuthReducer.infoUser)

    const totalQuantity = useSelector((state) => state.CartReducer.totalQuantity)
    const dispatch = useDispatch()

    const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

    const toggleCart = () => {
        dispatch(toggleCartUi(true))
    }

    return (
        <header className="header header__shrink">
            <Container>
                <div className="nav__wrapper d-flex align-items-center justify-content-between">
                    <Link to={'/'} className="logo">
                        <img src={logo} alt="logo" />
                        {/* <h5>Tasty Treat</h5> */}
                    </Link>

                    {/* ======= menu ======= */}
                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <div className="menu d-flex align-items-center gap-5">
                            {nav__links.map((item, index) => (
                                <NavLink to={item.path} key={index} className={(navClass) => (navClass.isActive ? 'active__menu' : '')}>
                                    {item.display}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* ======== nav right icons ========= */}
                    <div className="nav__right text d-flex align-items-center gap-4">
                        <span className="cart__icon" onClick={toggleCart}>
                            {/* <i class="ri-shopping-basket-line"></i> */}

                            <i class="ri-shopping-cart-2-line"></i>
                            <span className="cart__badge">{totalQuantity}</span>
                            <span className="title">Giỏ hàng</span>
                        </span>

                        <Link to={isAuth ? '/account' : '/login'}>
                            {!isAuth ? (
                                <div className="d-flex flex-column navbar-tool-item p-l-0">
                                    {/* <UserOutlined className="icon m-r-12" /> */}
                                    <Avatar src={defaultAvt} className="" />
                                    <span className="title">Đăng nhập</span>
                                </div>
                            ) : (
                                <div className="d-flex flex-column navbar-tool-item p-l-0">
                                    <Avatar src={img} size={20} className="" />
                                    <span className="title">{username}</span>
                                </div>
                            )}
                        </Link>
                        {/* mobile menu */}
                        <span className="mobile__menu" onClick={toggleMenu}>
                            <i class="ri-menu-line"></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header
