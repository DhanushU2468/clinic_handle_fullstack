const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  baseURL: API_BASE_URL,
  endpoints: {
    auth: `${API_BASE_URL}/auth`,
    users: `${API_BASE_URL}/users`,
    doctors: `${API_BASE_URL}/doctors`,
    patients: `${API_BASE_URL}/patients`,
    appointments: `${API_BASE_URL}/appointments`,
    queue: `${API_BASE_URL}/queue`,
  }
};

// Helper function for API calls
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
  }

  const response = await fetch(url, defaultOptions);
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}; 