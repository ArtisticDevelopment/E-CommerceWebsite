import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout.styles.scss";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const CheckOut = () => {
  const [total, setTotal] = useState(0);
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    setTotal(
      cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
    );
  }, [cartItems]);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => {
        return (
          cartItem.quantity > 0 && (
            <CheckoutItem cartItem={cartItem} key={cartItem.id} />
          )
        );
      })}
      <span className="total">${total}</span>
    </div>
  );
};

export default CheckOut;
