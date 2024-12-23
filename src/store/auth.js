import { loginApi } from '../api/auth';

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('auth_token') || null,
        user: JSON.parse(localStorage.getItem('auth_user')) || null,
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('auth_token', token);
        },
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem('auth_user', JSON.stringify(user));
        },
        CLEAR_AUTH(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
        },
    },
    actions: {
        async login({ commit }, { credentials, source }) {
            console.log(`Login called from: ${source}`);
            try {
                const { token, user } = await loginApi(credentials);
                commit('SET_TOKEN', token);
                commit('SET_USER', user);
                return { token, user };
            } catch (error) {
                throw new Error('Login failed: ' + error.message);
            }
        },
        logout({ commit }) {
            commit('CLEAR_AUTH');
        },
    },
};