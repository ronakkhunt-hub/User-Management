import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import { getOrderCart } from '../../../utils/axiosApi';
import './CartItem.css';

function CartItem() {
    const [allCartItems, setAllCartItems] = useState([]);
    const history = useHistory();

    async function getAllCart() {
        const productCartdetail = await getOrderCart({
            url: 'api/get-cart'
        })
        setAllCartItems(productCartdetail.data.data)
    }

    useEffect(() => {
        getAllCart();
    }, [])

    async function showCarts() {
        history.push('/addToCart');
    }
    return (
        <div onClick={showCarts} className="cart_icon">
            <ion-icon name="cart"></ion-icon>
            <p className="cartNumber">{allCartItems.length}</p>
        </div>
    )
}

export default CartItem
