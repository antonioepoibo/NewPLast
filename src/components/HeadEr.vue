<template>
      <div class="relative z-20 flex flex-col h-full gap-6">
          <div class="flex justify-between w-full h-[auto] bg-[#021925] py-6 px-[10rem] max-[600px]:px-[6rem] max-[600px]:py-3">
            <div class="flex gap-10 items-center text-white text-[18px] flex-shrink-0">
              <router-link to="/"><img :src="newP" class="w-[8rem] hover:opacity-50 duration-200 hover:underline max-[600px]:w-[6rem]" alt=""></router-link>
              <router-link to="/" class="max-[1100px]:hidden "><p :class="{ underline: $route.path === '/' }" class="text-white hover:opacity-50 duration-200 hover:underline">Home</p></router-link>
              <router-link to="/finder" class="max-[1100px]:hidden"><p :class="{ underline: $route.path === '/Finder' }" class="text-white hover:opacity-50 duration-200 hover:underline">Finder</p></router-link>
              <router-link to="/message" class="max-[1100px]:hidden"><p :class="{ underline: $route.path === '/Message' }" class="text-white hover:opacity-50 duration-200 hover:underline">Message</p></router-link>
            </div>
            <div class="flex gap-10 items-center text-white text-[18px] flex-shrink-0">
              <router-link to="/activite/add/" class="text-white hover:opacity-50 max-[1100px]:hidden"><i class="fa-solid fa-plus text-[24px]"></i></router-link>
              <router-link to="/profil"><img class="rounded-full w-[4rem] h-[4rem] object-cover" :src="image_url" alt=""></router-link>
              <button @click="logout" class="max-[1100px]:hidden"><i class="text-red-600 text-[24px] hover:text-red-400 duration-200 fa-solid fa-arrow-right-from-bracket"></i></button>
              <div id="spanCont" class="flex-col gap-2 hidden">
                <span class="flex w-6 h-[3px] bg-white rounded-full"></span>
                <span class="flex w-8 h-[3px] bg-white rounded-full"></span>
                <span class="flex w-6 h-[3px] bg-white rounded-full"></span>
              </div>
            </div>
          </div>
           
          <div class="flex flex-col gap-6 items-center justify-center m-auto">
              <div class="flex flex-col justify-center items-center">
                <h1 class="text-[30px] font-bold text-white max-[600px]:text-[20px]">Bienvenue {{ sessionStore.username }} !</h1>
                <p class="italic text-white">Content de vous revoir !</p>
              </div>

              <div v-if="searchBar !== false" class="flex gap-4 items-center border border-white rounded-full px-10 py-2 bg-white">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <input type="text" class="bg-transparent border-transparent w-[20rem] max-[600px]:w-[10rem] max-[600px]:text-[12px]" placeholder="Que faire aujourd'hui ?">
                  <i class="fa-solid fa-align-left"></i>
              </div>
              <div v-if="searchBar !== false" class="flex gap-6 text-center max-[600px]:gap-2">
                  <span v-for="category in categories" class="btn">{{ category }}</span>
              </div>
          </div>
        </div>
</template>

<script setup>
import newP from '../assets/img/newP_logo.svg';
import { defineProps } from "vue";
import { useSessionStore } from '../stores/sessions';



const sessionStore = useSessionStore();
const categories = ['Cinéma', 'Bowling', 'Foot', 'Soirée bar', 'Paintball', 'Lazer Game'];
const props = defineProps({
    username: String,
    searchBar: String
});

// Toggle the agenda visibility
function toggleAgenda() {
  showAgenda.value = !showAgenda.value;

  
}
// Logout function
function logout() {
  sessionStore.clearSession();
  alert('You have logged out.');
}
</script>