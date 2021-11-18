import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';

import { addtoCart, getOneProduct } from '../../../utils/axiosApi';
import CartItem from "../CartItem/CartItem";
import './SeprateCartItem.css';

function SeprateCartItem(props) {
    const [productCart, setProductCart] = useState({});

    const { id } = useParams();
    const history = useHistory();

    async function addToCart(cartProfile) {
        cartProfile.quantity = 1;
        await addtoCart({
            url: 'api/addToCart'
        }, cartProfile);
        history.push(`/addToCart`);
    }

    useEffect(() => {
        if (props.location.state?.isFromParent) {
            async function getProduct() {
                const productCartdetail = await getOneProduct({
                    url: 'api/getOne-product/' + id
                })
                setProductCart(productCartdetail.data.data)
            }
            getProduct();
        } else {
            history.push(`/dashboard`);
        }
    }, [id, history, props.location.state?.isFromParent])

    return (
        <>
            <CartItem />
            <div className="seprateContainer">
                <div className="cartModal">
                    <h1>Cart Profile</h1>
                    <div className="product_outer">
                        <img className="product_inner" src={productCart && productCart.image} alt="50497-7-mobile-earphone-png-file-hd" border="0" />
                    </div>
                    <h2 className="title">{productCart && productCart.title}</h2>
                    <h4 className="description">{productCart && productCart.desctiption}</h4>
                    <p className="price">${productCart && productCart.price}</p>

                    <div className="addToCart">
                        <Button type="button" onClick={() => addToCart(productCart)}>Add to cart</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeprateCartItem
