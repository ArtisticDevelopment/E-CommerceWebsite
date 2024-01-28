import { createContext, useReducer } from "react";
import createAction from "../utils/reducer/reducer.utils";

//helper function to addItemToCart
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

export const CartContext = createContext({
  // isCartOpen: false,
  // setIsCartOpen: () => {},
  // cartItems: [],
  // addItemToCart: () => {},
  // removeItemFromCart: () => {},
  // clearItemFromCart: () => {},
  // cartCount: 0,
  // cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_CART_OPEN: "TOGGLE_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`invalid type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  //recalculates cartCount every time cartItems changes
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce((total, cartItem) => {
  //     return total + cartItem.quantity;
  //   }, 0);
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // //recalculates cartTotal every time cartItems changes
  // useEffect(() => {
  //   const newTotal = cartItems.reduce((total, cartItem) => {
  //     return total + cartItem.price * cartItem.quantity;
  //   }, 0);
  //   setCartTotal(newTotal);
  // }, [cartItems]);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    const newTotal = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newTotal,
      })
    );
  };

  //uses helper function above(line 4) to add item to cart
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  //also uses a helper function(line 24) to remove item from cart
  const removeItemFromCart = (productToRemove) => {
    if (productToRemove.quantity === 0) {
      return;
    } else {
      const newCartItems = removeCartItem(cartItems, productToRemove);
      updateCartItemsReducer(newCartItems);
    }
  };

  //helper function (line 38) to clear item from cart
  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, !isCartOpen));
  };
  //adding  values to object to ship with Provider
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    cartCount,
    cartTotal,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
