<template>

      <div class="relative z-20 flex flex-col h-full gap-6">
          <div class="flex justify-between w-full h-[auto] bg-[#021925] py-6 px-[10rem] max-[600px]:px-[2rem] max-[600px]:py-3 max-[400px]:py-1">
            <div class="flex gap-10 items-center text-white text-[18px] flex-shrink-0">
              <router-link to="/"><img :src="newP" class="w-[8rem] hover:opacity-50 duration-200 hover:underline max-[600px]:w-[6rem] max-[400px]:w-[4rem]" alt=""></router-link>
              <router-link to="/" class="max-[1100px]:hidden "><p :class="{ underline: $route.path === '/' }" class="text-white hover:opacity-50 duration-200 hover:underline">Home</p></router-link>
              <router-link to="/finder" class="max-[1100px]:hidden"><p :class="{ underline: $route.path === '/Finder' }" class="text-white hover:opacity-50 duration-200 hover:underline">Finder</p></router-link>
              <router-link to="/chat" class="max-[1100px]:hidden"><p :class="{ underline: $route.path === '/chat' }" class="text-white hover:opacity-50 duration-200 hover:underline">Message</p></router-link>
            </div>
            <div class="flex gap-10 items-center text-white text-[18px] flex-shrink-0">
              <router-link to="/activite/add/" class="text-white hover:opacity-50 max-[1100px]:hidden"><i class="fa-solid fa-plus text-[24px]"></i></router-link>
              <router-link to="/profil" class="max-[400px]:hidden"><img class="rounded-full w-[4rem] h-[4rem] object-cover" :src="image_url" alt=""></router-link>
              <button @click="logout"><i class="text-red-600 text-[24px] hover:text-red-400 duration-200 fa-solid fa-arrow-right-from-bracket"></i></button>
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
    </div>
  </div>
</template>


<script setup>
import newP from '../assets/img/newP_logo.svg';
import { defineProps, defineEmits, ref } from "vue";
import { useSessionStore } from '../stores/sessions';
import DefaultImg from '../assets/img/default_img.png';
import {supabase} from '../supabase'
const sessionStore = useSessionStore();
const searchQuery = ref(''); // Reactive state for search query
const props = defineProps({
    searchBar: String
});
const emit = defineEmits(); // Define emits
const image_url = ref('');

async function getImg(){
  const { data, error } = await supabase
   .from('profiles')
   .select('avatar_url')
   .eq('id', sessionStore.userId);
   if (error) {
    console.error(error);
    return DefaultImg;
  } else {
    image_url.value = data[0].avatar_url;
  }
}

// Logout function
function logout() {
  sessionStore.clearSession();
  alert('You have logged out.');
}

getImg();
</script>
