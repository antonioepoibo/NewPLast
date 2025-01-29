import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MapPage from '../views/MapPage.vue';
import AboutPage from '../views/landingpage/AboutPage.vue';
import Account from '../views/Account.vue';
import AddActivity from '../views/AddActivity.vue';
import ProfilPage from '../views/ProfilPage.vue';
import LoginCompany from '../components/LoginCompany.vue';
import LoginComponent from '../components/LoginComponent.vue';
import FindEr from '../views/FindEr.vue';
import ChatPage from '../views/ChatPage.vue';
//@ts-ignore
// import ReportsPage from '../views/ReportsPage.vue';
//@ts-ignore
import NotFound from '../views/404.vue';
import FriendsPage from '../views/FriendsPage.vue';
import FriendsProfil from '../views/FriendsProfil.vue';
import SignUp from '../views/SignUp.vue';
import SignIn from '../views/SignIn.vue';
import LandingPage from '../views/landingpage/landingPage.vue';


const routes = [
    { path: '/signin', name: 'signin', component: SignIn },
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
    { path: '/reports', name: 'ReportsPage', component: ReportsPage },
    { path: '/:catchAll(.*)', name: 'NoFound', component: NotFound },
    { path: '/friends', name: 'FriendsPage', component: FriendsPage },
    { path: '/friendsProfile', name: 'FriendsProfile', component: FriendsProfil },
    { path: '/signup', name: 'SignUpPage', component: SignUp },

    // landing page route
    { path: '/landing', name: 'LandingPage', component: LandingPage },
    {path: '/tarif' , name: 'Tarif', component: () => import('../views/landingpage/TarifPage.vue')},
    {path: '/teams' , name: 'TeamsPage', component: () => import('../views/landingpage/TeamsPage.vue')},
    {path: '/contact' , name: 'ContactPage', component: () => import('../views/landingpage/ContactPage.vue')},
    {path: '/service', name: 'ServicePage', component: () => import('../views/landingpage/ServicePage.vue')},
    {path: '/politique' , name: 'politiquePage', component: () => import('../views/landingpage/PolitiqueConfi.vue')},
    {path: '/mention' , name: 'MentionPage', component: () => import('../views/landingpage/MentionLegal.vue')},
    {path: '/cookie' , name: 'CookiePage', component: () => import('../views/landingpage/CookiePage.vue')},
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
