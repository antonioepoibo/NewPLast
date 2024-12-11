<template>
  <div>
    <h1>Home</h1>
    <img
      :src="fond"
      class="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-auto object-cover"
      alt="Fond d'écran"
    />

    <div class="relative z-20 flex w-full flex-col h-full gap-6">
      <router-link to="/"><img :src="newP" class="w-[12rem] mt-6 m-auto" alt="Logo"></router-link>

      <!-- Display Login Form if the user is not logged in -->
      <LoginComponent v-if="!sessionStore.isLoggedIn" @login="login" />

      <!-- Show content when the user is logged in -->
      <div v-else>
        <h2>Welcome, {{ sessionStore.mail }}</h2>

        <!-- Account button -->
        <button @click="goToAccountPage" style="margin-top: 1em;">Account</button>

        <!-- Add Activity Button -->
        <button @click="toggleActivityForm" style="margin-top: 1em;">Add Activity</button>

        <!-- Logout Button -->
        <button @click="logout" style="margin-left: 1em;">Logout</button>

        <!-- Add Activity Form -->
        <div v-if="showForm">
          <AddActivityForm :form="form" @submit="addActivity" />
        </div>

        <button @click="toggleAgenda" class="btn btn-primary">Show Your Agenda</button>
    
      <UserAgenda v-if="showAgenda" :username="sessionStore.mail" />
      </div>

      <!-- Search Bar -->
      <div class="flex gap-4 items-center border border-white rounded-full px-10 py-2 bg-white">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" class="bg-transparent border-transparent w-[20rem]" placeholder="Que faire aujourd'hui ?">
        <i class="fa-solid fa-align-left"></i>
      </div>

      <!-- Suggested Categories -->
      <div class="flex gap-6 text-center">
        <span
          v-for="category in categories"
          :key="category"
          class="border-[.1rem] text-[14px] border-white w-[auto] px-6 py-3 flex items-center text-nowrap text-white h-[1.5rem] rounded-full opacity-50 duration-200 hover:opacity-100">
          {{ category }}
        </span>
      </div>

      <!-- Activities Section -->
      <div class="container flex flex-col gap-6">
        <div class="flex justify-between">
          <h2 class="text-white text-[30px] font-bold">Vos prochaines activités</h2>
          <button class="text-white opacity-50 duration-100 hover:opacity-100" @click="toggleActivityForm">Add Activity</button>
        </div>

        <!-- Activities List -->
        <div v-if="activities.length">
          <h2>All Activities</h2>
          <div class="flex gap-6 overflow-hidden">
            <ActivityItem
              v-for="activity in activities"
              :key="activity.id"
              :activity="activity"
              :subscribeToActivity="subscribeToActivity"
            />
          </div>
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
import UserAgenda from '../components/UserAgenda.vue';
import { Activity } from '../types';
import { useRouter } from 'vue-router';
import { useSessionStore } from '../stores/sessions';
import fond from '../assets/img/fond.svg';
import newP from '../assets/img/newP_logo.svg';

// Reactive state
const sessionStore = useSessionStore();
const router = useRouter();
const showForm = ref(false);
const activities = ref<Activity[]>([]);
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
const categories = ['Cinéma', 'Bowling', 'Foot', 'Soirée bar', 'Paintball', 'Lazer Game'];
const showAgenda = ref(false);

// Toggle the agenda visibility
function toggleAgenda() {
  showAgenda.value = !showAgenda.value;

  
}

// Toggle activity form
function toggleActivityForm() {
  showForm.value = !showForm.value;
}

// Logout function
function logout() {
  sessionStore.clearSession();
  alert('You have logged out.');
}

// Navigate to Account page
function goToAccountPage() {
  router.push({ name: 'Account' });
}

// Fetch activities
async function fetchActivities() {
  const { data, error } = await supabase.from('activity').select('*');
  if (error) console.error(error);
  else activities.value = data as Activity[];
}

// Add activity
async function addActivity() {
  const { data, error } = await supabase.from('activity').insert({
    ...form.value,
    owner: sessionStore.mail
  });

  if (error) {
    console.error('Error adding activity:', error);
  } else if (data) {
    activities.value.push(data[0]);
    resetForm();
    showForm.value = false;
  }
}

// Reset the form
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

// Subscribe to activity
async function subscribeToActivity(activityId: number) {
  
  if (!sessionStore.isLoggedIn) {
    alert('Please log in to subscribe to this activity.');
    return;
  }

  const { data: existingSubscription, error: fetchError } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('activity_id', activityId)
    .eq('userId', sessionStore.userId);

  if (fetchError) {
    console.error('Error checking subscription:', fetchError);
    alert('An error occurred while checking your subscription. Please try again later.');
    return;
  }

  if (existingSubscription) {
    alert('You are already subscribed to this activity.');
    return;
  }

  const { error } = await supabase.from('subscriptions').insert({
    activity_id: activityId,
    userId: sessionStore.userId,
    // user_name: sessionStore
  });

  if (error) {
    console.error('Error subscribing to activity:', error);
  } else {
    alert('LOL');
    const activity = activities.value.find(a => a.id === activityId);
    if (activity) {
      activity.subscribed = true;

    }
  }
  
}

// Monitor session state
onMounted(async () => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) console.error('Error getting session:', sessionError);

  if (sessionData?.session) {
    sessionStore.setSession(sessionData.session);
    fetchActivities();
  } else {
    sessionStore.clearSession();
  }

  supabase.auth.onAuthStateChange((event, newSession) => {
    if (event === 'SIGNED_IN' && newSession) {
      sessionStore.setSession(newSession);
      console.log(sessionStore.userId);
      fetchActivities();
    } else if (event === 'SIGNED_OUT') {
      sessionStore.clearSession();
    }
  });
});
</script>

<style scoped>
button {
  margin: 1em 0;
  padding: 0.5em;
}
</style>
