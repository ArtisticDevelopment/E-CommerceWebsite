import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { CheckoutContainer, CheckoutHeader, Total } from "./checkout.styles";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const CheckOut = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

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
