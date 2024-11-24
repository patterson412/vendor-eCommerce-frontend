import axios from "axios";

// Base axios instance with shared configuration
const api = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true
});

const handleApiError = (error) => {
    if (axios.isAxiosError(error)) {
        console.log('API Error:', error.response?.status, error.message);
    } else {
        console.log('Unexpected error:', error);
    }
    return null;
};

export const getUser = async () => {
    try {
        const response = await api.get('/api/user/me');
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getAllProducts = async () => {
    try {
        const response = await api.get('/api/products');
        return response.data;
    } catch (error) {
        return handleApiError(error) ?? [];
    }
};

export const getProductById = async (id) => {
    try {
        const response = await api.get(`/api/products/${id}`);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const createProduct = async (formData) => {
    try {
        const response = await api.post('/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const updateProduct = async (id, formData) => {
    try {
        const response = await api.put(`/api/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/api/products/${id}`);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getFavoriteProducts = async () => {
    try {
        const response = await api.get('/api/products/favourites');
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const addToFavorites = async (productId) => {
    try {
        const response = await api.post(`/api/products/favorites/${productId}`);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const toggleFavorite = async (productId) => {
    try {
        const response = await api.post(`/api/products/favourites/toggle/${productId}`);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const login = async (email, password) => {
    try {
        const response = await api.post('/api/auth/login', { email, password });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/api/auth/logout');
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};