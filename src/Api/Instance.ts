import { User } from '@auth0/auth0-react';
import axios, { AxiosInstance } from 'axios';
import { LoginRequest, LoginResponse } from '../Types/Types';
import { RootState, store } from '../Store/CounterStore';

const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  
  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const getToken = () => {
    const state: RootState = store.getState();   
     return state.token.token?.access_token;
  };

const updateAuthorizationHeader = (token: string) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const checkStatus = () => {
    return instance.get('/');
};

const getUsers = () => {
    return instance.get('/users/');
};

const getCompanies = () => {
    return instance.get('/companies/');
};

const createUser = (user: User) => {
    return instance.post('/user/', user);
};

const loginUser = async (loginRequest: LoginRequest) => {
    const response = await instance.post<LoginResponse>('/auth/login/', loginRequest);
    updateAuthorizationHeader(response.data.result.access_token);
    return response;
};

const getProfile = () => {
    return instance.get('/auth/me/');
};

const api = {
    checkStatus,
    getUsers,
    getCompanies,
    createUser,
    loginUser,
    getProfile,
};

export default api;

