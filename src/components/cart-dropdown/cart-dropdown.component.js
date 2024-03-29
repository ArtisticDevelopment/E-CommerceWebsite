import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartCount,
  selectCartItems,
  selectIsCartOpen,
} from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component.js";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
  CartItemsEmpty,
} from "./cart-dropdown.styles.jsx";

const CartDropDown = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);

  //instantiate Navigate after importing from library
  const navigate = useNavigate();

  //Button's onClick handler to navigate to checkout
  const navigateToCheckout = () => {
    navigate("/checkout");
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartDropdownContainer className="cart-dropdown-container">
      <CartItems className="cart-items">
        {cartCount === 0 ? (
          <CartItemsEmpty as="span" className="cart-items-empty">
            <EmptyMessage>No Items Added</EmptyMessage>
          </CartItemsEmpty>
        ) : (
          cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />;
          })
        )}
      </CartItems>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.base}
        onClick={navigateToCheckout}
      >
        Checkout
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropDown;
