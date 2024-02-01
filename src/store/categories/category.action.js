import createAction from "../../utils/reducer/reducer.utils";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

//after an action is set it runs through ALL the reducers to
//find it's match and execute that action
export const setCategoriesMap = (categoriesMap) => {
  return createAction(
    CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP,
    categoriesMap
  );
};
