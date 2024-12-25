import apiClient from './http';

export const loginApi = async (credentials) => {
    if (!credentials.email || !credentials.password) {
        throw new Error("Email and password are required.");
    }
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
};

export const signupApi = async (userData) => {
    if (!userData.email || !userData.password) {
        throw new Error("Email and password are required.");
    }
    const { data } = await apiClient.post('/auth/signup', userData);
    return data;
};
