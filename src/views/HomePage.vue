<script setup>
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const loading = ref(false);

// Vérification de la session au montage
onMounted(async () => {
  const { data: user } = await supabase.auth.getUser();

  // Si l'utilisateur n'est pas connecté, redirige vers /auth
  if (!user) {
    router.push('/auth');
  }
});

// Fonction pour déconnecter l'utilisateur
const signOut = async () => {
  try {
    loading.value = true;
    await supabase.auth.signOut(); // Déconnexion de l'utilisateur
    router.push('/auth'); // Redirige vers la page de connexion
  } catch (error) {
    alert('Erreur lors de la déconnexion');
  } finally {
    loading.value = false;
  }
};

// Fonction pour accéder au compte
const goToAccount = () => {
  router.push('/account'); // Redirige vers la page de compte
};
</script>

<template>
  <div class="home-container">
    <h1>Bienvenue sur la page d'accueil</h1>
    <p>Utilisez les boutons ci-dessous pour gérer votre compte ou vous déconnecter.</p>
    
    <!-- Bouton pour accéder au compte -->
    <button @click="goToAccount" class="home-button">
      Accéder à mon compte
    </button>
    
    <!-- Bouton pour se déconnecter -->
    <button @click="signOut" :disabled="loading" class="home-button">
      {{ loading ? 'Déconnexion...' : 'Se déconnecter' }}
    </button>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  padding: 20px;
}

.home-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}

.home-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.home-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
