/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginPage.vue';
import Signup from '../views/SignupPage.vue';
import DashboardOverview from '../views/DashboardPage.vue';
import store from '../store';
import AuthLayout from '../layouts/AuthLayout.vue';
import LocationPage from '../views/LocationPage.vue';
import DriversPage from '../views/DriversPage.vue';
import BinPage from '../views/BinPage.vue';
import VehiclesPage from '../views/VehiclesPage.vue';
import SettingsPage from '../views/SettingsPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        beforeEnter: (to, from, next) => {
            const isAuthenticated = store.getters['auth/isAuthenticated'];
            if (isAuthenticated) {
                next('/dashboard');
            } else {
                next('/login');
            }
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
        path: '/',
        component: AuthLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: DashboardOverview,
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
                component: VehiclesPage,
            },
            {
                path: '/bins',
                name: 'Bins',
                component: BinPage,
            },
            {
                path: '/settings',
                name: 'AccountSettings',
                component: SettingsPage,
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
    const isAuthenticated = store.getters['auth/isAuthenticated'];

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login'); // Redirect to login if accessing protected routes
    } else if (to.path === '/login' && isAuthenticated) {
        next('/dashboard'); // Redirect to dashboard if already logged in
    } else {
        next();
    }
});

export default router;