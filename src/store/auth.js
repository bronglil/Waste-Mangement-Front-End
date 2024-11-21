//Test case
export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        CLEAR_AUTH(state) {
            state.token = null;
            state.user = null;
        },
    },
    actions: {
        login({ commit }, credentials) {
            return new Promise((resolve, reject) => {
                // Simulate API call
                const dummyUser = {
                    email: 'test@example.com',
                    password: 'password123', // Simulated password
                };
                if (
                    credentials.email === dummyUser.email &&
                    credentials.password === dummyUser.password
                ) {
                    const token = 'dummy-token'; // Simulated token
                    commit('SET_TOKEN', token);
                    commit('SET_USER', { email: dummyUser.email });
                    resolve({ message: 'Login successful!' });
                } else {
                    reject(new Error('Invalid email or password'));
                }
            });
        },
        signup({ commit }, userData) {
            return new Promise((resolve) => {
                // Simulate a successful signup
                const token = 'dummy-token'; // Simulated token
                commit('SET_TOKEN', token);
                commit('SET_USER', { email: userData.email });
                resolve({ message: 'Signup successful!' });
            });
        },
        logout({ commit }) {
            commit('CLEAR_AUTH');
        },
    },
};



// import { loginApi, signupApi } from '../api/auth';

// export default {
//     namespaced: true,
//     state: {
//         token: null,
//         user: null,
//     },
//     getters: {
//         isAuthenticated: (state) => !!state.token,
//     },
//     mutations: {
//         SET_TOKEN(state, token) {
//             state.token = token;
//         },
//         SET_USER(state, user) {
//             state.user = user;
//         },
//         CLEAR_AUTH(state) {
//             state.token = null;
//             state.user = null;
//         },
//     },
//     actions: {
//         async login({ commit }, credentials) {
//             const { token, user } = await loginApi(credentials);
//             commit('SET_TOKEN', token);
//             commit('SET_USER', user);
//         },
//         async signup({ commit }, data) {
//             const { token, user } = await signupApi(data);
//             commit('SET_TOKEN', token);
//             commit('SET_USER', user);
//         },
//         logout({ commit }) {
//             commit('CLEAR_AUTH');
//         },
//     },
// };
