import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart } = useContext(CartContext);

  return (
    cartItem.quantity > 0 && (
      <div className="checkout-item-container">
        <div className="image-container">
          <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">{quantity}</span>
        <span className="price">{price}</span>
        {/* element value creates an X */}
        <div
          className="remove-button"
          onClick={() => clearItemFromCart(cartItem)}
        >
          &#10005;
        </div>
      </div>
    )
  );
};

export default CheckoutItem;
