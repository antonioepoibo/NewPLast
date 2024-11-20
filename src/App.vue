<script setup>
import { onMounted, ref } from 'vue';
import HomePage from './views/HomePage.vue'; // Assurez-vous que ce chemin est correct
import Auth from './components/Auth.vue';
import { supabase } from './supabase';

const session = ref(null); // Initialise la session comme null

// Vérifiez la session de l'utilisateur au montage du composant
onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session; // Stocke la session active dans la variable
  });

  // Écoute les changements d'état de la session (connexion/déconnexion)
  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session; // Met à jour la session active
  });
});
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <!-- Affiche HomePage si la session est active, sinon affiche Auth -->
    <HomePage v-if="session" :session="session" />
    <Auth v-else /> <!-- Si pas de session active, on affiche Auth -->
  </div>
</template>
