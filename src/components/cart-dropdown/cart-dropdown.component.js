import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropDown = () => {
  const { cartCount, cartItems, isCartOpen, setIsCartOpen } =
    useContext(CartContext);

  //instantiate Navigate after importing from library
  const navigate = useNavigate();

  //Button's onClick handler to navigate to checkout
  const navigateToCheckout = () => {
    navigate("/checkout");
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartCount === 0 ? (
          <span className="cart-items-emtpy">No Items Added</span>
        ) : (
          cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />;
          })
        )}
      </div>
      <Button onClick={navigateToCheckout}>Checkout</Button>
    </div>
  );
};

export default CartDropDown;
