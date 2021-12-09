import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import emptyCart from '../../assets/empty-cart.png'
import { deleteCart, getOrderCart, updateCart } from '../../utils/axiosApi';
import HeaderLink from '../Header/Link';
import './Cart.css'

function Cart() {
    const [cartData, setCartData] = useState([]);
    const [disable, setDisable] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        async function getCartData() {
            const cartInfo = await getOrderCart({
                url: 'api/get-cart'
            });
            setCartData({
                temproryData: false,
                data: cartInfo.data.data
            })
        }
        getCartData();
    }, [])


    useEffect(() => {
        function price() {
            const totalCartsPrice = cartData && cartData.data && cartData.data.reduce((previous, current) => {
                return (previous + parseInt(current.price)) * parseInt(current.quantity);
            }, 0);
            setTotalPrice(totalCartsPrice)
        }
        price();
    }, [cartData])

    async function increaseQuantity(id) {
        setDisable(false)
        const updateIndex = cartData.data.findIndex((item) => item._id === id)
        cartData.data[updateIndex] = {
            ...cartData.data[updateIndex],
            quantity: (cartData.data[updateIndex].quantity += 1)
        };
        await updateCart({ url: 'api/update-cart/' + id }, { quantity: (cartData.data[updateIndex].quantity) });
        setCartData({
            temproryData: !cartData.temproryData,
            data: cartData.data
        })
    }

    async function decreaseQuantity(id) {
        const updateIndex = cartData.data.findIndex((item) => item._id === id)
        cartData.data[updateIndex] = {
            ...cartData.data[updateIndex],
            quantity: (cartData.data[updateIndex].quantity -= 1)
        };
        setCartData({
            temproryData: !cartData.temproryData,
            data: cartData.data
        })
        if (cartData.data[updateIndex].quantity < 0) {
            setDisable(true)
            cartData.data[updateIndex] = {
                ...cartData.data[updateIndex],
                quantity: (cartData.data[updateIndex].quantity = 0)
            };
        }
        await updateCart({ url: 'api/update-cart/' + id }, { quantity: (cartData.data[updateIndex].quantity) });
    }

    async function removeCart(id) {
        await deleteCart({ url: 'api/delete-cart/' + id });
        const updatedCartData = cartData && cartData.data && cartData.data.filter((item) => item._id !== id)
        setCartData({
            ...cartData,
            data: updatedCartData
        });
    }

    async function OrderNow() {
        if (cartData && !cartData.data.length) {
            alert('Please add product to cart')
        } else {
            alert('Ordered Successfully')
        }
    }

    return (
        <>
            <HeaderLink />
            <div className="Cartcontainer">
                <h1 className="cartHeading">Shopify Cart</h1>
                {
                    cartData && cartData.data && cartData.data.length <= 0 ?
                        <div className="displayCartEmpty">
                            <img src={emptyCart} alt="axdgvad" />
                            <h6>Your cart is empty</h6>
                            <div className="cartOrderNow">
                                <Link to="/dashboard">Order Now</Link>
                            </div>
                        </div>
                        :
                        cartData && cartData.data && cartData.data.map((item, i) => (
                            <div className="cartItem" key={i}>
                                <img className="itemImage" src={item.image} alt={item.image} />
                                <h4>{item.title}</h4>
                                <div className="quantitySection">
                                    <button style={disable ? { background: "#444", cursor: "not-allowed" } : null} onClick={() => decreaseQuantity(item._id)} className="minusCartQuantity">
                                        <ion-icon name="remove-outline"></ion-icon>
                                    </button>
                                    <input value={item.quantity} id="quantity" type="text" name="quantity" />
                                    <button onClick={() => increaseQuantity(item._id)} className="plusCartQuantity">
                                        <ion-icon name="add-outline"></ion-icon>
                                    </button>
                                </div>
                                <p className="cartPrice">$ {item.price * item.quantity}</p>
                                <div className="removeIcon" onClick={() => removeCart(item._id)}>
                                    <ion-icon name="trash-outline"></ion-icon>
                                </div>
                            </div>
                        ))
                }
            </div>
            <div className="totalPrice">
                <div className="priceContent">
                    <h4>$ {totalPrice ? totalPrice : 0}</h4>
                    <Button onClick={OrderNow}>Check Out</Button>
                </div>
            </div>
        </>
    )
}

export default Cart
