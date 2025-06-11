import { useEffect } from 'react';
import { useApi } from './useApi';
import { fetchProducts, fetchProductById } from '../api';

export const useProducts = (params = {}) => {
  const { data, error, loading, request } = useApi(fetchProducts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await request(params);
      } catch (err) {
        console.error("Products fetch error:", err);
      }
    };
    
    fetchData();
  }, [JSON.stringify(params)]);

  return {
    products: data || [],
    error,
    loading,
    refresh: () => request(params)
  };
};

export const useProduct = (id) => {
  const { data, error, loading, request } = useApi(fetchProductById);

  useEffect(() => {
    if (!id) return;
    
    const fetchData = async () => {
      try {
        await request(id);
      } catch (err) {
        console.error("Product fetch error:", err);
      }
    };
    
    fetchData();
  }, [id]);

  return {
    product: data || null,
    error,
    loading
  };
};