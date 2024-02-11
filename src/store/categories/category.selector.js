import { createSelector } from "reselect";

//simply selecting state
const selectCategoryReducer = (state) => {
  console.log("state categories:", state.categories);
  return state.categories;
};

//returns array of objects containing category 'title' and 'data'
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    console.log("slice", categoriesSlice);
    return categoriesSlice.categories;
  }
);

//iterates through selectCategories array and returns
//an objects {'title': items[]}
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      console.log("acc", acc);
      return acc;
    }, {})
);

//confusing but we get it
