//hooks/useProducts.js
import { useState, useEffect } from 'react';
import productsData from '../data/products-data';

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filtered = [...productsData];

        // Filter by gender if specified
        if (params.gender) {
          filtered = filtered.filter(p => p.gender === params.gender || p.gender === 'unisex');
        }

        // Filter by new arrival
        if (params.newArrival) {
          // Just taking the first 4 as new arrivals for demo
          filtered = filtered.slice(0, 4);
        }

        setProducts(filtered);
      } catch (err) {
        console.error("Products fetch error:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [JSON.stringify(params)]);

  return {
    products,
    error,
    loading,
    refresh: () => { }
  };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        const found = productsData.find(p => p._id === id);
        if (found) {
          setProduct(found);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Product fetch error:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  return {
    product,
    error,
    loading
  };
};