import { createContext, useState, useEffect } from "react";

//helper function to addItemToCart
const addCartItem = (cartItems, productToAdd) => {
  //search array of cartItems and returns item/object that tests true
  const existingCartItem = cartItems.find((item) => {
    return item.id === productToAdd.id;
  });

  //if existingCartItem exists, create new object item-by-item
  //until object includes previous items and new item with quantity+1
  if (existingCartItem) {
    //map returns a array
    return cartItems.map((item) => {
      return item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : { ...item };
    });
  }
  //if existingCartItem doesn't exist, return new object with old cartItems then new product added
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  //recalculating the cartCount every time cartItems changes
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  //adding  values to object to ship with Provider
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
