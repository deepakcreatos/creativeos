import axios from 'axios';

let API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Foolproof the URL in case the user forgets https:// or /api
if (API_BASE_URL && !API_BASE_URL.startsWith('http') && API_BASE_URL !== 'http://localhost:4000/api') {
    API_BASE_URL = 'https://' + API_BASE_URL;
}
if (API_BASE_URL && !API_BASE_URL.endsWith('/api') && API_BASE_URL !== 'http://localhost:4000/api') {
    API_BASE_URL = API_BASE_URL + '/api';
}

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

};

// Auth API
export const authApi = {
  login: async (credentials: any) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.warn('Backend Login Failed, falling back to mock auth:', error);
      // Graceful fallback for Vercel without backend
      return {
        access_token: 'mock-jwt-token-fallback',
        user: {
            id: 'mock-user-' + Date.now(),
            email: credentials.email || 'demo@creativeos.ai',
            name: credentials.email ? credentials.email.split('@')[0] : 'Demo User',
            role: 'user',
        },
      };
    }
  },

  register: async (data: any) => {
    try {
      const response = await apiClient.post('/auth/register', data);
      return response.data;
    } catch (error) {
       console.warn('Backend Register Failed, falling back to mock auth:', error);
       // Graceful fallback for Vercel without backend
       return {
            access_token: 'mock-jwt-token-new-' + Date.now(),
            user: {
                id: 'new-user-' + Date.now(),
                email: data.email || 'demo@creativeos.ai',
                name: data.name || 'Demo User',
                role: 'user'
            }
        };
    }
  }
};

// Node 3: Content API
export const contentApi = {
  generate: async (data: any) => {
    const response = await apiClient.post('/content/generate', data);
    return response.data;
  }
};

// Node 4: Media API
export const mediaApi = {
  generate: async (data: any) => {
    const response = await apiClient.post('/media/generate', data);
    return response.data;
  }
};

// Node 5: Revision API
export const revisionApi = {
  process: async (data: any) => {
    const response = await apiClient.post('/revision/process', data);
    return response.data;
  }
};

// Node 6: Approval API
export const approvalApi = {
  request: async (data: any) => {
    const response = await apiClient.post('/approval/request', data);
    return response.data;
  }
};

// Node 9: Billing API
export const billingApi = {
  invoice: async (data: any) => {
    const response = await apiClient.post('/billing/invoice', data);
    return response.data;
  }
};

// Node 10: Voice API
export const voiceApi = {
  command: async (data: { command: string }) => {
    const response = await apiClient.post('/voice/command', data);
    return response.data;
  }
};

// Node 11: Knowledge Graph API
export const knowledgeApi = {
  query: async () => {
    // Stub definition mimicking graph nodes
    return { nodes: [], edges: [] };
  }
};

// Node 12: Audit API
export const auditApi = {
  getLogs: async () => {
    // Stub
    return [];
  }
};