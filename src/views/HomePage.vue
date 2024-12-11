<template>
  <img :src="fond" class="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-auto object-cover" alt="Fond d'écran">

  <div class="relative z-20 flex w-full flex-col h-full gap-6">
    <router-link to="/" v-if="!isLoggedIn"><img :src="newP" class="w-[12rem] mt-6 m-auto" alt=""></router-link>

    <!-- Only display Login Form if the user is not logged in -->
    <LoginComponent v-if="!isLoggedIn" @login="login" />

    <!-- Show content only when the user is logged in -->
    <div v-else>
      <div class="flex flex-col gap-6 items-center w-[100%] justify-center m-auto">
        <div class="relative z-20 flex flex-col h-full w-full overflow-hidden gap-6">
          <div class="flex justify-between w-full h-[auto] bg-[#021925] py-6 px-[10rem] max-[600px]:px-[6rem] max-[600px]:py-3">
            <div class="flex gap-10 items-center text-white text-[18px] flex-shrink-0">
              <router-link to="/"><img :src="newP" class="w-[8rem] hover:opacity-50 duration-200 hover:underline max-[600px]:w-[6rem]" alt=""></router-link>
              <router-link to="/" class="max-[1100px]:hidden "><p class="hover:opacity-50 duration-200 hover:underline text-white">Home</p></router-link>
              <router-link to="/agenda" class="max-[1100px]:hidden"><p class="hover:opacity-50 duration-200 hover:underline text-white">Agenda</p></router-link>
              <router-link to="/finder" class="max-[1100px]:hidden"><p class="hover:opacity-50 duration-200 hover:underline text-white">Finder</p></router-link>
              <router-link to="/message" class="max-[1100px]:hidden"><p class="hover:opacity-50 duration-200 hover:underline text-white">Message</p></router-link>
            </div>
            <div class="flex gap-10 items-center text-white text-[18px] flex-shrink-0">
              <router-link to="/activite/add/" class="max-[1100px]:hidden"><i class="fa-solid fa-plus text-[24px]"></i></router-link>
              <router-link to="/profil"><img class="rounded-full w-[4rem] h-[4rem] object-cover" :src="image_url" alt=""></router-link>
              <button @click="logout" class="max-[1100px]:hidden"><i class="text-red-600 text-[24px] hover:text-red-400 duration-200 fa-solid fa-arrow-right-from-bracket"></i></button>
              <div id="spanCont" class="flex flex-col gap-2 hidden">
                <span class="flex w-6 h-[3px] bg-white rounded-full"></span>
                <span class="flex w-8 h-[3px] bg-white rounded-full"></span>
                <span class="flex w-6 h-[3px] bg-white rounded-full"></span>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-6 items-center justify-center m-auto">
              <div class="flex flex-col justify-center items-center">
              <h1 class="text-[30px] font-bold text-white max-[600px]:text-[20px]">Bienvenue {{ username.split('.')[0] }} !</h1>
              <p class="italic text-white">Content de vous revoir !</p>
              </div>
          </div>
        </div>
        <div class="flex gap-4 items-center border border-white rounded-full px-10 py-2 bg-white">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" class="bg-transparent border-transparent w-[20rem] max-[600px]:w-[10rem] max-[600px]:text-[12px]" placeholder="Que faire aujourd'hui ?">
        <i class="fa-solid fa-align-left"></i>
      </div>
      <div class="flex gap-6 text-center max-[600px]:gap-2">
        <span class="btn">Cinéma</span>
        <span class="btn">Bowling</span>
        <span class="btn ">Foot</span>
        <span class="btn ">Soirée bar</span>
        <span class="btn ">Paintball</span>
        <span class="btn">Lazer Game</span>
    </div>
    </div>
    <div class="containers">
      <div class="container flex flex-col gap-6">
        <div class="flex justify-between">
          <h2 class="text-white text-[30px] font-bold max-[600px]:text-[20px]">Vos prochaine activités</h2>
          <button class="text-white opacity-50 duration-100 hover:opacity-100 max-[600px]:text-[12px] flex items-center"  @click="showForm = !showForm">Add Activity</button>
          <!-- <router-link to="/" class="text-white opacity-50 duration-100 hover:opacity-100">Voir tout</router-link> -->
        </div>
      </div>
        <!-- Add Activity Form -->
        <div v-if="showForm">
          <AddActivityForm
            :form="form"
            :addActivity="addActivity"
          />
        </div>

        <!-- User's Agenda Component -->
        <UserAgenda v-if="isLoggedIn" :username="username" />
*        <!-- All Activities List -->
        <div v-if="activities.length">
        <div class="flex justify-between">
          <h2 class="text-white text-[30px] font-bold">All Activities</h2>
          <button class="text-white opacity-50 duration-100 hover:opacity-100" @click="showForm = !showForm">Add Activity</button>

        </div>
          <div class="flex gap-6 overflow-hidden">
            <div v-for="activity in activities" :key="activity.id">
              <ActivityItem
                :activity="activity"
                :subscribeToActivity="subscribeToActivity"
              />
            </div>
          </div>
        </div>
        <div id="map-container" class="w-full flex-grow"></div>
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
import fond from '../assets/img/fond.svg';
import newP from '../assets/img/newP_logo.svg'

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
const image_url = 'https://gujeiecqangbzroveklt.supabase.co/storage/v1/object/public/Images/default_img.png'

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
  margin-top: 1em;

}

.btn{
  border: 0.1rem solid white;
  font-size: 14px;
  width: auto;
  padding-left: 1.5rem;  /* px-6 */
  padding-right: 1.5rem; /* px-6 */
  padding-top: 0.75rem;  /* py-3 */
  padding-bottom: 0.75rem; /* py-3 */
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: white;
  height: 1.5rem;
  border-radius: 9999px; /* rounded-full */
  opacity: 0.5;
  transition-duration: 200ms;
}
.btn:hover{
  opacity: 1;
}


@media (max-width: 1100px) {
  #spanCont{
    display: flex !important;
  }
}

@media (max-width: 860px){
  .btn {
    font-size: 10px;
    padding-left: 1rem;  /* px-8 */
    padding-right: 1rem; /* px-8 */
    padding-top: 0.625rem;  /* py-3 */
    padding-bottom: 0.625rem; /* py-3 */
    height: 1rem;  /* Adjust height for smaller screens */
  }
}

@media (max-width: 600px) {
  #spanCont {
    display: none !important;
  }
  .btn {
    font-size: 8px;
    padding-left: .8rem;  /* px-4 */
    padding-right: .8rem; /* px-4 */
    padding-top: 0.5rem;  /* py-2 */
    padding-bottom: 0.5rem; /* py-2 */
    height: 1.25rem;  /* Adjust height for smaller screens */
  }
}

</style>



