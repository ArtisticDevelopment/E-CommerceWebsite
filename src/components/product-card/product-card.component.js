import { useContext } from "react";

import "./product-card.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CartContext } from "../../context/cart.context";
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

  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    return addItemToCart(product);
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
