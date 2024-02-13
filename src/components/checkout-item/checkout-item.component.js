import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";

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
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () => {
    if (cartItem.quantity === 1) {
      return;
    }
    dispatch(removeItemFromCart(cartItems, cartItem));
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
