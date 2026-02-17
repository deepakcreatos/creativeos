import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

console.log('🔗 API Base URL:', API_BASE_URL); // Debug log

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

// DNA API
export const dnaApi = {
  create: async (data: any) => {
    try {
      const response = await apiClient.post('/dna', data);
      return response.data;
    } catch (error) {
      console.error('Create DNA Error:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await apiClient.get('/dna');
      return response.data;
    } catch (error) {
      console.error('Get All DNA Error:', error);
      throw error;
    }
  },

  getOne: async (id: string) => {
    try {
      const response = await apiClient.get(`/dna/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get One DNA Error:', error);
      throw error;
    }
  },

  update: async (id: string, data: any) => {
    try {
      const response = await apiClient.patch(`/dna/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update DNA Error:', error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/dna/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete DNA Error:', error);
      throw error;
    }
  },
};

// Campaign API
export const campaignApi = {
  create: async (data: any) => {
    try {
      const response = await apiClient.post('/campaigns', data);
      return response.data;
    } catch (error) {
      console.error('Create Campaign Error:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await apiClient.get('/campaigns');
      return response.data;
    } catch (error) {
      console.error('Get All Campaigns Error:', error);
      throw error;
    }
  },

  getOne: async (id: string) => {
    try {
      const response = await apiClient.get(`/campaigns/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get One Campaign Error:', error);
      throw error;
    }
  },

  getByClientDna: async (clientDnaId: string) => {
    try {
      const response = await apiClient.get(`/campaigns/client/${clientDnaId}`);
      return response.data;
    } catch (error) {
      console.error('Get Campaigns by Client DNA Error:', error);
      throw error;
    }
  },

  update: async (id: string, data: any) => {
    try {
      const response = await apiClient.patch(`/campaigns/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update Campaign Error:', error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/campaigns/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete Campaign Error:', error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/campaigns/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete Campaign Error:', error);
      throw error;
    }
  },
};

// Auth API
export const authApi = {
  login: async (credentials: any) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  },

  register: async (data: any) => {
    try {
      const response = await apiClient.post('/auth/register', data);
      return response.data;
    } catch (error) {
      console.error('Register Error:', error);
      throw error;
    }
  }
};