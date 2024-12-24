import { loginApi } from '../api/auth';

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('auth_token') || null,
        user: (() => {
            try {
                const user = localStorage.getItem('auth_user');
                return user ? JSON.parse(user) : null;
            } catch (error) {
                console.error('Failed to parse auth_user:', error);
                return null;
            }
        })(),
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        userFullName: (state) => (state.user ? `${state.user.firstName} ${state.user.lastName}` : null),
        userRole: (state) => state.user?.userRole || null,
        userEmail: (state) => state.user?.email || null,
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
                const response = await loginApi(credentials);
                const { token, ...userDetails } = response; // Destructure token and user details

                // Store the token and user in the Vuex state
                commit('SET_TOKEN', token);
                commit('SET_USER', userDetails);

                return { token, user: userDetails };
            } catch (error) {
                throw new Error('Login failed: ' + error.message);
            }
        },
        logout({ commit }) {
            commit('CLEAR_AUTH');
        },
    },
};
