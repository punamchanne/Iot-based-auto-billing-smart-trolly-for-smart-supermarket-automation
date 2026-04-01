import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((x) => x._id === product._id);
      if (exist) {
        return prev.map((x) => (x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x));
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
    // Debounce/Prevent duplicate toast or handle logic separately
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
