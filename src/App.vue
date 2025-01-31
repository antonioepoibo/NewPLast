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
              <router-link to="/app" @click="itemsselec = 1"><i class="fa-solid fa-house hover:opacity-50 hover:translate-y-[-4px] duration-200 relative" :class="{'translate-y-[-4]': $route.name == 'Home'}"></i></router-link>
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
<div class="Burger z-[20] fixed w-full h-full bg-white hidden py-[3rem] flex flex-col justify-center">
  <i class="fa-solid fa-xmark absolute top-0 right-0 m-5 text-[25px] my-[1.6rem]" @click="closeBG"></i>
  <router-link to="/"><img @click="closeBG" :src="NewPLogo" class="w-[10rem] m-auto my-0" alt=""></router-link>

  <div>
    <div class="flex flex-col items-center gap-4 mt-6">
      <router-link to="/" @click="closeBG" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'LandingPage'}">Accueil</router-link>
      <router-link to="/Service" @click="closeBG" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'ServicePage'}">Service</router-link>
      <router-link to="/tarif" @click="closeBG" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'Tarif'}">Tarifs</router-link>
      <router-link to="/Contact" @click="closeBG" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'ContactPage'}">Contact</router-link>
      <router-link to="/teams" @click="closeBG" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'TeamsPage'}">NewP'Teams</router-link>
    </div>
    <div class="flex justify-center gap-2 mt-6">
      <div class="bg-[#002233] px-4 py-2 rounded-lg work-sans-semibold w-fit text-[14px]">
        <router-link to="/signup" @click="closeBG">S'inscrire</router-link>
      </div>
      <div class="bg-[#002233] px-4 py-2 rounded-lg work-sans-semibold w-fit text-[14px]">
        <router-link to="/signin" @click="closeBG">Se connecter</router-link>
      </div>
    </div>
    <div class="flex gap-2 items-center text-lg justify-center mt-6">
      <i class="fa-brands fa-x-twitter bg-black text-white rounded-full p-2"></i>
      <i class="fa-brands fa-linkedin-in bg-black text-white rounded-full p-2 px-[.6rem]"></i>
      <i class="fa-brands fa-instagram bg-black text-white rounded-full p-2 px-[.6rem]"></i>
    </div>
  </div>
