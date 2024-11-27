import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Import Pinia
import './style.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// Create and use Pinia instance
const pinia = createPinia(); // Initialize Pinia
app.use(pinia);              // Register Pinia with the app

// Use Vue Router
app.use(router);

// Mount the app
app.mount('#app');
