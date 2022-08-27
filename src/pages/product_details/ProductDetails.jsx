import React, { useState, useEffect } from 'react'

import {
    collection,
    // getDocs,
    onSnapshot,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase_config'
import { useParams } from 'react-router-dom'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'
import { Container, Row, Col } from 'reactstrap'

import { useDispatch } from 'react-redux'
import { addItem } from '../../../src/store/cart/cart.action'

import './product_details.css'
import ProductCard from '../../components/ui/product-card/ProductCard'
import { useMemo } from 'react'
import Policy from './Policy/Policy'

const ProductDetails = () => {
    const [tab, setTab] = useState('desc')
    const [enteredName, setEnteredName] = useState('')
    const [enteredEmail, setEnteredEmail] = useState('')
    const [reviewMsg, setReviewMsg] = useState('')
    const [allProducts, setAllProducts] = useState([])
    // const [product, setProduct] = useState()
    const [previewImg, setPreviewImg] = useState()

    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'products'),
            (snapShot) => {
                let list = []
                snapShot.docs.forEach((doc, index) => {
                    list.push({ id: doc.id, ...doc.data() })
                })
                setAllProducts(list)
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            unsub()
        }
    }, [])
    const product = useMemo(() => {
        if (allProducts) return allProducts.find((item) => item.id === id)
    }, [allProducts])

    console.log('allProducts', allProducts)
    console.log({ product })

    // useEffect(() => {
    //     const { title, price, category, description, img } = product
    // }, [product])
    const relatedProduct = allProducts.filter((item) => product.category === item.category)

    const addProduct = () => {
        if (product) {
            const { title, price, category, description, img } = product
            dispatch(
                addItem({
                    id,
                    title,
                    price,
                    img,
                })
            )
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(enteredName, enteredEmail, reviewMsg)
    }

    // useEffect(() => {
    //     setPreviewImg(product.image01)
    // }, [product])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [product])

    return (
        <>
            {product ? (
                <Helmet title="Product-details">
                    <CommonSection title={product.title} />
                    <section>
                        <Container>
                            <Row>
                                <Col lg="2" md="2">
                                    <div className="product__images ">
                                        {product.img.map((item, index) => (
                                            <div key={index} className="img__item mb-3" onClick={() => setPreviewImg(item.img)}>
                                                <img src={item.img} alt="" className="w-50" />
                                            </div>
                                        ))}
                                    </div>
                                </Col>

                                <Col lg="3" md="3">
                                    <div className="product__main-img">
                                        <img src={previewImg || product.img[0].img} alt="" className="w-100" />
                                    </div>
                                </Col>

                                <Col lg="4" md="4">
                                    <div className="single__product-content">
                                        <h2 className="product__title mb-3">{product.title}</h2>
                                        <p className="product__price">
                                            {' '}
                                            Price: <span>${product.price}</span>
                                        </p>
                                        <p className="category mb-5">
                                            Category: <span>{product.category}</span>
                                        </p>

                                        <button onClick={addProduct} className="addTOCart__btn">
                                            Add to Cart
                                        </button>
                                    </div>
                                </Col>
                                <Col lg="3" md="3">
                                    <Policy />
                                </Col>

                                <Col lg="12">
                                    <div className="tabs d-flex align-items-center gap-5 py-3">
                                        <h6 className={` ${tab === 'desc' ? 'tab__active' : ''}`} onClick={() => setTab('desc')}>
                                            Description
                                        </h6>
                                        <h6 className={` ${tab === 'rev' ? 'tab__active' : ''}`} onClick={() => setTab('rev')}>
                                            Review
                                        </h6>
                                    </div>

                                    {tab === 'desc' ? (
                                        <div className="tab__content">
                                            <p>{product.description}</p>
                                        </div>
                                    ) : (
                                        <div className="tab__form mb-3">
                                            <div className="review pt-5">
                                                <p className="user__name mb-0">Jhon Doe</p>
                                                <p className="user__email">jhon1@gmail.com</p>
                                                <p className="feedback__text">great product</p>
                                            </div>

                                            <div className="review">
                                                <p className="user__name mb-0">Jhon Doe</p>
                                                <p className="user__email">jhon1@gmail.com</p>
                                                <p className="feedback__text">great product</p>
                                            </div>

                                            <div className="review">
                                                <p className="user__name mb-0">Jhon Doe</p>
                                                <p className="user__email">jhon1@gmail.com</p>
                                                <p className="feedback__text">great product</p>
                                            </div>
                                            <form className="form" onSubmit={submitHandler}>
                                                <div className="form__group">
                                                    <input type="text" placeholder="Enter your name" onChange={(e) => setEnteredName(e.target.value)} required />
                                                </div>

                                                <div className="form__group">
                                                    <input type="text" placeholder="Enter your email" onChange={(e) => setEnteredEmail(e.target.value)} required />
                                                </div>

                                                <div className="form__group">
                                                    <textarea rows={5} type="text" placeholder="Write your review" onChange={(e) => setReviewMsg(e.target.value)} required />
                                                </div>

                                                <button type="submit" className="addTOCart__btn">
                                                    Submit
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </Col>

                                <Col lg="12" className="mb-5 mt-4">
                                    <h2 className="related__Product-title">You might also like</h2>
                                </Col>

                                {relatedProduct.map((item) => (
                                    <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                                        <ProductCard item={item} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>
                </Helmet>
            ) : (
                <div>loading</div>
            )}
        </>
    )
}

export default ProductDetails
