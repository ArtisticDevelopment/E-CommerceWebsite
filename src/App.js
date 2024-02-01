import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCategoriesAndDocuments,
} from "./utils/firebase/firebase.utils";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";
import { setCategoriesMap } from "./store/categories/category.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
          createUserDocumentFromAuth(user);
          dispatch(setCurrentUser(user));
        } else {
          // Handle the case when user is null or undefined
          dispatch(setCurrentUser(null));
        }
      });

      try {
        // Fetch categories only if the user is available
        if (unsubscribe && unsubscribe.currentUser) {
          const categoryMap = await getCategoriesAndDocuments();
          console.log({ categoryMap });
          // Dispatch an action or update the state with categoryMap if needed
          dispatch(setCategoriesMap(categoryMap));
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [dispatch]);

  //using index sets that element for the default content to be rendered
  //setting path="/" and path="" does the same thing
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
