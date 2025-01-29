<template>
  <div id="app" v-if="!landingRoute.includes($route.name as string)">
    <!-- Header -->
    <div class="relative overflow-hidden h-auto">
    <img v-if="sessionStore.isLoggedIn" :src="fond" class="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-full object-cover" alt="Fond d'écran"/>

    <div class="relative z-20 flex w-full flex-col h-full">
      <!-- Display Login Form if the user is not logged in -->
      <div v-if="sessionStore.isLoggedIn" class="relative z-20 flex flex-col h-full gap-6">
          <HeadEr :username="sessionStore.username" v-model:searchQuery="searchQuery" />
      </div>

      <span v-if="windowWidth <= 400 && sessionStore.isLoggedIn" class="fixed bottom-[-1px] bg-[#002233] w-full h-[5.6rem] z-40"></span>
      <div v-if="windowWidth <= 400 && sessionStore.isLoggedIn" class="bg-[#05161f] w-full h-[4rem] fixed bottom-0 z-50 rounded-t-3xl">
        <div class="flex justify-between items-center h-full px-4 mx-8">
          <div class="flex gap-[3.5rem]">
            <div class="flex flex-col items-center">
              <router-link to="/" @click="itemsselec = 1"><i class="fa-solid fa-house hover:opacity-50 hover:translate-y-[-4px] duration-200 relative" :class="{'translate-y-[-4]': $route.name == 'Home'}"></i></router-link>
              <div v-if="itemsselec === 1 || $route.name == 'Home'" class="absolute duration-200 bottom-3 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            </div>
            <div class="flex flex-col items-center">
              <router-link to="/finder" @click="itemsselec = 2"><i class="fa-solid fa-map hover:opacity-50 hover:translate-y-[-4px] duration-200 relative"></i></router-link>
              <div v-if="itemsselec === 2 || $route.name == 'Map'" class="absolute duration-200 bottom-3 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            </div>
          </div>
          <div class="flex gap-[3.5rem]">
          <div class="flex flex-col items-center">
            <router-link to="/chat" @click="itemsselec = 3"><i class="fa-solid fa-comments hover:opacity-50 hover:translate-y-[-4px] duration-200 relative"></i></router-link>
            <div v-if="itemsselec === 3 || $route.name == 'ChatPage'" class="absolute duration-200 bottom-3 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
          </div>
            <div class="flex flex-col items-center">
              <router-link to="/profil" @click="itemsselec = 4">
                <i class="fa-solid fa-user hover:opacity-50 duration-200 relative hover:translate-y-[-4px]"></i>
              </router-link>
              <div v-if="itemsselec === 4 || $route.name == 'Profil'" class="absolute duration-200 bottom-3 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
        <router-link to="/activite/add" class="absolute top-[-15px] left-1/2 transform -translate-x-1/2 bg-green-400 text-white border-4 border-transparent w-[3rem] h-[3rem] rounded-full text-center flex items-center justify-center text-[20px] shadow-lg ring-8 ring-[#002233] hover:ring-[10px] duration-200">
          <i class="fa-solid fa-plus"></i>
        </router-link>
      </div>
      <router-view />
    </div>
  </div>
