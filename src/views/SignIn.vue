<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';
import fond from '../assets/img/fond.png';
import apple from '../assets/img/appleico.svg';
import meta from '../assets/img/metaico.svg';
import google from '../assets/img/googleico.svg';
import newP from '../assets/img/newP_logo.svg';
import { useSessionStore } from '../stores/sessions';

const sessionStore = useSessionStore();
// State
const loading = ref(false);
const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    loading.value = true;

    // Login using magic link
    // const { error } = await supabase.auth.signInWithPassword({
    //   email: email.value,
    //   password: password.value,
    // });
    const {error} = await supabase.auth.signInWithOtp({
      email: email.value,
    })

    if (error) throw error;
    
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) console.error('Error getting session:', sessionError);
  
  if (sessionData?.session) {
    sessionStore.setSession(sessionData.session);
    router.push('/app');
  } else {
    sessionStore.clearSession();
  }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <div class="relative w-full h-[100vh]">
    <!-- Image en fond -->
    <img :src="fond" class="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-[100vh] object-cover overflow-hidden" alt="Fond d'écran">

    <!-- Contenu de la page -->
    <div class="relative z-20 flex flex-col items-center justify-center m-auto h-full w-[40%] max-[400px]:w-full gap-6">
      <img :src="newP" class="w-[15rem]" alt="">
      <div class="flex flex-col items-center mb-10 gap-2">
        <h1 class="text-[30px] font-bold text-white uppercase max-[600px]:text-[25px] max-[400px]:text-[20px]">Se connecter</h1>
        <p class="text-white">Espace utilisateur</p>
      </div>
      <div class="flex flex-col items-center gap-6 w-[58%]">
        <div class="flex flex-col gap-2 w-[25rem] max-[400px]:w-[20rem]">
          <label for="email" class="text-[14px] ml-6 text-white opacity-[72%]">Adresse e-mail</label>
          <input v-model="email" type="email" required class="border bg-white text-black rounded-full h-[3rem] pl-6" />
        </div>
        <div class="relative flex flex-col gap-2 w-[25rem] max-[400px]:w-[20rem]">
          <label for="password" class="text-[14px] ml-6 text-white opacity-[72%]">Mot de passe</label>
          <input v-model="password" :type="isPasswordVisible" required class="border bg-white rounded-full h-[3rem] pl-6" />
          <i @click="see" class="absolute fa-solid fa-eye-slash right-5 top-[55%] cursor-pointer hover:opacity-60 duration-200"></i>
        </div>
        <div class="flex gap-2 w-[25rem] items-center justify-between max-[400px]:w-[20rem]">
          <div class="flex items-center">
            <input type="checkbox" id="remember-me" class="mr-2 placerholder:ml-4" />
            <label for="remember-me" class="text-[14px] text-white opacity-[72%] max-[400px]:text-[12px]">Se souvenir de moi</label>
          </div>
          <a href="#" class="text-[14px] hover:underline text-white opacity-[72%] max-[400px]:text-[12px]">Oublie du mot de passe ?</a>
        </div>
        <button @click="handleLogin" type="submit" class="text-[13px] rounded-full py-2 px-6 mt-4text-gray-700 font-bold uppercase bg-white opacity-40 duration-200 hover:opacity-100 max-[600px]:w-[10rem]">Se connecter</button>
      </div>
      <p v-if="message" class="text-red-500">{{ message }}</p>
      <router-link to="/signup" class="mt-4 text-white text-center">Pas encore de compte ? <span class="hover:underline font-bold">Inscrivez-vous !</span></router-link>
      <router-link to="/loginCompany">Vous êtes une entreprise ?</router-link>
      <div class="flex gap-4 items-center">
        <div @click="googleSig" class="bg-white rounded-lg p-1 opacity-40 duration-200 hover:opacity-100 cursor-pointer">
          <img :src="google" class="w-[40px]" alt="">
        </div>
        <div class="bg-white rounded-lg p-1 opacity-40 duration-200 hover:opacity-100 cursor-pointer">
          <img :src="meta" class="w-[40px]" alt="">
        </div>
        <div class="bg-white rounded-lg p-1 opacity-40 duration-200 hover:opacity-100 cursor-pointer">
          <img :src="apple" class="w-[40px]" alt="">
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
input {
  margin: 0.5em 0;
  padding: 0.5em;
  color: black
}
button {
  margin: 1em 0;
  padding: 0.5em;
}
</style>
