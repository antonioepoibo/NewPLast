import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginCompany from '../components/LoginCompany.vue';
import LoginComponent from '../components/LoginComponent.vue';
import ProfilePage from '../views/ProfilePage.vue';
import MapPage from '../views/MapPage.vue';
import AboutPage from '../views/AboutPage.vue';
import Account from '../views/Account.vue';
import LoginPage from '../views/LoginPage.vue';
import { Component } from '@fullcalendar/core/preact';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  { path: '/map', name: 'Map', component: MapPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/account', name: 'Account', component: Account },
  { path: '/login', name: 'Login', component: LoginPage},
  { path: '/loginCompany', name: 'LoginCompany', component: LoginCompany},
  { path: '/loginComponent', name: 'LoginComponent', component: LoginComponent},

  

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
