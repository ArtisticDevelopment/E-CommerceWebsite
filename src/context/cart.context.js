// import { createContext, useReducer } from "react";
// import createAction from "../utils/reducer/reducer.utils";

// export const CartContext = createContext({
//   // isCartOpen: false,
//   // setIsCartOpen: () => {},
//   // cartItems: [],
//   // addItemToCart: () => {},
//   // removeItemFromCart: () => {},
//   // clearItemFromCart: () => {},
//   // cartCount: 0,
//   // cartTotal: 0,
// });

// export const CartProvider = ({ children }) => {
//   const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
//     useReducer(cartReducer, INITIAL_STATE);

//   //recalculates cartCount every time cartItems changes
//   // useEffect(() => {
//   //   const newCartCount = cartItems.reduce((total, cartItem) => {
//   //     return total + cartItem.quantity;
//   //   }, 0);
//   //   setCartCount(newCartCount);
//   // }, [cartItems]);

//   // //recalculates cartTotal every time cartItems changes
//   // useEffect(() => {
//   //   const newTotal = cartItems.reduce((total, cartItem) => {
//   //     return total + cartItem.price * cartItem.quantity;
//   //   }, 0);
//   //   setCartTotal(newTotal);
//   // }, [cartItems]);

//   const updateCartItemsReducer = (newCartItems) => {
//     const newCartCount = newCartItems.reduce((total, cartItem) => {
//       return total + cartItem.quantity;
//     }, 0);

//     const newTotal = newCartItems.reduce((total, cartItem) => {
//       return total + cartItem.price * cartItem.quantity;
//     }, 0);

//     dispatch(
//       createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
//         cartItems: newCartItems,
//         cartCount: newCartCount,
//         cartTotal: newTotal,
//       })
//     );
//   };

//   const setIsCartOpen = () => {
//     dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, !isCartOpen));
//   };
//   //adding  values to object to ship with Provider
//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     cartItems,
//     addItemToCart,
//     removeItemFromCart,
//     cartCount,
//     cartTotal,
//     clearItemFromCart,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
