import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.example.com',
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
