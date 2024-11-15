<script setup>
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  checkProfileCompletion();
});

// Fonction pour vérifier si le profil est complet
async function checkProfileCompletion() {
  const { data: user } = await supabase.auth.getUser();

  if (!user) {
    router.push('/auth'); // Si l'utilisateur n'est pas authentifié, retour à la page d'authentification
    return;
  }

  // Récupération des informations de profil
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, age, gender') // Vérifiez ici les champs importants pour considérer le profil comme complet
    .eq('id', user.id)
    .single();

  if (error || !data) {
    alert("Erreur lors de la récupération du profil");
    return;
  }

  // Vérifiez si les champs importants sont remplis
  if (data.full_name && data.age && data.gender) {
    router.push('/HomePage'); // Si le profil est complet, rediriger vers la page d'accueil
  } else {
    router.push('/account'); // Sinon, rediriger vers la page de compte pour compléter les informations
  }
}
</script>

<template>
  <div class="redirect-container">
    <p>Vérification de votre profil...</p>
  </div>
</template>

<style scoped>
.redirect-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2em;
}
</style>
