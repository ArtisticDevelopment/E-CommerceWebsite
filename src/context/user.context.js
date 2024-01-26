import { useState, createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  console.log("Dispatched");
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
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

//Redux initial state
const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  //simply create state values and valueFunctions
  // const [currentUser, setCurrentUser] = useState(null); <-- commented out after Redux implementation

  //destructuring currentUser directly from INTIAL_STATE to have our local-state
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);

  //cool, we got local state, now we have to be able to change that state with dispatch
  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  //make sure the auth user is signed out, else auth may find local history
  // signOutUser();

  //the callback function is what executes when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  //put values into a box that can be shipped to children components
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
