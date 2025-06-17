// src/hooks/useCart.js
import { useState, useEffect } from 'react';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../Api/cartApi';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addItem = async (item) => {
    const response = await addToCart(item);
    setCart((prev) => [...prev, response]);
  };

  const updateItem = async (id, qty) => {
    const response = await updateCartItem(id, { quantity: qty });
    setCart((prev) =>
      prev.map((item) => (item.id === id ? response : item))
    );
  };

  const removeItem = async (id) => {
    await removeFromCart(id);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return { cart, loading, error, refresh: loadCart, addItem, updateItem, removeItem };
};