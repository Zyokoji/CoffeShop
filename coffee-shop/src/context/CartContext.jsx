import { createContext, useContext, useMemo, useState } from "react";
import {
  addItem,
  cartCount,
  cartTotal,
  removeItem,
  setQuantity,
} from "../lib/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const value = useMemo(
    () => ({
      cart,
      count: cartCount(cart),
      total: cartTotal(cart),
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      add: (item) => {
        setCart((current) => addItem(current, item));
        setDrawerOpen(true);
      },
      remove: (id) => setCart((current) => removeItem(current, id)),
      updateQuantity: (id, quantity) =>
        setCart((current) => setQuantity(current, id, quantity)),
      clear: () => setCart([]),
    }),
    [cart, drawerOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
