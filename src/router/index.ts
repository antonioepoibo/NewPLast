import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MapPage from '../views/MapPage.vue';
//@ts-ignore
import AboutPage from '../views/AboutPage.vue';
//@ts-ignore
import Account from '../views/Account.vue';
//@ts-ignore
import AddActivity from '../views/AddActivity.vue';
//@ts-ignore
import ProfilPage from '../views/ProfilPage.vue';
//@ts-ignore
import LoginCompany from '../components/LoginCompany.vue';
//@ts-ignore
import LoginComponent from '../components/LoginComponent.vue';
//@ts-ignore
import FindEr from '../views/FindEr.vue';
//@ts-ignore
import ChatPage from '../views/ChatPage.vue';


const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/map', name: 'Map', component: MapPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/account', name: 'Account', component: Account },
  { path: '/activite/add', component: AddActivity },
  { path: '/profil', component: ProfilPage },
  { path: '/finder', component: FindEr },
  { path: '/login', name: 'LoginPage', component: LoginComponent },
  { path: '/loginCompany', name: 'LoginCompany', component: LoginCompany },
  { path: '/chat', name: 'ChatPage', component: ChatPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
