import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MapPage from '../views/MapPage.vue';
//@ts-ignore
import AboutPage from '../views/landingpage/AboutPage.vue';
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
//@ts-ignore
import ReportsPage from '../views/ReportsPage.vue';

//@ts-ignore
import NotFound from '../views/404.vue';
//@ts-ignore
import FriendsPage from '../views/FriendsPage.vue';
//@ts-ignore
import FriendsProfil from '../views/FriendsProfil.vue';
//@ts-ignore
import SignUp from '../views/SignUp.vue';
//@ts-ignore
import SignIn from '../views/SignIn.vue';
//@ts-ignore
import LandingPage from '../views/landingpage/landingPage.vue';

const routes = [
  { path: '/signin', name: 'signin', component: SignIn },
  { path: '/app', name: 'Home', component: HomePage },
  { path: '/map', component: MapPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/account', name: 'Account', component: Account },
  { path: '/activite/add', component: AddActivity },
  { path: '/profil', name : 'Profil', component: ProfilPage },
  { path: '/finder', name: 'Map', component: FindEr },
  { path: '/login', name : 'LoginPage', component: LoginComponent},
  { path: '/loginCompany', name : 'LoginCompany', component: LoginCompany},
  { path: '/chat', name: 'ChatPage', component: ChatPage },
  { path: '/reports', name: 'ReportsPage', component: ReportsPage },
  // 404 page
  { path: '/:catchAll(.*)', name: 'NoFound', component: NotFound },
  { path: '/friends', name: 'FriendsPage', component: FriendsPage },
  { path: '/friendsProfile', name: 'FriendsProfile', component: FriendsProfil },
  { path: '/signup', name: 'SignUpPage', component: SignUp },

  // landing page route
  { path: '/', name: 'LandingPage', component: LandingPage },
  //@ts-ignore
  {path: '/tarif' , name: 'Tarif', component: () => import('../views/landingpage/TarifPage.vue')},
  //@ts-ignore
  {path: '/teams' , name: 'TeamsPage', component: () => import('../views/landingpage/TeamsPage.vue')},
  //@ts-ignore
  {path: '/contact' , name: 'ContactPage', component: () => import('../views/landingpage/ContactPage.vue')},
  //@ts-ignore
  {path: '/service', name: 'ServicePage', component: () => import('../views/landingpage/ServicePage.vue')},
  //@ts-ignore
  {path: '/politique' , name: 'politiquePage', component: () => import('../views/landingpage/PolitiqueConfi.vue')},
  //@ts-ignore
  {path: '/mention' , name: 'MentionPage', component: () => import('../views/landingpage/MentionLegal.vue')},
  //@ts-ignore
  {path: '/cookie' , name: 'CookiePage', component: () => import('../views/landingpage/CookiePage.vue')},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
