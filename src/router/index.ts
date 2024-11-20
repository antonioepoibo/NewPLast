// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../components/Auth.vue';
import Account from '../components/Account.vue';
import Account_company from '../components/Account_company.vue';
import HomePage from '../views/HomePage.vue';
import Redirect from '../components/Redirect.vue';
import { supabase } from '../supabase';

const routes = [
  { path: '/auth', component: Auth },
  { path: '/account', component: Account, meta: { requiresAuth: true } },
  { path: '/HomePage', component: HomePage },
  { path: '/redirect', component: Redirect },
  { path: '/account_company', component: Account_company, meta: { requiresAuth: true } },
  { path: '/', redirect: '/auth' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession();

  if (to.meta.requiresAuth && !session) {
    next('/auth'); // Redirige vers /auth pour les utilisateurs non connectés
  } 
  else if (session && to.path === '/auth') {
    next('/HomePage'); // Redirige les utilisateurs connectés vers HomePage
  } 
  else {
    next(); // Autorise la navigation pour toutes les autres routes
  }
});

export default router;
