<script setup>
import { supabase } from '../supabase'
import { onMounted } from 'vue'
import { useSessionStore } from '../stores/sessions'; 
import { ref } from 'vue';

const sessionStore = useSessionStore(); 


const loading = ref(true)
const username = ref('')
const full_name = ref('')
const firstname = ref('')
const lastname = ref('')
const age = ref(null)
const gender = ref('')
const selectedInterests = ref([])

// Liste d'intérêts prédéfinis
const availableInterests = [
  'Sports', 'Musique', 'Voyages', 'Lecture', 'Cinéma', 'Cuisine', 'Danse', 'Art', 'Nature',
  'Photographie', 'Mode', 'Jeux vidéo', 'Fitness', 'Yoga', 'Peinture', 'Écriture', 'Théâtre', 'Randonnée',
  'Camping', 'Animaux', 'Astronomie', 'Films', 'Séries TV', 'Jardinage', 
  'DIY (Do It Yourself)', 'Méditation',
  'Esport', 'Marathon', 'Crossfit', 'Natation', 'Surf', 'Ski', 'Snowboard', 'Escalade', 'Voyage en sac à dos',
  'Road trips', 'Architecture', 'Blogging', 'Vlogging', 'Langues étrangères', 'Animaux de compagnie', 
  'Automobile', 'Moto', 'Parcs d’attractions', 'Poésie', 'Bien-être', 'Café', 'Thé', 
  'Pêche', 'Chasse', 'Arts martiaux', 'Boxe',  
  'Pâtisserie', 'Astrologie', 'Alpinisme', 'Planche à voile',
  'Bricolage', 'Escrime', 'Musculation', 'Roller', 'Patinage artistique','Street art',
  'Mode vintage', 'Tatouages', 'Piercings', 'Artisanat', 'Vin', 'Bières artisanales', 'Mindfulness', 
  'Thérapies naturelles', 'Danse classique', 'Hip-hop', 'Street dance', 'K-pop', 'Culture japonaise', 
  'Culture coréenne', 'Manga', 'Anime', 'Comics', 'Jeux de société', 'Jeux de rôle', 
  'Littérature jeunesse', 'Activités de plein air', 'Bowling', 'Mini-golf', 'Golf', 
  'Tennis', 'Football', 'Basketball', 'Rugby', 'Handball', 'Volley-ball', 'Badminton', 'Esport', 'Chant',
  'Instruments de musique', 'Piano', 'Guitare', 'Batterie', 'Violon', 'Flûte', 'Opéra', 'Rap', 'Jazz', 'Blues',
  'Rock', 'Musique classique', 'Funk', 'Soul', 'R&B', 'Techno', 'House', 'Électro', 'Salsa', 'Bachata', 
  'Tango', 'Kizomba', 'Reggae', 'Rock alternatif', 'Metal', 'Pop', 'Country', 'Musique latine', 'Cyclisme', 
  'Vélo de montagne', 'Football américain', 'Baseball', 'Cricket', 'Sports extrêmes', 'Motocross', 
  'Plongée sous-marine', 'Snorkeling', 'Kitesurf', 'Parachutisme', 'Parapente', 'Wing suiting', 'Base jump'
];


onMounted(() => {
  console.log(sessionStore.userId)
  getProfile()
})

async function getProfile() {
  try {
    loading.value = true
    const user = sessionStore.userId;


    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, full_name, firstname, lastname, age, gender, interest`)
      .eq('id', user)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username
      full_name.value = data.full_name
      firstname.value = data.firstname
      lastname.value = data.lastname
      age.value = data.age
      gender.value = data.gender
      selectedInterests.value = data.interest ? data.interest.split(', ') : []
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    const user = sessionStore.userId;

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
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

function goToHomePage() {
  router.push('/HomePage')
}

function toggleInterest(interest) {
  if (selectedInterests.value.includes(interest)) {
    selectedInterests.value = selectedInterests.value.filter(i => i !== interest)
  } else if (selectedInterests.value.length < 3) {
    selectedInterests.value.push(interest)
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <div class="form-container">
    <h1>Profil Utilisateur</h1>
    <form class="form-widget" @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="text" :value="sessionemail" disabled class="input-field" />
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


<style scoped>
.form-container {
  max-width: 500px;
  margin: 2em auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 1em;
}

.form-group {
  margin-bottom: 1.5em;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  color: #555;
  margin-bottom: 0.5em;
}

.input-field {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.interests-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: 0.5em;
}

.interest-button {
  padding: 0.5em 1em;
  border: 1px solid #007bff;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  color: #007bff;
  background-color: white;
}

.interest-button.selected {
  background-color: #007bff;
  color: white;
}

.interest-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.selected-interests {
  font-size: 0.9em;
  color: #555;
  margin-top: 0.5em;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 1em;
  margin-top: 1em;
}

.button {
  flex: 1;
  padding: 0.75em;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button.primary {
  background-color: #007bff;
  color: white;
}

.button.primary:hover {
  background-color: #0056b3;
}

.button.secondary {
  background-color: #f44336;
  color: white;
}

.button.secondary:hover {
  background-color: #d32f2f;
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>