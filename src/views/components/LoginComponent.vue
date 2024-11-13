<!-- src/components/LoginComponent.vue -->
<template>
    <div>
      <h2>Please Log In</h2>
      <input v-model="username" placeholder="Enter your name" />
      <button @click="handleLogin">Log In</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const username = ref('');
  
  // Emit the login event to the parent component
  const emit = defineEmits(['login']);
  
  function handleLogin() {
    if (username.value.trim() === '') {
      alert('Please enter a valid name');
      return;
    }
  
    // Emit the login event with the username
    emit('login', username.value);
  }
  </script>
  
  <style scoped>
  input {
    margin: 0.5em 0;
    padding: 0.5em;
  }
  button {
    padding: 0.5em;
    cursor: pointer;
  }
  </style>
  