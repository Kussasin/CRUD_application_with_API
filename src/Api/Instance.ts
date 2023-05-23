import axios, { AxiosInstance } from 'axios';
import { CreateCompanyRequest, LoginRequest, LoginResponse, UpdateCompanyInfo, UpdatePasswordData, UpdateUserInfoData, User } from '../Types/Types';
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

const getUserById = (id: string) => {
    return instance.get(`/user/${id}`);
}

const getCompanies = () => {
    return instance.get('/companies/');
};

const getCompanyById = (id: string) => {
    return instance.get(`/company/${id}`);
};

const createUser = async (user: User) => {
    return await instance.post('/user/', user);
};

const deleteUser = (id: string) => {
    return instance.delete(`/user/${id}/`);
};

const updateUserInfo = (id: string, data: UpdateUserInfoData) => {
    return instance.put(`/user/${id}/update_info/`, data);
};

const updateUserAvatar = (id: string, data: File) => {
    const formData = new FormData();
    formData.append('file', data);

    return instance.put(`/user/${id}/update_avatar/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const updateUserPassword = (id: string, data: UpdatePasswordData) => {
    return instance.put(`/user/${id}/update_password/`, data);
};

const loginUser = async (loginRequest: LoginRequest) => {
    const response = await instance.post<LoginResponse>('/auth/login/', loginRequest);
    updateAuthorizationHeader(response.data.result.access_token);
    return response;
};

const createCompany = async (companyData: CreateCompanyRequest) => {
    return await instance.post('/company/', companyData);
}

const deleteCompany = (id: string) => {
    return instance.delete(`/company/${id}/`);
};

const updateCompanyAvatar = (id: string, data: File) => {
    const formData = new FormData();
    formData.append('file', data);

    return instance.put(`/company/${id}/update_avatar/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const updateCompanyInfo = (id: string, data: UpdateCompanyInfo) => {
    return instance.put(`/company/${id}/update_info/`, data);
};

const updateCompanyVisible = (id: string, data: boolean) => {
    return instance.put(`/company/${id}/update_visible/`, data);
};

const getProfile = () => {
    return instance.get('/auth/me/');
};

const api = {
    checkStatus,
    getUsers,
    getUserById,
    getCompanies,
    getCompanyById,
    createUser,
    loginUser,
    getProfile,
    deleteUser,
    updateUserInfo,
    updateUserAvatar,
    updateUserPassword,
    createCompany,
    deleteCompany,
    updateCompanyAvatar,
    updateCompanyInfo,
    updateCompanyVisible,
};

export default api;

