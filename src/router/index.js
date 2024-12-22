/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginPage.vue';
import Signup from '../views/SignupPage.vue';
import Dashboard from '../views/DashboardPage.vue';
import store from '../store';
import Settings from '../views/SettingsPage.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import LocationPage from '../views/LocationPage.vue';
import DriversPage from '../views/DriversPage.vue';
import BinPage from '../views/BinPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        beforeEnter: (to, from, next) => {
            // const isAuthenticated = store.state.auth.token !== null;
            // if (isAuthenticated) {
            next('/dashboard');
            // } else {
            //     next('/login');
            // }
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false },
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: { requiresAuth: false },
    },
    {
        path: '/dashboard',
        component: AuthLayout,
        meta: { requiresAuth: false },
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: Dashboard,
            },
            {
                path: 'settings',
                name: 'Settings',
                component: Settings,
            },
            {
                path: '/location',
                name: 'Location',
                component: LocationPage,
            },
            {
                path: '/drivers',
                name: 'Drivers',
                component: DriversPage,
            },
            {
                path: '/vehicles',
                name: 'Vehicles',
                component: DriversPage,
            },
            {
                path: '/notifications',
                name: 'Notifications',
                component: DriversPage,
            },
            {
                path: '/bins',
                name: 'Bins',
                component: BinPage,
            },
        ],
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.auth.token !== null;
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (!to.meta.requiresAuth && isAuthenticated) {
        next('/dashboard');
    } else {
        next();
    }
});

export default router;
