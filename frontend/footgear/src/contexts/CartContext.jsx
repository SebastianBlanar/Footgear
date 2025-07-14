import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function isInCart(id) {
    return cartItems.some((i) => i.id == id);
  }
  function getQuantity(id){
    return cartItems.find(item => item.id == id).quantity
  }
  function addToCart(item) {
    if (isInCart(item.id)) {
      const newQuantity = getQuantity(item.id) + 1
      updateQuantity(item.id,newQuantity)
    }
      else setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  function removeFromCart(id) {
    setCartItems(cartItems.filter((i) => i.id != id));
  }
  function updateQuantity(id, quantity) {
    if (isInCart(id))
      setCartItems(
        cartItems.map((i) => i.id == id ? { ...i, quantity: quantity } : i)
      );
  }
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum,item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
