import axios from 'axios';

export const API_BASE_URL = "http://localhost:5000/api";

export const API_ENDPOINTS = {
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  SIGNIN: `${API_BASE_URL}/auth/signin`,
  // Add other endpoints as needed
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api; 