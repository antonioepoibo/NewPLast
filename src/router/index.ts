import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import MapPage from '../views/MapPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  { path: '/map', name: 'Map', component: MapPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
