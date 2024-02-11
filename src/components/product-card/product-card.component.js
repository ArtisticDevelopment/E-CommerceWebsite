import { useDispatch, useSelector } from "react-redux";
import "./product-card.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { addItemToCart } from "../../store/cart/cart.action.js";
import { selectCartItems } from "../../store/cart/cart.selector.js";

import {
  ProductCardContainer,
  Image,
  CustomButton,
  Footer,
  Name,
  Price,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  console.log("cart items again: ", cartItems);

  const addProductToCart = () => {
    return dispatch(addItemToCart(cartItems, product));
  };

  return (
    <ProductCardContainer className="product-card-container">
      <Image src={imageUrl} alt={`${name}`} />
      <Footer className="footer">
        <Name className="name">{name}</Name>
        <Price className="price">${price}</Price>
      </Footer>
      <CustomButton
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add To Cart
      </CustomButton>
    </ProductCardContainer>
  );
};

export default ProductCard;
