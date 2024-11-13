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
          <input id="location" v-model="form.location" placeholder="e.g., Central Park" required />
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

    <div v-if="activities.length">
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
    deadline: form.value.deadline
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
</style>
