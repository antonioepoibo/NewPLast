<script setup lang="ts">
import { useRouter } from 'vue-router';
import { supabase } from './supabase';

const router = useRouter();


</script>

<template>
  <div id="app">
    <nav class="bg-white text-gray-800 shadow-md p-4 fixed top-0 left-0 w-full z-10">
      <div class="flex items-center justify-between">
        <div class="text-lg font-semibold">NewP</div>
        <div class="space-x-6">
          <a href="/" class="hover:text-gray-500">Home</a>
          <a href="/map" class="hover:text-gray-500">Activity Map</a>

          <!-- Lien vers la page account, on passe la session dans l'état de la route -->
          <a href="#" @click.prevent="router.push({ name: 'Account', state: { session: supabase.auth.session() } })" class="hover:text-gray-500">Account</a>

          <a href="/about" class="hover:text-gray-500">About</a>
        </div>
      </div>
    </nav>
    <div class="pt-8">
      <!-- Espace sous la navbar pour ne pas cacher le contenu -->
      <router-view />
    </div>
  </div>
</template>
