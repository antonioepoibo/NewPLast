<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';
import { useSessionStore } from '../stores/sessions';

// State
const loading = ref(false);
const email = ref('');
const router = useRouter();
const sessionStore = useSessionStore();

const handleLogin = async () => {
  try {
    loading.value = true;

    // Login using magic link
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });

    if (error) throw error;

    sessionStore.isCompany = true;

    alert('Check your email for the login link!');
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};

// Redirection vers la page utilisateur
const goToUserLogin = () => {
  router.push('/login');
};
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Login Entreprise</h1>
      <p>Sign in via magic link with your professional email below:</p>
      <input type="email" v-model="email" required placeholder="Your email" />
      <button type="submit" :disabled="loading">{{ loading ? 'Loading...' : 'Send Magic Link' }}</button>
      
      <!-- Bouton pour aller à la page utilisateur -->
      <button type="button" @click="goToUserLogin">Vous êtes un utilisateur classique ?</button>
    </div>
  </form>
</template>

<style scoped>
input {
  margin: 0.5em 0;
  padding: 0.5em;
  color: aliceblue;
}
button {
  margin: 1em 0;
  padding: 0.5em;
}
</style>
