import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  original_price?: number;
  discount_percentage: number;
  primary_image: string;
  free_shipping: boolean;
  average_rating: number;
  review_count: number;
  category_name: string;
  seller_name: string;
  condition: string;
  stock: number;
  featured: boolean;
}

interface ProductFilters {
  category?: string;
  min_price?: number;
  max_price?: number;
  condition?: string;
  free_shipping?: boolean;
  search?: string;
  ordering?: string;
}

export const useProducts = (filters: ProductFilters = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
          }
        });

        const data = await productsAPI.getAll(params);
        setProducts(data.results || data);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar los productos';
        setError(errorMessage);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { products, loading, error };
};

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const data = await productsAPI.getFeatured();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos destacados');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return { products, loading, error };
};

export const useProductsByCategory = (categorySlug: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categorySlug) return;

    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const data = await productsAPI.getByCategory(categorySlug);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos de la categoría');
        console.error('Error fetching products by category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categorySlug]);

  return { products, loading, error };
};