<script setup lang="ts">
import { ref } from 'vue';
//@ts-ignore
import LoginComponent from '../src/components/LoginComponent.vue';
import { useSessionStore } from '../src/stores/sessions';
//@ts-ignore
import fond from '../src/assets/img/fond.png';
//@ts-ignore
import HeadEr from '../src/components/HeadEr.vue';

// Reactive state
const sessionStore = useSessionStore();
const searchQuery = ref(''); // Reactive state in the parent
const windowWidth = ref(window.innerWidth);
const itemsselec = ref(0);



</script>

<template>
  <div id="app">
    <!-- Header -->
    <div class="relative overflow-hidden h-auto">
    <img v-if="sessionStore.isLoggedIn" :src="fond" class="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-full object-cover" alt="Fond d'écran"/>

    <div class="relative z-20 flex w-full flex-col h-full">
      
      <!-- Display Login Form if the user is not logged in -->
      <LoginComponent v-if="!sessionStore.isLoggedIn && $route.name == 'Home'"/>

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
</template>


<style scoped>
</style>
