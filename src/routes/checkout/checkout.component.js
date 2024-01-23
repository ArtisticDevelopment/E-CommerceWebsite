import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { CheckoutContainer, CheckoutHeader, Total } from "./checkout.styles";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const CheckOut = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer className="checkout-container">
      <CheckoutHeader className="checkout-header">
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
      </CheckoutHeader>

      {cartItems.map((cartItem) => {
        return (
          cartItem.quantity > 0 && (
            <CheckoutItem cartItem={cartItem} key={cartItem.id} />
          )
        );
      })}
      <Total className="total">${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default CheckOut;
