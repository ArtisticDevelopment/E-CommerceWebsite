import { useState, createContext, useEffect } from "react";
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

export const UserProvider = ({ children }) => {
  //simply create state values and valueFunctions
  const [currentUser, setCurrentUser] = useState(null);
  //put values into a box that can be shipped to children components
  const value = { currentUser, setCurrentUser };

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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
