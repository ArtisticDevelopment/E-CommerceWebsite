import { useContext } from "react";

import { CartContext } from "../../context/cart.context";
import {
  CartIconContainer,
  ItemCount,
  ShoppingIconSVG,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { cartCount, isCartOpen, setIsCartOpen } = useContext(CartContext);

  //sets isCartOpen value to opposite every time cart-icon is clicked
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIconSVG />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
