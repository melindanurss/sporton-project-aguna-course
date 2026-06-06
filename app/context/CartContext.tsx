"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  imgUrl: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: CartItem, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const initialCart: CartItem[] = [
  {
    id: 3,
    name: "SportOn HyperSoccer v2",
    category: "Football",
    price: 458000,
    imgUrl: "football-shoes (1).png",
    qty: 2,
  },
  {
    id: 5,
    name: "SportOn Hypershirt Black",
    category: "Running",
    price: 119000,
    imgUrl: "sportshirt black.png",
    qty: 1,
  },
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("sporton-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart(initialCart);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("sporton-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: CartItem, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, qty: quantity }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, qty: 1 } : item
        )
      );
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);
  const getCartCount = () => cart.reduce((total, item) => total + item.qty, 0);
  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartCount, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};