import apiClient from './http';

export const loginApi = async (credentials) => {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
};

export const signupApi = async (userData) => {
    const { data } = await apiClient.post('/auth/signup', userData);
    return data;
};
