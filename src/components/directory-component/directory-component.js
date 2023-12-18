import CategoryItem from "../category-item/category-item.component.js";
import "./directory.styles.scss";
const Directory = ({ categories }) => {
  console.log(categories);
  return (
    <div className="directory-container">
      {/* deconstructing of values */}
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
