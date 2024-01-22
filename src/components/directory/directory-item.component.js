import { Link, useNavigate } from "react-router-dom";

import "./directory-item.styles.jsx";
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;

  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer
      className="directory-item-container"
      onClick={onNavigateHandler}
    >
      <BackgroundImage className="background-image" imageUrl={imageUrl} />

      <Body className="body">
        <h2>{title}</h2>
        <Link className="nav-link">
          <p>Shop Now</p>
        </Link>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
