import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import MapPage from '../views/MapPage.vue';
import AboutPage from '../views/AboutPage.vue';
import Account from '../views/Account.vue';
import AddActivity from '../views/AddActivity.vue';
import ProfilPage from '../views/ProfilPage.vue';
import LoginCompany from '../components/LoginCompany.vue';
import LoginComponent from '../components/LoginComponent.vue';
import FindEr from '../views/FindEr.vue';
const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/profile', name: 'Profile', component: ProfilePage },
    { path: '/map', name: 'Map', component: MapPage },
    { path: '/about', name: 'About', component: AboutPage },
    { path: '/account', name: 'Account', component: Account },
    { path: '/activite/add', component: AddActivity },
    { path: '/profil', component: ProfilPage },
    { path: '/finder', component: FindEr },
    { path: '/login', name: 'LoginPage', component: LoginComponent },
    { path: '/loginCompany', name: 'LoginCompany', component: LoginCompany },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