</div>
<!-- Header landing page -->
<div id="app" v-if="landingRoute.includes($route.name as string)">
  <div class="mx-[130px] my-[3rem] flex justify-between items-center">
    <router-link to="/landing"><img :src="NewPLogo" alt=""></router-link>
    <div class="flex items-center gap-10">
      <router-link to="/landing" :class="{'decoration-2 underline': $route.name == 'LandingPage'}" class="text-[#002233] text-[20px] work-sans-semibold">Accueil</router-link>
      <router-link to="/service" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'ServicePage'}">Service</router-link>
      <router-link to="/tarif" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'Tarif'}">Tarifs</router-link>
      <router-link to="/contact" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'ContactPage'}">Contact</router-link>
      <router-link to="/teams" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'TeamsPage'}">NewP'Teams</router-link>
    </div>
    <div class="flex items-center gap-5">
      <div class="bg-[#002233] px-6 py-2 rounded-lg work-sans-semibold">
        <router-link to="/signin">Se connecter</router-link>
      </div>
      <div class="bg-[#002233] px-6 py-2 rounded-lg work-sans-semibold">
        <router-link to="/signup">S'inscrire</router-link>
      </div>
    </div>
  </div>
  <router-view />
  <div class="bg-[#60b776]/30 border-y-2 border-[#60b776]/80 mt-10">
    <div class="margin py-10 flex justify-between items-center">
      <div class="flex flex-col gap-2">
        <p class="text-[22px] work-sans-semibold text-bleuFonce w-[38rem]">Parce que se faire de nouveaux amis n’a jamais été aussi simple, avec <strong class="text-green-500">Newp</strong></p>
        <p class="word-sans-semibold text-[18px]">l’application qui regroupe les meilleurs outils pour se faire des amis</p>
      </div>
      <div class="bg-[#002233] px-6 py-2 rounded-lg work-sans-semibold duration-200 hover:opacity-90">
        <router-link to="/signup">Commencer gratuitement</router-link>
      </div>
    </div>
  </div>
  <div class="margin py-10 flex justify-between items-center">
    <router-link to="/landing"><img :src="NewPLogo" alt=""></router-link>
    <div class="flex flex-col items-end gap-10">
      <router-link to="/landing" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'LandingPage'}">Accueil</router-link>
      <router-link to="/Service" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'ServicePage'}">Service</router-link>
      <router-link to="/tarif" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'Tarif'}">Tarifs</router-link>
      <router-link to="/teams" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'TeamsPage'}">Qui somme nous ?</router-link>
      <router-link to="/Contact" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'ContactPage'}">Contact</router-link>
    </div>
  </div>
  <div class="border-t-2 border-white">
    <div class="margin py-6 flex justify-between">
      <div class="flex gap-2 items-center text-[10px] work-sans-regular text-bleuFonce">
        <p>2025 NewP Tout droit reservé</p>
        <p>Mention légal</p>
        <p>Politique de confidentialité</p>
        <p>Gestion des cookies</p>
      </div>
      <div class="flex gap-5 text-2xl text-bleuFonce">
        <i class="fa-brands fa-x-twitter"></i>
        <i class="fa-brands fa-linkedin-in"></i>
        <i class="fa-brands fa-instagram"></i>
      </div>
    </div>
  </div>
</div>
</template>


<style scoped>

  /* Responsive design */
  @media (min-width: 1710px) {
      .margin{
          margin: 0 230px;
      }
  }
  @media (max-width: 1710px) {
      .margin{
          margin: 0 200px;
      }
  }

  @media (max-width: 1440px) {
      .margin{
          margin: 0 130px;
      }
  }
</style>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  //@ts-ignore
  import LoginComponent from '../src/components/LoginComponent.vue';
  import { useSessionStore } from '../src/stores/sessions';
  //@ts-ignore
  import fond from '../src/assets/img/fond.png';
  //@ts-ignore
  import HeadEr from '../src/components/HeadEr.vue';
  import NewPLogo from '../src/assets/img/newPLogo.svg';

  // Reactive state
  const sessionStore = useSessionStore();
  const searchQuery = ref(''); // Reactive state in the parent
  const windowWidth = ref(window.innerWidth);
  const itemsselec = ref(0);
  const router = useRouter();

  const landingRoute = ref([
    'LandingPage',
    'Tarif',
    'TeamsPage',
    'ContactPage',
    'TeamsPage',
    'ServicePage',
    'politiquePage',
    'MentionPage',
    'CookiePage',
  ])

  // onMounted(() => {
  //   if(localStorage.length === 0){
  //     router.push('/signin');
  //   }
  // });
</script>
