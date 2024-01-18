import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: [],
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap] = useState([]);
  const value = { categoriesMap };

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log({ categoryMap });
    };
    getCategoriesMap();
  }, []);

  //calling function in firebase.js that will add Data to Firestore
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
