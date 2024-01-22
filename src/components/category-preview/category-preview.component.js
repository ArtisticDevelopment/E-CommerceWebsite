import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer className="category-preview-container">
      <h2>
        <Link className="nav-link" to={`/shop/${title.toLowerCase()}`}>
          <Title className="title">{title.toUpperCase()}</Title>{" "}
        </Link>
      </h2>
      <Preview className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
