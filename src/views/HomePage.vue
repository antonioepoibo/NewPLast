<template>
  <div>
    <h1>Home</h1>

    <!-- Only display Login Form if the user is not logged in -->
    <LoginComponent v-if="!isLoggedIn" @login="login" />

    <!-- Show content only when the user is logged in -->
    <div v-else>
      <h2>Welcome, {{ username }}</h2>
      <!-- Account button that navigates to the Account page -->
      <button @click="goToAccountPage" style="margin-top: 1em;">Account</button>

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
import { useRouter } from 'vue-router';

// State management
const showForm = ref(false);
const isLoggedIn = ref(false);
const username = ref('');
const session = ref(null);
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

// Handle login state on mount
onMounted(async () => {
  // Listen for changes in auth state
  const { data: session, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.error('Error getting session:', sessionError);
  }

  // If session exists, user is logged in
  if (session?.session) {
    isLoggedIn.value = true;
    username.value = session.session.user.email || '';
  } else {
    isLoggedIn.value = false;
  }

  // Set up auth state change listener
  supabase.auth.onAuthStateChange((event, newSession) => {
  session.value = newSession; // Update session ref
  if (event === 'SIGNED_IN' && newSession?.user) {
    isLoggedIn.value = true;
    username.value = newSession.user.email || '';
    fetchActivities(); // Fetch activities after login
    console.log('Parent session:', session.value);
  } else if (event === 'SIGNED_OUT') {
    isLoggedIn.value = false;
    username.value = '';
  }
});


  // Fetch activities on page load if logged in
  if (isLoggedIn.value) {
    fetchActivities();
  }
});

// Navigation function for Account page
const router = useRouter();
function goToAccountPage() {
  router.push({ name: 'Account', state: { session: session.value } }); // Redirect to account page
}
</script>

<style scoped>
button {
  margin: 1em 0;
  padding: 0.5em;
}
</style>

<style scoped>
button {
  margin-top: 1em;
}
</style>
