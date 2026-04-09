import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const addToken = (config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

export const authApi = axios.create({ baseURL: `${BASE}/api/auth` });
export const toolsApi = axios.create({ baseURL: `${BASE}/api/tools` });

authApi.interceptors.request.use(addToken);
toolsApi.interceptors.request.use(addToken);

export default authApi;