import React from 'react'

import './product-card.css'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { cartActions } from '../../../store/shopping-cart/cartSlice'

const ProductCard = (props) => {
    const { id, title, img, price } = props.item
    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id,
                title,
                img,
                price,
            })
        )
    }

    return (
        <div className="product__item">
            <div className="product__img">
                <Link to={`/products/${id}`}>
                    <img src={img[0].img} alt="product-img" className="w-50" />
                </Link>
            </div>

            <div className="product__content">
                <h5>
                    <Link to={`/products/${id}`}>{title}</Link>
                </h5>
                <div className=" d-flex align-items-center justify-content-between ">
                    <span className="product__price">${price}</span>
                    <button className="addToCart__btn" onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
