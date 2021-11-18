import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProduct } from "../../utils/axiosApi";
import CartItem from "../Cart/CartItem/CartItem";
import HeaderLink from "../Header/Link";
import "./Dashboard.css";

function Dashboard() {
  const [product, setProduct] = useState([]);
  const [itemCounter, setItemCounter] = useState(0);
  const history = useHistory();


  function cartItemAdd(id) {
    setItemCounter(itemCounter + 1)
    history.push(`/addtoCart/${id}`, { isFromParent: true });
  }

  async function getProducts() {
    const productInfo = await getProduct({
      url: 'api/get-product'
    });
    setProduct(productInfo ? productInfo.data.data : null);
  }
console.log(`process.env.REACT_APP_PRODUCTMANAGEURL`, process.env.REACT_APP_PRODUCTMANAGEURL)
  useEffect(() => {
    getProducts();
  }, [])
  return (
    <>
      <HeaderLink />
      <CartItem />
      <div className="dashboardContainer">
        {product && product.map((product, i) => (
          <div className="card" key={i}>
            <div className="content">
              <h3>{product.title}</h3>
              <h4>{product.description}</h4>
              <div className="product_outer">
                <img className="product_inner" src={product.image} alt="50497-7-mobile-earphone-png-file-hd" border="0" />
              </div>
              <div className="buynow" onClick={() => cartItemAdd(product._id)}>Buy Now</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
