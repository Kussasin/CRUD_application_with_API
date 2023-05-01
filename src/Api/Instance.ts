import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://3.75.186.163/'
});

const checkStatus = () => {
    return instance.get('/');
};

const api = {
    checkStatus,
};

export default api;