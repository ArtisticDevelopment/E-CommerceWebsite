// import { createContext, useEffect, useReducer } from "react";
// import createAction from "../utils/reducer/reducer.utils";

// //as the actual value you want to access
// export const UserContext = createContext({
//   currentUser: null,
//   setCurrentUser: () => null,
// // });

// export const UserProvider = ({ children }) => {
//   //simply create state values and valueFunctions
//   // const [currentUser, setCurrentUser] = useState(null); <-- commented out after Redux implementation

//   //change local state.user with dispatch

//   //make sure the auth user is signed out, else auth may find local history
//   // signOutUser();

//   //put values into a box that can be shipped to children components
//   // const value = { currentUser, setCurrentUser };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };
