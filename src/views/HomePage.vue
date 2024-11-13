<template>
  <div>
    <h1>Home</h1>
    <button @click="showForm = !showForm">Add Activity</button>

    <div v-if="showForm">
      <form @submit.prevent="addActivity">
        <div>
          <label for="name">Activity Name</label>
          <input id="name" v-model="form.name" placeholder="e.g., Yoga Class" required />
        </div>
        
        <div>
          <label for="type">Type</label>
          <input id="type" v-model="form.type" placeholder="e.g., Fitness" required />
        </div>
        
        <div>
          <label for="location">Location</label>
          <input 
            id="location" 
            v-model="form.location" 
            placeholder="e.g., Central Park"
            @input="fetchLocationSuggestions"
            required 
          />
          <ul v-if="locationSuggestions.length" class="suggestions-list">
            <li 
              v-for="(suggestion, index) in locationSuggestions" 
              :key="index"
              @click="selectLocation(suggestion)">
              {{ suggestion.place_name }}
            </li>
          </ul>
          <p v-if="locationError" class="text-red-500">{{ locationError }}</p>
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
          <label for="price">Price</label>
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

    <div v-if="activities.length" class="text-3xl font-semibold text-gray-900 text-center">
      <h2>Activities</h2>
      <div v-for="activity in activities" :key="activity.id" class="activity">
        <p><strong>{{ activity.name }}</strong> - {{ activity.type }}</p>
        <p>{{ activity.location }}</p>
        <p>{{ activity.start_time }} to {{ activity.end_time }}</p>
        <p>Price: ${{ activity.price }} (Discount: {{ activity.discount }}%)</p>
        <p>Max Participants: {{ activity.max_participants }}</p>
        <p>Deadline: {{ activity.deadline }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import mapboxgl from 'mapbox-gl';

interface Activity {
    id?: number;
    name: string;
    type: string;
    location: string;
    start_time: string;
    end_time: string;
    price: number;
    discount: number;
    max_participants: number;
    deadline: string;
    longitude?: number;
    latitude?: number;
}

// State management
const showForm = ref(false);
const form = ref<Activity>({
  name: '',
  type: '',
  location: '',
  start_time: '',
  end_time: '',
  price: 0,
  discount: 0,
  max_participants: 0,
  deadline: ''
});
const activities = ref<Activity[]>([]);
const locationSuggestions = ref<any[]>([]); // Store suggestions from Mapbox
const locationError = ref('');

// Mapbox setup
mapboxgl.accessToken = 'pk.eyJ1IjoicG5ndXllbjEyIiwiYSI6ImNtM2ZwdTJ4dzBzM3YyanIzMHM2bHNiNHoifQ._n6g1Z7ti29lquFEJrPDog'; // Replace with your Mapbox API key

// Fetch existing activities from Supabase
async function fetchActivities() {
  const { data, error } = await supabase.from('activity').select('*');
  if (error) console.error(error);
  else activities.value = data as Activity[];
}

// Add new activity to Supabase
async function addActivity() {
  const { data, error } = await supabase.from('activity').insert({
    name: form.value.name,
    type: form.value.type,
    location: form.value.location,
    start_time: form.value.start_time,
    end_time: form.value.end_time,
    price: form.value.price,
    discount: form.value.discount,
    max_participants: form.value.max_participants,
    deadline: form.value.deadline,
    latitude: form.value.latitude,
    longitude: form.value.longitude
  }).select('*'); // Fetch the inserted record
  
  if (error) {
    console.error(error);
  } else if (data) {
    // Add the new activity to the local activities list and display it immediately
    activities.value.push(data[0]);  
    resetForm();
    showForm.value = false;
  }
}

// Reset the form after submission
function resetForm() {
  form.value = {
    name: '',
    type: '',
    location: '',
    start_time: '',
    end_time: '',
    price: 0,
    discount: 0,
    max_participants: 0,
    deadline: ''
  };
}

// Fetch location suggestions from Mapbox
async function fetchLocationSuggestions() {
  if (!form.value.location.trim()) {
    locationSuggestions.value = [];
    return;
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(form.value.location)}.json?access_token=${mapboxgl.accessToken}&limit=5`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length) {
      locationSuggestions.value = data.features;
      locationError.value = '';
    } else {
      locationSuggestions.value = [];
      locationError.value = 'No matching location found.';
    }
  } catch (error) {
    console.error(error);
    locationSuggestions.value = [];
    locationError.value = 'Error fetching location suggestions.';
  }
}

// Select location from suggestions and fetch coordinates
function selectLocation(suggestion: any) {
  form.value.location = suggestion.place_name;
  form.value.latitude = suggestion.geometry.coordinates[1];
  form.value.longitude = suggestion.geometry.coordinates[0];
  locationSuggestions.value = []; // Clear suggestions after selection
}

// Fetch activities on component mount
onMounted(() => {
  fetchActivities();
});
</script>

<style scoped>
button {
  margin-top: 1em;
}
.activity {
  margin-top: 1em;
  padding: 1em;
  background: red;
  border-radius: 5px;
}
form div {
  margin-bottom: 1em;
}
label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}
input {
  padding: 0.5em;
  width: 100%;
  box-sizing: border-box;
}
.suggestions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border: 1px solid #ccc;
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}
.suggestions-list li {
  padding: 0.5em;
  cursor: pointer;
}
.suggestions-list li:hover {
  background-color: #f0f0f0;
}
</style>
