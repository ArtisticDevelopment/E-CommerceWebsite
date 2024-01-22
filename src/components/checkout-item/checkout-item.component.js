import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import {
  CheckoutItemContainer,
  ImageContainer,
  Image,
  Name,
  Price,
  Quantity,
  Arrow,
  RemoveButton,
  Value,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => {
    if (cartItem.quantity === 1) {
      return;
    }
    removeItemFromCart(cartItem);
  };

  return (
    cartItem.quantity > 0 && (
      <CheckoutItemContainer className="checkout-item-container">
        <ImageContainer className="image-container">
          <Image src={imageUrl} alt={`${name}`} />
        </ImageContainer>

        <Name className="name">{name}</Name>

        <Quantity className="quantity">
          <Arrow className="arrow" onClick={removeItemHandler}>
            &#10094;
          </Arrow>
          <Value className="value">{quantity}</Value>
          <Arrow className="arrow" onClick={addItemHandler}>
            &#10095;
          </Arrow>
        </Quantity>
        <Price className="price">{price}</Price>
        {/* element value creates an X */}
        <RemoveButton className="remove-button" onClick={clearItemHandler}>
          &#10005;
        </RemoveButton>
      </CheckoutItemContainer>
    )
  );
};

export default CheckoutItem;
