<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useSessionStore } from '../stores/sessions';

// State
const loading = ref(false);
const email = ref('');
const sessionStore = useSessionStore();

const handleLogin = async () => {
  try {
    loading.value = true;

    // Login using magic link
    const { loginError } = await supabase.auth.signInWithOtp({
      email: email.value,
    });

    if (loginError) throw loginError;


    const { error: dbError } = await supabase.from('company').upsert({
      email: email.value,
      updated_at: new Date().toISOString(),
    });

    if (dbError) throw dbError

    // Set isCompany to true in the session store
    sessionStore.isCompany = true;

    // Notify parent about successful login
    alert('Check your email for the login link!');
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Login for Company</h1>
      <p>Sign in via magic link with your email below:</p>
      <input type="email" v-model="email" required placeholder="Your business email" />
      <button type="submit" :disabled="loading">{{ loading ? 'Loading...' : 'Send Magic Link' }}</button>
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
