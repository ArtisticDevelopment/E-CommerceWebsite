import { createSelector } from "reselect";

//*somehow* just grabs state from INITIAL_STATE
const selectCartReducer = (state) => state.cart;

//MEMOIZED selectors
export const selectCartItems = createSelector([selectCartReducer], (cart) => {
  console.log("Cart items:", cart.cartItems);
  return cart.cartItems;
});

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartReducer],
  (cartItems) =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartReducer],
  (cartItems) =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
);
