import React, { createContext, useState, useEffect } from "react";
import { postRequest } from "../api/basic";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const storedOrderId = localStorage.getItem("order_id");
    if (storedOrderId) {
      setOrderId(storedOrderId);
    }
  }, []);

  const addToCart = async (item, quantity) => {
    try {
      const response = await postRequest("/api/v1/orders/add_item", {
        item_id: item.id,
        quantity: quantity,
        order_id: orderId,
      });

      localStorage.setItem("order_id", response?.data?.order_item?.order_id);
      setOrderId(response?.data?.order_item?.order_id);

      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem.id === item.id
        );
        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          );
        }
        return [...prevCart, { ...item, quantity: quantity }];
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  };

  const removeFromCart = async (item, quantity) => {
    try {
      await postRequest("/api/v1/orders/add_item", {
        item_id: item.id,
        quantity: -quantity,
        order_id: orderId,
      });

      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem.id === item.id
        );
        if (existingItem.quantity <= quantity) {
          return prevCart.filter((cartItem) => cartItem.id !== item.id);
        }
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - quantity }
            : cartItem
        );
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
