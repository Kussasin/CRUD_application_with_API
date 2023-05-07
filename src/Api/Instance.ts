import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
    const token = getToken('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

interface User {
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    user_password: string;
    user_password_repeat: string;
}

interface LoginRequest {
    user_email: string;
    user_password: string;
}

interface LoginResponse {
    result: {
        access_token: string,
        token_type: string,
    }
}
const getToken = (tokenKey: string) => {
    return localStorage.getItem(tokenKey);
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

const loginUser = (loginRequest: LoginRequest) => {
    return instance.post<LoginResponse>('/auth/login/', loginRequest);
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
    updateAuthorizationHeader,
};

export default api;
