const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Configuración base para fetch
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('access_token');
  
  const config: RequestInit = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to server. Please ensure the backend is running on http://localhost:8000');
    }
    throw error;
  }
};

// Servicios de autenticación
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
  }) =>
    apiRequest('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  refreshToken: (refresh: string) =>
    apiRequest('/auth/token/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh }),
    }),
};

// Servicios de categorías
export const categoriesAPI = {
  getAll: () => apiRequest('/categories/'),
  getTree: () => apiRequest('/categories/tree/'),
  getPopular: () => apiRequest('/categories/popular/'),
  getBySlug: (slug: string) => apiRequest(`/categories/${slug}/`),
};

// Servicios de productos
export const productsAPI = {
  getAll: (params?: URLSearchParams) => {
    const query = params ? `?${params.toString()}` : '';
    return apiRequest(`/products/${query}`);
  },
  
  getById: (slug: string) => apiRequest(`/products/${slug}/`),
  
  getFeatured: () => apiRequest('/products/featured/'),
  
  getByCategory: (categorySlug: string) => 
    apiRequest(`/products/category/${categorySlug}/`),
  
  search: (query: string) => 
    apiRequest(`/products/search/?q=${encodeURIComponent(query)}`),
  
  create: (productData: any) =>
    apiRequest('/products/create/', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),
};

// Servicios de carrito y órdenes
export const ordersAPI = {
  getCart: () => apiRequest('/orders/cart/'),
  
  addToCart: (productId: number, quantity: number = 1) =>
    apiRequest('/orders/cart/add/', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity }),
    }),
  
  updateCartItem: (itemId: number, quantity: number) =>
    apiRequest(`/orders/cart/items/${itemId}/`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),
  
  removeFromCart: (itemId: number) =>
    apiRequest(`/orders/cart/items/${itemId}/remove/`, {
      method: 'DELETE',
    }),
  
  createOrder: (orderData: any) =>
    apiRequest('/orders/create/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  
  getOrders: () => apiRequest('/orders/'),
  
  getOrderById: (id: number) => apiRequest(`/orders/${id}/`),
};

export default {
  auth: authAPI,
  categories: categoriesAPI,
  products: productsAPI,
  orders: ordersAPI,
};