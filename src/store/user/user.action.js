import { USER_ACTION_TYPES } from "./user.types";
import createAction from "../../utils/reducer/reducer.utils";

//  const setCurrentUser = (user) => {
//   return createAction({
//     return {`${USER_ACTION_TYPES.SET_CURRENT_USER}`,
//     user
// }});

export const setCurrentUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};
