import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    const stored = localStorage.setItem("cart", JSON.stringify(cartItems));
      console.log( Array.isArray(stored) ? stored : []);
  }, [cartItems]);

  function isInCart(id) {
    return cartItems.some((i) => i.id == id);
  }

  function addToCart(item,size,quantity) {
    if(isInCart(item.id)){
        updateQuantity(item.id,quantity,size)
        return
      }
      const product = { 
      ...item,
      selected : [{size : size, quantity : quantity}]
    }
    setCartItems(prev => [...prev,product]);
    }
function removeFromCart(id, size) {
  setCartItems((prevCart) => {
    return prevCart.flatMap((item) => {
      if (item.id !== id) return item;

      const updatedSelected = item.selected.filter((s) => s.size !== size);

      if (updatedSelected.length === 0) {
        return [];
      }

      return { ...item, selected: updatedSelected };
    });
  });
}
function updateQuantity(id, quantity, size) {
  if (isInCart(id)) {
    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        const existingSize = item.selected.find((s) => s.size === size);
        let newSelected;
        if (existingSize) {
          newSelected = item.selected.map((s) =>
            s.size === size ? { ...s, quantity } : s
          );
        } else {
          newSelected = [...item.selected, { size, quantity }];
        }
        return { ...item, selected: newSelected };
      }
      return item;
    });
    setCartItems(newCart);
  }
}

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };
const totalItems = cartItems.reduce((sum, item) => {
  return sum + item.selected.reduce((s, sel) => s + sel.quantity, 0);
}, 0);

const totalPrice = cartItems.reduce((sum, item) => {
  return sum + item.selected.reduce((s, sel) => s + (parseFloat(item.price) * sel.quantity), 0);
}, 0);

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
