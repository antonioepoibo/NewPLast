<script setup>
import { ref } from 'vue';
import LoginComponent from '../components/LoginComponent.vue';
import LoginCompany from '../components/LoginCompany.vue';

// State to track whether it's a company login
const isCompany = ref(false);

const toggleLoginType = () => {
  isCompany.value = !isCompany.value;
};
</script>

<template>
  <div class="login-page">
    <h1>{{ isCompany ? 'Connexion Entreprise' : 'Connexion Utilisateur' }}</h1>
    <!-- Render the appropriate login component -->
    <component :is="isCompany ? LoginCompany : LoginComponent" />

    <!-- Toggle button -->
    <button @click="toggleLoginType">
      {{ isCompany ? 'Vous êtes un utilisateur ?' : 'Vous êtes une entreprise ?' }}
    </button>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}
button {
  margin-top: 1em;
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
}
</style>