<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';

// State
const loading = ref(false);
const email = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    loading.value = true;

    // Login using magic link
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });

    if (error) throw error;

    // Vérifiez ou ajoutez l'email dans la table profiles
    await ensureProfile(email.value);

    alert('Check your email for the login link!');
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};

// Fonction pour vérifier ou ajouter l'email dans la table profiles
const ensureProfile = async (email) => {
  try {
    // Vérifiez si l'email existe déjà dans la table profiles
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      // Si une erreur autre que "Pas de correspondance trouvée"
      throw error;
    }

    if (!data) {
      // Si aucune ligne avec cet email, insérez une nouvelle ligne
      const { error: insertError } = await supabase.from('profiles').insert([
        {
          email: email,
          updated_at: new Date().toISOString(), // Ajoutez un timestamp actuel
        },
      ]);

      if (insertError) throw insertError;

      console.log('Email ajouté à la table profiles');
    } else {
      console.log('Email déjà présent dans la table profiles');
    }
  } catch (err) {
    console.error('Erreur lors de la vérification ou de l\'ajout du profil :', err);
    throw err;
  }
};

// Redirection vers la page entreprise
const goToCompanyLogin = () => {
  router.push('/loginCompany');
};
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Login</h1>
      <p>Sign in via magic link with your email below:</p>
      <input type="email" v-model="email" required placeholder="Your email" />
      <button type="submit" :disabled="loading">{{ loading ? 'Loading...' : 'Send Magic Link' }}</button>
      
      <!-- Bouton pour aller à la page entreprise -->
      <button type="button" @click="goToCompanyLogin">Vous êtes une entreprise ?</button>
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
