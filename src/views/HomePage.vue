<template>
  <div>
    <h1>Home</h1>

    <!-- Only display Login Form if the user is not logged in -->
    <LoginComponent v-if="!isLoggedIn" @login="login" />

    <!-- Show content only when the user is logged in -->
    <div v-else>
      <h2>Welcome, {{ username }}</h2>
      <button @click="showForm = !showForm">Add Activity</button>

      <!-- Logout Button -->
      <button @click="logout" style="margin-left: 1em;">Logout</button>

      <!-- Add Activity Form -->
      <div v-if="showForm">
        <AddActivityForm
          :form="form"
          :addActivity="addActivity"
        />
      </div>

      <!-- User's Agenda Component -->
      <UserAgenda v-if="isLoggedIn" :username="username" />

      <!-- All Activities List -->
      <div v-if="activities.length">
        <h2>All Activities</h2>
        <div v-for="activity in activities" :key="activity.id">
          <ActivityItem
            :activity="activity"
            :subscribeToActivity="subscribeToActivity"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import LoginComponent from '../components/LoginComponent.vue';
import AddActivityForm from '../components/AddActivityForm.vue';
import ActivityItem from '../components/ActivityItem.vue';
import UserAgenda from '../components/UserAgenda.vue';  // Import UserAgenda
import { Activity } from '../types';

// State management
const showForm = ref(false);
const isLoggedIn = ref(false);
const username = ref('');
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
}

// Handle logout
function logout() {
  isLoggedIn.value = false;
  username.value = '';
  alert('You have logged out.');
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
    deadline: form.value.deadline,
    owner: username.value
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
