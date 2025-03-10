import React, { createContext, useState, useContext, useEffect } from "react";
import apiClient from "../services/apiClient";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const initializeCart = async () => {
      const storedCart = localStorage.getItem("cartItems");

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCartItems(parsedCart);
        } else {
          setCartItems([]); 
        }
      } else {
        try {
          const { data } = await apiClient.get("/user/getcart");

          if (data.cart.items && Array.isArray(data.cart.items)) {
            setCartItems(data.cart.items);
            localStorage.setItem("cartItems", JSON.stringify(data.cart.items)); 
          } else {
            setCartItems([]);
            localStorage.setItem("cartItems", JSON.stringify([]));
          }
        } catch (error) {
          console.error("Error fetching cart from backend:", error);
          setCartItems([]);
          localStorage.setItem("cartItems", JSON.stringify([]));
        }
      }
    };

    initializeCart();
  }, []);

  // Add item to cart
  const addToCart = async (item) => {
    try {
      const response = await apiClient.post(`/user/addtocart/${item._id}`, {
        item,
      });

      if (response.status === 200) {
        const updatedCart = [...cartItems];
        const existingItem = updatedCart.find(
          (cartItem) => cartItem.itemId === item._id
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          updatedCart.push({
            itemId: item._id,
            name: item.name,
            quantity: 1,
            sellingPrice: item.sellingPrice,
            image: item.images[0],
          });
        }

        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error("Error adding item to backend cart:", error);
    }
  };

  // Update item quantity
  const updateQuantity = async (id, newQuantity) => {
    try {
      const response = await apiClient.put(`/user/updatecart/${id}`, {
        quantity: newQuantity,
      });

      if (response.status === 200) {
        const updatedCart = cartItems.map((item) =>
          item.itemId === id
            ? { ...item, quantity: Math.max(1, newQuantity) }
            : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error("Error updating item quantity on the backend:", error);
    }
  };

  // Remove item from cart
  const removeItem = async (id) => {
    try {
      const response = await apiClient.delete(`/user/deletefromcart/${id}`);

      if (response.status === 200) {
        const updatedCart = cartItems.filter((item) => item.itemId !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error("Error removing item from backend cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, updateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
