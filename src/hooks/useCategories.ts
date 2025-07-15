import { useState, useEffect } from 'react';
import { categoriesAPI } from '../services/api';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color_class: string;
  product_count: number;
  subcategories: Category[];
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoriesAPI.getTree();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar las categorías');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const usePopularCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularCategories = async () => {
      try {
        setLoading(true);
        const data = await categoriesAPI.getPopular();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar las categorías populares');
        console.error('Error fetching popular categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCategories();
  }, []);

  return { categories, loading, error };
};