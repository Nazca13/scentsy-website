// src/hooks/useProducts.js
import { useState, useEffect } from "react";
import { fetchProducts } from "../api";

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchProducts(params);
        setProducts(response.data?.products || []);
      } catch (err) {
        setError(err.message || "Failed load product");
        console.error("Failed get product:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [params]);

  return { products, loading, error };
};