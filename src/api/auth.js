import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginApi = async (credentials) => {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
};

export const signupApi = async (userData) => {
    const { data } = await apiClient.post('/auth/signup', userData);
    return data;
};
