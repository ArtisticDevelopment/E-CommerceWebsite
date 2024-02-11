import { USER_ACTION_TYPES } from "./user.types";

//Redux initial state
const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  //type is simply a type while payload is the data/info
  const { type, payload } = action;

  //find type of action and return object
  //containing previous values and changed values in payload
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      return state;
  }
};
