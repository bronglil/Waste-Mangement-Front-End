import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Icon } from '@iconify/vue';
import './assets/style.css';
import "./assets/tailwind.css";

const app = createApp(App);
// eslint-disable-next-line
app.component('Icon', Icon);

app.use(router);
app.use(store);

app.mount('#app');
