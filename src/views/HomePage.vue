<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>Home</h1>

    <!-- Login Form -->
    <LoginComponent v-if="!isLoggedIn" @login="login" />

    <!-- Show Add Activity Button & Form if Logged In -->
    <div v-if="isLoggedIn">
      <h2>Welcome, {{ username }}</h2>
      <button @click="showForm = !showForm">Add Activity</button>

      <div v-if="showForm">
        <AddActivityForm
          :form="form"
          :addActivity="addActivity"
        />
      </div>
    </div>

    <!-- Activities List -->
    <div v-if="activities.length">
      <h2>Activities</h2>
      <div v-for="activity in activities" :key="activity.id">
        <ActivityItem
          :activity="activity"
          :subscribeToActivity="subscribeToActivity"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import LoginComponent from './components/LoginComponent.vue';
import AddActivityForm from './components/AddActivityForm.vue';
import ActivityItem from './components/ActivityItem.vue';  // Import the new ActivityItem component
import { Activity } from '../types';

// State management
const showForm = ref(false);
const isLoggedIn = ref(false);  // Track whether the user is logged in or not
const username = ref('');  // User's name input
const form = ref<Activity>({
  name: 'Preconfigured Activity - Yoga Class',
  type: 'Fitness',
  location: 'Central Park',
  start_time: '2024-12-01T09:00',
  end_time: '2024-12-01T10:00',
  price: 20,
  discount: 10,
  max_participants: 20,
  deadline: '2024-11-30T23:59'
});
const activities = ref<Activity[]>([]);

// Handle login from LoginComponent
async function login(userName: string) {
  username.value = userName;
  isLoggedIn.value = true;

  // Insert user into the subscriptions table
  const { data, error } = await supabase.from('subscriptions').insert([
    { user_name: username.value }
  ]);

  if (error) {
    console.error('Error logging in:', error);
  } else {
    console.log('User logged in:', data);
  }
}

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
  }).select('*');

  if (error) {
    console.error(error);
  } else if (data) {
    activities.value.push(data[0]);
    resetForm();
    showForm.value = false;
  }
}

// Reset the form after submission
function resetForm() {
  form.value = {
    name: 'Preconfigured Activity - Yoga Class',
    type: 'Fitness',
    location: 'Central Park',
    start_time: '2024-12-01T09:00',
    end_time: '2024-12-01T10:00',
    price: 20,
    discount: 10,
    max_participants: 20,
    deadline: '2024-11-30T23:59'
  };
}

// Subscribe user to an activity
async function subscribeToActivity(activityId: number) {
  if (!isLoggedIn.value) {
    alert('Please log in to subscribe to this activity.');
    return;
  }

  const { data, error } = await supabase.from('subscriptions').insert({
    activity_id: activityId,
    user_name: username.value
  });

  if (error) {
    console.error(error);
  } else {
    const activity = activities.value.find(a => a.id === activityId);
    if (activity) {
      activity.subscribed = true;
    }
  }
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
</style>
