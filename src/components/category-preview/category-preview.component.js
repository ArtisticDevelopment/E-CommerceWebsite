import ProductCard from "../product-card/product-card.component";

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <span className="title">{title.toUpperCase()}</span>
      </h2>
      <div className="preview">
        {/* filter out each product array to only the first 4,
        THEN for each of those products create a new array of ProductCards */}
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={products.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
