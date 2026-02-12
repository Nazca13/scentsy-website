// src/hooks/useCart.js
import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCart = () => {
    try {
      setLoading(true);
      const savedCart = localStorage.getItem('cart');
      setCart(savedCart ? JSON.parse(savedCart) : []);
      setError(null);
    } catch (err) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addItem = async (product) => {
    const newItem = {
      id: Date.now(), // Generate temp ID
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      volume: product.volume,
      selected: true
    };
    saveCart([...cart, newItem]);
  };

  const updateItem = async (id, qty) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    saveCart(newCart);
  };

  const removeItem = async (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    saveCart(newCart);
  };

  return { cart, loading, error, refresh: loadCart, addItem, updateItem, removeItem };
};