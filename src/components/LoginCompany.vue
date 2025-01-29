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

    // Vérifiez ou ajoutez l'email dans la table profiles
    await ensureProfile(email.value);

    // Définir isCompany à true après connexion
    sessionStore.setCompanyStatus(true);
    console.log("Après connexion → isCompany:", sessionStore.isCompany);

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
  router.push('/signIn');
};
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
        <p class="text-white">Espace commercant</p>
      </div>
      <div class="flex flex-col items-center gap-6 w-[58%]">
        <div class="flex flex-col gap-2 w-[25rem] max-[400px]:w-[20rem]">
          <label for="email" class="text-[14px] ml-6 text-white opacity-[72%]">Adresse e-mail</label>
          <input v-model="email" type="email" required class="border bg-white text-black rounded-full h-[3rem] pl-6" />
        </div>
        <div class="relative flex flex-col gap-2 w-[25rem] opacity-50 max-[400px]:w-[20rem]">
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
      <button type="button" @click="goToCompanyLogin">Vous êtes une personne seule ?</button>

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
