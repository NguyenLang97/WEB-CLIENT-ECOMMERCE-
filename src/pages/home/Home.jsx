import React, { useState, useEffect } from 'react'

import Helmet from '../../components/helmet/Helmet'
import { Container, ListGroup, ListGroupItem, Col, Row } from 'reactstrap'
import '../../styles/hero-section.css'

import Category from '../../components/ui/category/Category.jsx'

import './home.scss'

import featureImg01 from '../../assets/images/service-01.png'
import featureImg02 from '../../assets/images/service-02.png'
import featureImg03 from '../../assets/images/service-03.png'

import products from '../../assets/fake-data/products.js'

import foodCategoryImg01 from '../../assets/images/hamburger.png'
import foodCategoryImg02 from '../../assets/images/pizza.png'
import foodCategoryImg03 from '../../assets/images/bread.png'

import ProductCard from '../../components/ui/product-card/ProductCard.jsx'
import SaleOff from '../../components/sale_off/SaleOff'
import FamousBrand from '../../components/famous_brand/FamousBrand'
// import DiscountList from '../../components/discount_list/DiscountList'

const featureData = [
    {
        title: 'Quick Delivery',
        imgUrl: featureImg01,
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.',
    },

    {
        title: 'Super Dine In',
        imgUrl: featureImg02,
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.',
    },
    {
        title: 'Easy Pick Up',
        imgUrl: featureImg03,
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.',
    },
]

const Home = () => {
    const [category, setCategory] = useState('ALL')
    const [allProducts, setAllProducts] = useState(products)

    const [hotPizza, setHotPizza] = useState([])

    useEffect(() => {
        const filteredPizza = products.filter((item) => item.category === 'Pizza')
        const slicePizza = filteredPizza.slice(0, 4)
        setHotPizza(slicePizza)
    }, [])

    useEffect(() => {
        if (category === 'ALL') {
            setAllProducts(products)
        }

        if (category === 'BURGER') {
            const filteredProducts = products.filter((item) => item.category === 'Burger')

            setAllProducts(filteredProducts)
        }

        if (category === 'PIZZA') {
            const filteredProducts = products.filter((item) => item.category === 'Pizza')

            setAllProducts(filteredProducts)
        }

        if (category === 'BREAD') {
            const filteredProducts = products.filter((item) => item.category === 'Bread')

            setAllProducts(filteredProducts)
        }
    }, [category])

    return (
        <Helmet title="Home">
            <section>
                <SaleOff />
            </section>

            <section className="pt-0">
                <Category />
            </section>

            {/* Thương hiệu nổi bật */}
            <section>
                <Container>
                    <Row>
                        <Col className="home__famous-brand bg-white box-sha-home bor-rad-8 ">
                            <FamousBrand />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col className="adv">
                            <a href="https://www.apple.com/watch/" target="blank">
                                <img className="adv-img w-100 bor-rad-8" src="https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268459/others/1_iorzsj.webp" />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2>Popular Products</h2>
                        </Col>

                        <Col lg="12">
                            <div className="food__category d-flex align-items-center justify-content-center gap-4">
                                <button className={`all__btn  ${category === 'ALL' ? 'foodBtnActive' : ''} `} onClick={() => setCategory('ALL')}>
                                    All
                                </button>
                                <button className={`d-flex align-items-center gap-2 ${category === 'BURGER' ? 'foodBtnActive' : ''} `} onClick={() => setCategory('BURGER')}>
                                    <img src={foodCategoryImg01} alt="" />
                                    Burger
                                </button>

                                <button className={`d-flex align-items-center gap-2 ${category === 'PIZZA' ? 'foodBtnActive' : ''} `} onClick={() => setCategory('PIZZA')}>
                                    <img src={foodCategoryImg02} alt="" />
                                    Pizza
                                </button>

                                <button className={`d-flex align-items-center gap-2 ${category === 'BREAD' ? 'foodBtnActive' : ''} `} onClick={() => setCategory('BREAD')}>
                                    <img src={foodCategoryImg03} alt="" />
                                    Bread
                                </button>
                            </div>
                        </Col>

                        {allProducts.map((item) => (
                            <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                                <ProductCard item={item} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col className="adv">
                            <a href="https://www.panasonic.com/vn/" target="blank">
                                <img className="adv-img w-100 bor-rad-8" src="https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268459/others/2_wapowv.webp" />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pt-0">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center mb-5 ">
                            <h2>Hot Pizza</h2>
                        </Col>

                        {hotPizza.map((item) => (
                            <Col lg="3" md="4" sm="6" xs="6" key={item.id}>
                                <ProductCard item={item} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Home
