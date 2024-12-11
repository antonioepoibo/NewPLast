<!-- src/components/AddActivityForm.vue -->
<template>
  <div>
    <form @submit.prevent="addActivity">
      <div>
        <label for="name">Activity Name</label>
        <input id="name" v-model="form.name" placeholder="e.g., Yoga Class" required />
      </div>
      
      <div>
        <label for="type">Type</label>
        <input id="type" v-model="form.type" placeholder="e.g., Fitness" required />
      </div>
      
      <!-- Champ pour l'adresse avec Mapbox -->
      <div>
        <label for="location">Location</label>
        <input
          id="location"
          v-model="form.location"
          @input="fetchSuggestions"
          placeholder="e.g., Central Park"
          required
        />
        <!-- Suggestions d'adresses -->
        <ul v-if="suggestions.length" class="suggestions-list">
          <li
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="selectAddress(suggestion)">
            {{ suggestion.place_name }}
          </li>
        </ul>
      </div>
      
      <div>
        <label for="start_time">Start Time</label>
        <input id="start_time" type="datetime-local" v-model="form.start_time" required />
      </div>
      
      <div>
        <label for="end_time">End Time</label>
        <input id="end_time" type="datetime-local" v-model="form.end_time" required />
      </div>
      
      <div>
        <label for="price">Price (EUR)</label>
        <input id="price" type="number" v-model="form.price" placeholder="e.g., 20" required />
      </div>
      
      <div>
        <label for="discount">Discount (%)</label>
        <input id="discount" type="number" v-model="form.discount" placeholder="e.g., 10" />
      </div>
      
      <div>
        <label for="max_participants">Max Participants</label>
        <input id="max_participants" type="number" v-model="form.max_participants" placeholder="e.g., 20" required />
      </div>
      
      <div>
        <label for="deadline">Registration Deadline</label>
        <input id="deadline" type="datetime-local" v-model="form.deadline" required />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';


// Définir votre token Mapbox
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicG5ndXllbjEyIiwiYSI6ImNtM2ZwdTJ4dzBzM3YyanIzMHM2bHNiNHoifQ._n6g1Z7ti29lquFEJrPDog';

// Champs pour gérer l'adresse et les suggestions
const locationInput = ref(''); // Adresse saisie
const suggestions = ref([]);  // Suggestions d'adresses

// Fonction pour récupérer les suggestions via l'API Mapbox
async function fetchSuggestions() {
  if (!locationInput.value) {
    suggestions.value = [];
    return;
  }

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      locationInput.value
    )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true&limit=5`
  );

  const data = await response.json();
  suggestions.value = data.features || [];
}

// Sélectionner une adresse dans la liste
function selectAddress(suggestion) {
  locationInput.value = suggestion.place_name;
  form.location = suggestion.place_name; // Mettre à jour la valeur dans le formulaire
  form.coordinates = suggestion.geometry.coordinates; // Stocker les coordonnées
  suggestions.value = []; // Effacer les suggestions après sélection
}

// Props pour les données et la fonction d'ajout d'activité
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  addActivity: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped>
/* Style le formulaire */
form {
  border: 1px solid #ccc; 
  border-radius: 8px;
  padding: 16px;
  max-width: 800px;
  margin: 16px auto; 
  background-color: #f9f9f9; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  display: flex;
  flex-wrap: wrap; 
  gap: 16px;
}

form div {
  flex: 1 1 calc(50% - 16px); 
  min-width: 200px; 
}

button[type="submit"] {
  flex: 1 1 100%; 
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  background-color: #e0e0e0;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
  color: #333; 
}

input {
  padding: 0.5em;
  width: 100%;
  box-sizing: border-box;
  background-color: #E0E0E0;
  border: 1px solid #ccc; 
  border-radius: 4px; 
}

input:focus {
  border-color: #E0E0E0; 
  outline: none; 
  box-shadow: 0 0 4px #6e6c6b; 
}

button[type="submit"]:hover {
  background-color: #6e6c6b; 
}

/* Style pour les suggestions d'adresses */
.suggestions-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  background: white;
  max-height: 150px;
  overflow-y: auto;
  position: absolute;
  z-index: 1000;
}

.suggestions-list li {
  padding: 8px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}
</style>
