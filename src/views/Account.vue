<template>
  <div class="form-container">
    <h1>Profil Utilisateur</h1>
    <form class="form-widget" @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="text" :value="sessionStore.mail" disabled class="input-field" />
      </div>
      
    </form>
  </div>
</template>

<script setup>
import { supabase } from '../supabase';
import { ref, onMounted, computed } from 'vue';
import { useSessionStore } from '../stores/sessions';
const loading = ref(true);
const username = ref('');
const full_name = ref('');
const firstname = ref('');
const lastname = ref('');
const age = ref(null);
const gender = ref('');
const selectedInterests = ref([]);

const availableInterests = [
  'Sports', 'Musique', 'Voyages', 'Lecture', 'Cinéma', 'Cuisine', 'Danse', 'Art', 'Nature',
  'Photographie', 'Mode', 'Jeux vidéo', 'Fitness', 'Yoga', 'Peinture', 'Écriture', 'Théâtre', 'Randonnée',
  'Camping', 'Animaux', 'Astronomie', 'Films', 'Séries TV', 'Jardinage'
];

const sessionStore = useSessionStore();


onMounted(() => {
  console.log('Account page mounted');
  console.log('Session:', sessionStore.session);
  console.log('Id:', sessionStore.userId);

  // Only attempt to load the profile if session exists
  if (sessionStore.session) {
    getProfile();
  } else {
    console.error("Session is not available");
  }
});

async function getProfile() {
  try {
    loading.value = true;
    const user = sessionStore.userId;

    if (!user) {
      throw new Error('User not found in session.');
    }

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, full_name, firstname, lastname, age, gender, interest`)
      .eq('id', user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      profileData = data;
      username.value = data.username;
      full_name.value = data.full_name;
      firstname.value = data.firstname;
      lastname.value = data.lastname;
      age.value = data.age;
      gender.value = data.gender;
      selectedInterests.value = data.interest ? data.interest.split(', ') : [];
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }

  // Log the retrieved values to the console
  console.log('Profile data:', {
        username: profileData.username,
        full_name: profileData.full_name,
        firstname: profileData.firstname,
        lastname: profileData.lastname,
        age: profileData.age,
        gender: profileData.gender,
        interests: profileData.interest,
      });
  
}
</script>

<style scoped>
input {
  margin: 1em 0;
  padding: 0.5em;
  color: white;
}
</style>
