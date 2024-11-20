<template>
  <div class="form-container">
    <h1>Profil Utilisateur</h1>
    <form class="form-widget" @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="text" :value="session.user.email" disabled class="input-field" />
      </div>
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input id="username" type="text" v-model="username" class="input-field" />
      </div>
      <div class="form-group">
        <label for="full_name">Nom complet</label>
        <input id="full_name" type="text" v-model="full_name" class="input-field" />
      </div>
      <div class="form-group">
        <label for="firstname">Prénom</label>
        <input id="firstname" type="text" v-model="firstname" class="input-field" />
      </div>
      <div class="form-group">
        <label for="lastname">Nom de famille</label>
        <input id="lastname" type="text" v-model="lastname" class="input-field" />
      </div>
      <div class="form-group">
        <label for="age">Âge</label>
        <input id="age" type="number" v-model="age" class="input-field" />
      </div>
      <div class="form-group">
        <label for="gender">Genre</label>
        <select id="gender" v-model="gender" class="input-field">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="form-group">
        <label>Centre d'intérêt</label>
        <div class="interests-container">
          <button
            v-for="item in availableInterests"
            :key="item"
            :class="['interest-button', selectedInterests.includes(item) ? 'selected' : '']"
            @click.prevent="toggleInterest(item)"
            :disabled="!selectedInterests.includes(item) && selectedInterests.length >= 3"
          >
            {{ item }}
          </button>
        </div>
        <p class="selected-interests">Sélectionnés : {{ selectedInterests.join(', ') }}</p>
      </div>
      <div class="form-actions">
        <input
          type="submit"
          class="button primary"
          :value="loading ? 'Chargement...' : 'Mettre à jour'"
          :disabled="loading"
        />
        <button class="button secondary" @click="goToHomePage">Aller à la page d'accueil</button>
        <button class="button secondary" @click="signOut" :disabled="loading">Déconnexion</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { supabase } from '../supabase';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Retrieve session from the route's state
const route = useRoute();
const router = useRouter();
const session = ref(route.state?.session);  // Access session from route state

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

// Safely computed property for email (using session value)
const userEmail = computed(() => {
  return session.value?.user?.email || '';
});

onMounted(() => {
  console.log('Account page mounted');
  console.log('Session:', session.value);

  // Only attempt to load the profile if session exists
  if (session.value) {
    getProfile();
  } else {
    console.error("Session is not available");
  }
});

async function getProfile() {
  try {
    loading.value = true;
    const user = session.value?.user;

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
}

async function updateProfile() {
  try {
    loading.value = true;
    const user = session.value?.user;

    if (!user) {
      throw new Error('User not found in session.');
    }

    const updates = {
      id: user.id,
      username: username.value,
      full_name: full_name.value,
      firstname: firstname.value,
      lastname: lastname.value,
      age: age.value,
      gender: gender.value,
      interest: selectedInterests.value.join(', '),
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

function goToHomePage() {
  router.push('/home');  // Ensure this path matches the route
}

async function signOut() {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>
