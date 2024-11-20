/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue';
import signup from '@/views/SignupPage.vue';


const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/signup',
        name: 'Sign Up',
        component: signup
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
