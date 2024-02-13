import { CART_ACTION_TYPES } from "./cart.types";
import createAction from "../../utils/reducer/reducer.utils";

//HELPER FUNCTION to addItemToCart
const addCartItem = (cartItems, productToAdd) => {
  //search array of cartItems id's and returns truthy object value
  const existingCartItem = cartItems.find((item) => {
    return item.id === productToAdd.id;
  });

  //if existingCartItem DOES EXIST, create new object item-by-item
  //until object includes PREVIOUS items and NEW item with quantity+1
  if (existingCartItem) {
    //map returns a array
    return cartItems.map((item) => {
      return item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : { ...item };
    });
  }
  //if existingCartItem DOES NOT exist, return new object with OLD cartItems then NEW product added, simpy quantity 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find((item) => {
    return item.id === productToRemove.id;
  });

  if (existingCartItem) {
    return cartItems.map((item) => {
      return item.id === productToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : { ...item };
    });
  }
};

//returns array choosing only the items that do NOT match the product you are clearing from the cart. If you instead filtered for positive id matches you'd get an array returning your chosen item
const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((item) => item.id !== productToClear.id);
};
export const setIsCartOpen = (boolean) => {
  return createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, boolean);
};
//uses helper function above(line 4) to add item to cart
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

//also uses a helper function(line 24) to remove item from cart
export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

//helper function (line 39) to clear item from cart
export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
