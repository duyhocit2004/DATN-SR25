import React, { createContext, useState, useContext } from "react";
import { addToCart } from "../service/cart/cartService";


interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addProductToCart: (productId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addProductToCart = async (productId: string, quantity: number) => {
    try {
      await addToCart(productId, quantity);
      setCart((prev) => [...prev, { productId, quantity }]);
    } catch (error) {
      console.error("Failed to add product to cart", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};