</div>
<div class="relative" id="app" v-if="landingRoute.includes($route.name as string)">
  <div class="fixed w-[100%] z-10 bg-[#F5F5F5] px-[130px] py-[3rem] flex justify-between items-center max-[500px]:px-[20px] max-[500px]:w-screen max-[500px]:py-[1.6rem]">
    <router-link to="/"><img :src="NewPLogo" class="max-[500px]:w-[5rem]" alt=""></router-link>
    <div class="flex items-center gap-10 max-[500px]:hidden">
      <router-link to="/" :class="{'decoration-2 underline': $route.name == 'LandingPage'}" class="text-[#002233] text-[20px] work-sans-semibold">Accueil</router-link>
      <p class="text-[#002233] cursor-pointer text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'ServicePage'}" @mouseover="handleMouseOverService" @click="openService">Service</p>
      <router-link to="/tarif" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'Tarif'}">Tarifs</router-link>
      <router-link to="/contact" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'ContactPage'}">Contact</router-link>
      <router-link to="/teams" class="text-[#002233] text-[20px] work-sans-semibold" :class="{'decoration-2 underline': $route.name == 'TeamsPage'}">NewP'Teams</router-link>
    </div>
    <div class="flex items-center gap-5 max-[500px]:hidden">
      <div class="bg-[#002233] px-6 py-2 rounded-lg work-sans-semibold">
        <router-link to="/signin">Se connecter</router-link>
      </div>
      <div class="bg-[#002233] px-6 py-2 rounded-lg work-sans-semibold">
        <router-link to="/signup">S'inscrire</router-link>
      </div>
    </div>
    <div @click="openBgMenu" class="flex-col gap-2 items-end hidden max-[500px]:flex">
      <span class="relative bg-black w-4 h-[.2rem]"></span>
      <span class="relative bg-black w-6 h-[.2rem]"></span>
      <span class="relative bg-black w-4 h-[.2rem]"></span>
    </div>
  </div>
  <div class="Service fixed z-[11] top-[6.7rem] w-full h-[14rem] border-y-2 border-bleuFonce bg-white flex items-center hidden "@mouseleave="handleMouseOutService" >
    <div class="mx-[11rem]">
      <p class="work-sans-semibold text-[18px] text-bleuFonce">Nos services</p>
      <div class="flex justify-between flex-wrap gap-x-6 gap-y-2 items-center">
        <div v-for="service in Services" class="flex gap-4 items-center saturate-0 duration-200 cursor-pointer hover:saturate-100">
          <div class="w-[2.8rem] h-[2.8rem] bg-[#60b776]/60 rounded-sm border-2 flex items-center justify-center border-[#60b776]">
            <i :class="service.icon + ' text-white text-[22px]'"></i>
          </div>  
          <div class="flex flex-col">
            <p class="work-sans-semibold">{{service.title}}</p>
            <p class="work-sans-regular w-[15.4rem] text-[14px]">{{service.description}}</p>
          </div>      
        </div>
        <div class="w-[19rem]">
          <div class="h-fit w-fit bg-[#002233] px-8 py-1 rounded-lg work-sans-semibold">
            <router-link to="/signup" class="text-[14px]">Découvrir</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pt-[8rem] relative z-8 max-[500px]:pt-[3rem]">
    <router-view />  
  </div>
  <div class="fixed right-0 bottom-0 bg-[#60b776] rounded-full m-6 p-[.9rem] py-[.8rem] border-2 border-[#55a168] max-[500px]:p-2 max-[500px]:px-3">
    <i class="fa-solid fa-cookie-bite text-white text-[30px] max-[500px]:text-[18px]"></i>
  </div>
  <div class="bg-[#60b776]/30 border-y-2 border-[#60b776]/80 mt-10">
    <div class="margin py-10 flex justify-between items-center max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-2">
      <div class="flex flex-col gap-2">
        <p class="text-[22px] work-sans-semibold text-bleuFonce w-[38rem] max-[500px]:w-full max-[500px]:text-[14px]">Parce que se faire de nouveaux amis n’a jamais été aussi simple, avec <strong class="text-green-500">Newp</strong></p>
        <p class="word-sans-semibold text-[18px] max-[500px]:text-[12px] ">l’application qui regroupe les meilleurs outils pour se faire des amis</p>
      </div>
      <div class="bg-[#002233] px-6 py-2 rounded-lg work-sans-semibold duration-200 hover:opacity-90 max-[500px]:py-1">
        <router-link to="/signup" class="max-[500px]:text-[8px]">Commencer gratuitement</router-link>
      </div>
    </div>
  </div>
  <div class="margin py-10 flex justify-between items-center">
    <router-link to="/landing"><img :src="NewPLogo" alt="" class="w-[5rem]"></router-link>
    <div class="flex flex-col items-end gap-10 max-[500px]:gap-2">
      <router-link to="/landing" class="text-[#002233] text-[20px] work-sans-semibold max-[500px]:text-[12px]" :class="{'decoration-2 underline': $route.name == 'LandingPage'}">Accueil</router-link>
      <router-link to="/Service" class="text-[#002233] text-[20px] work-sans-semibold max-[500px]:text-[12px]" :class="{'decoration-2 underline': $route.name == 'ServicePage'}">Service</router-link>
      <router-link to="/tarif" class="text-[#002233] text-[20px] work-sans-semibold max-[500px]:text-[12px]" :class="{'decoration-2 underline': $route.name == 'Tarif'}">Tarifs</router-link>
      <router-link to="/Contact" class="text-[#002233] text-[20px] work-sans-semibold max-[500px]:text-[12px]" :class="{'decoration-2 underline': $route.name == 'ContactPage'}">Contact</router-link>
      <router-link to="/teams" class="text-[#002233] text-[20px] work-sans-semibold max-[500px]:text-[12px]" :class="{'decoration-2 underline': $route.name == 'TeamsPage'}">NewP'Teams</router-link>
    </div>
  </div>
  <div class="border-t-2 border-white">
    <div class="margin py-6 flex justify-between">
      <div class="flex gap-2 items-center text-[10px] work-sans-regular text-bleuFonce max-[500px]:gap-1">
        <p class="max-[500px]:text-[5px]">2025 NewP Tout droit reservé</p>
        <p class="max-[500px]:text-[5px]">Mention légal</p>
        <p class="max-[500px]:text-[5px]">Politique de confidentialité</p>
        <p class="max-[500px]:text-[5px]">Gestion des cookies</p>
      </div>
      <div class="flex gap-5 text-2xl text-bleuFonce max-[500px]:text-sm max-[500px]:gap-2">
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

  @media (max-width: 1024px) {
    .margin{
        margin: 0 100px;
    }
  }

  @media (max-width: 768px) {
    .margin{
        margin: 0 50px;
    }
  }

  @media (max-width: 400px) {
    .margin{
        margin: 0 20px;
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

  function closeBG(){
    const bgMenu = document.querySelector('.Burger') as HTMLElement;
    bgMenu.classList.add('hidden');
  }
  // Services
  function openService(){
    const service = document.querySelector('.Service') as HTMLElement;
    service.classList.toggle('hidden');
  }

  const handleMouseOverService = (): void => {
    const service = document.querySelector('.Service') as HTMLElement;
    service.classList.remove('hidden');
  }

  const handleMouseOutService = (): void => {
    const service = document.querySelector('.Service') as HTMLElement;
    service.classList.add('hidden');
  }

  const Services = ref([
    {
      title: 'Map interactive',
      description: 'Intégration d’une map 100% fonctionnel',
      icon: 'fa-solid fa-map-location-dot',
    },
    {
      title: 'Agenda autonome',
      description: 'Plus besoin de se rappeler de ses activités grâce à l’agenda de NewP !',
      icon: 'fa-regular fa-calendar-days',
    },
    {
      title: 'Profil 100% personnalisable',
      description: 'Votre profil à l’écoute de vos envies et de vos goûts',
      icon: 'fa-solid fa-user',
    },
    {
      title: 'Intégration des amis',
      description: 'L’intégration des amis avec la possibilité d’échanger avec eux !',
      icon: 'fa-solid fa-users',
    },
    {
      title: 'Chat communautaire',
      description: 'Intégration d\'un chat de profil d\'activité pour discuter',
      icon: 'fa-solid fa-comments',
    },
    {
      title: 'Ajout d’activité',
      description: 'La personnalisation de ses activités est un atout pour NewP !',
      icon: 'fa-solid fa-file-circle-plus',
    },
    {
      title: 'Système d’entreprise',
      description: 'La possibilité de connecter son entreprise avec NewP',
      icon: 'fa-solid fa-gear',
    },
  ])

  function openBgMenu(){
    const bgMenu = document.querySelector('.Burger') as HTMLElement;
    bgMenu.classList.toggle('hidden');
  }

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
