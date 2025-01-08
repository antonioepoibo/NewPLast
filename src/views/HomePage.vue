<template>
    <div>
      <div v-if="sessionStore.isLoggedIn" class="relative z-20 flex flex-col h-full gap-6">
          <SearchBar :username="sessionStore.username" v-model:searchQuery="searchQuery" />
      </div>
      <div v-if="sessionStore.isLoggedIn" class="container flex flex-col gap-4 mt-6">
        <!-- Activities Section -->
        <div class="flex flex-col">
          <div class="flex justify-between">
            <h2 class="text-white text-[30px] font-bold max-[500px]:text-[18px]">Vos prochaines activités</h2>
            <button @click="toggleAgenda" class="btn btn-primary">Show Your Agenda</button>
          </div>
          <UserAgenda v-if="showAgenda" :username="sessionStore.username" />

        </div>

          <!-- Activities List -->
        <div v-if="activities.length" class="flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h2 class="text-white text-[30px] font-bold max-[500px]:text-[18px]">Activités pour vous</h2>
            <router-link to="/activite/add" class="text-white opacity-50 duration-100 max-[500px]:text-[10px] hover:opacity-100">Add Activity</router-link>
          </div>
          <div class="overflow-hidden">
            <div v-if="windowWidth >= 400" class="flex gap-[2rem] transition-transform duration-700 ease-in-out" :style="{ transform: `translateX(-${ActVcurrentIndex * 101}%)` }">
              <ActivityItem
                v-for="activity in activities"
                :key="activity.id"
                :activity="activity"
                :subscribeToActivity="subscribeToActivity"
              />
            </div>
            <div v-if="windowWidth <= 400" class="flex gap-[2rem] transition-transform duration-700 ease-in-out" :style="{ transform: `translateX(-${ActVcurrentIndex * 107}%)` }">
              <ActivityItem
                v-for="activity in activities"
                :key="activity.id"
                :activity="activity"
                :subscribeToActivity="subscribeToActivity"
              />
            </div>
          </div>
          <div class="flex gap-4 justify-center items-center">
            <p @click="moveLeftActV" class="relative text-white fa-solid fa-arrow-left arrow"></p>
            <span v-if="windowWidth >= 400" v-for="i in ActVmaxIndex" :id="i.toString()" @click="setNewIActV(i)" :class="{'opacity-50': i !== ActVcurrentIndex + 1 }" class="bg-white flex w-[0.8rem] h-[0.8rem] rounded-full"></span>
            <p v-if="windowWidth >= 400" @click="moveRightActV" class="relative text-white fa-solid fa-arrow-right arrow"></p>
            
            <span v-if="windowWidth <= 400" v-for="i in activities.length" :id="i.toString()" @click="setNewActVI(i)" :class="{'opacity-50': i !== ActVcurrentIndex + 1 }" class="bg-white flex w-[0.8rem] h-[0.8rem] rounded-full"></span>
            <p v-if="windowWidth <= 400" @click="moveRightActVI" class="relative text-white fa-solid fa-arrow-right arrow"></p>

          </div>
        </div>
        <div class="">
          <div class="flex justify-between items-center">
            <h4 class="text-white text-[30px] font-bold max-[600px]:text-[20px] max-[400px]:text-[18px]">Activités autour de chez vous</h4>
            <router-link to="/finder" class="text-white opacity-50 duration-100 hover:opacity-100 max-[400px]:text-[12px]">Finder</router-link> 
          </div>
          <MapPin :acvitivitesUser="activities" :width="width" :height="height" :class="{'mb-[8rem]': windowWidth <= 400}" />
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, onUnmounted } from 'vue';
//@ts-ignore
import { supabase } from '../supabase';
import ActivityItem from '../components/ActivityItem.vue';
import UserAgenda from '../components/UserAgenda.vue';
import { Activity } from '../type';
import { useRouter, useRoute } from 'vue-router';
import { useSessionStore } from '../stores/sessions';
//@ts-ignore
import MapPin from '../components/MapPin.vue';
//@ts-ignore
import SearchBar from '../components/SearchBar.vue';


// Reactive state
const sessionStore = useSessionStore();
const router = useRouter();
const showForm = ref(false);
const activities = ref<Activity[]>([]);
//@ts-ignore
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
const showAgenda = ref(true);
const  width = ref('100%'),
height = ref('500px');
const ActVcurrentIndex = ref<number>(0);
const ActVmaxIndex = ref<number>(0);
const allActivities = ref<Array<any>>([]);
const searchQuery = ref(''); // Reactive state in the parent
const interest = ref<Array<any>>([]);
const windowWidth = ref(window.innerWidth);

function updateWindowWidth() {
  windowWidth.value = window.innerWidth;
}

    async function getAllActivities(): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('activity')
      .select('*');

    if (error) {
      console.error('Erreur lors de la récupération des activités:', error.message);
      return;
    }

    if (data) {
      allActivities.value = data;
      calcMaxIndexActV(); // Recalculer les indices après la récupération des données
    }
  } catch (err) {
    console.error('Erreur inattendue:', err);
  }
}

function calcMaxIndexActV(): void {
  if (allActivities.value.length < 3) {
    ActVmaxIndex.value = 1;
  } else {
    ActVmaxIndex.value = Math.ceil(allActivities.value.length / 3);
    console.log("ActVmaxIndex", ActVmaxIndex.value);
  }
}


function moveLeftActV(): void {
  if (ActVcurrentIndex.value > 0) {
    ActVcurrentIndex.value--;
  }
}


function moveRightActV(): void {
  if (ActVcurrentIndex.value < ActVmaxIndex.value - 1) {
    ActVcurrentIndex.value++;
  }
}

function moveRightActVI(): void {
  if (ActVcurrentIndex.value < allActivities.value.length - 1) {
    ActVcurrentIndex.value++;
  }
}

function setNewIActV(i: number): void {
  if (i > 0 && i <= ActVmaxIndex.value) {
    ActVcurrentIndex.value = i - 1;
  }
}

function setNewActVI(i: number): void {
  if (i > 0 && i <= allActivities.value.length) {
    ActVcurrentIndex.value = i - 1;
  }
}

onMounted(() => {
  getAllActivities();
  window.addEventListener('resize', updateWindowWidth);

});
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});
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

// Function to fetch activities
async function fetchActivities() {
  const { data, error } = await supabase.from('activity').select('*');
  if (error) console.error(error);
  else{
    const sortedActivities = (data as Activity[]).sort((a, b) => {
      const aInInterest = interest.value.includes(a.type) ? 0 : 1;
      const bInInterest = interest.value.includes(b.type) ? 0 : 1;

      if (aInInterest === bInInterest) {
        // If both activities have the same priority, sort by start_time
        return a.start_time.localeCompare(b.start_time);
      }

      return aInInterest - bInInterest; // Activities matching interest come first
    });

    activities.value = sortedActivities;
    allActivities.value = activities.value;
  } 
}

// Function to filter activities
//@ts-ignore
function filterActivities(allActivities) {
  

  return searchQuery.value 
    //@ts-ignore
    ? allActivities.filter(activity =>
        activity.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    : allActivities;
}

// Watch for changes in searchQuery to update filtered activities
watch(searchQuery, () => {
  activities.value = filterActivities(allActivities.value);
});


// Add activity
async function addActivity() {
  
  const { data, error } = await supabase.from('activity').insert({
    ...form.value,
    owner: sessionStore.mail
  })
  .select();
  const activityId = data[0]?.id
  if (error) {
    console.error('Error adding activity:', error);
  } else if (data) {
    activities.value.push(data[0]);
    subscribeToActivity(activityId);

    resetForm();
    
    showForm.value = false;
  }
}

// Reset the form
function resetForm() {
  //@ts-ignore
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

  if (existingSubscription.length > 0) {
    alert('You are already subscribed to this activity.');
    
    return;
  }

  const { error } = await supabase.from('subscriptions').insert({
    activity_id: activityId,
    userId: sessionStore.userId,
  });


  if (error) {
    console.error('Error subscribing to activity:', error);
  } else {
    alert('Successfully subscribed!');
    const activity = activities.value.find(a => a.id === activityId);
    if (activity) {
      activity.subscribed = true;
    }

    // Trigger re-mount by toggling showAgenda
    showAgenda.value = false;  // Temporarily hide the agenda
    await nextTick();  // Wait for DOM to update
    showAgenda.value = true;  // Show the agenda again to re-render

  }
}


// Monitor session state
onMounted(async () => {
  calcMaxIndexActV();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) console.error('Error getting session:', sessionError);
  
  if (sessionData?.session) {
    sessionStore.setSession(sessionData.session);
    fetchActivities();
  } else {
    sessionStore.clearSession();
  }
  const { data: profileData, error: profileError } = await supabase
      .from('profiles') // Replace with your actual table name
      .select('username, interest')
      .eq('id', sessionStore.userId) // Assuming 'id' is the foreign key for users in the profile table
      .single(); // Fetch a single row

    if (profileError) {
      console.error('Error fetching username:', profileError);
    } else if (profileData) {
      interest.value=profileData.interest.split(', ');
      console.log(interest);
      console.log('Fetched username:', profileData.username);
      sessionStore.setUsername(profileData.username); // Optionally store the username in your session store
    }

  //@ts-ignore
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


<style>
button {
  margin: 1em 0;
  padding: 0.5em;
}
.container{
    margin-left: 17.2rem;
    margin-right: 17.2rem;
    width: auto;
  
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
  .btn {
    font-size: 8px;
    padding-left: .8rem;  /* px-4 */
    padding-right: .8rem; /* px-4 */
    padding-top: 0.5rem;  /* py-2 */
    padding-bottom: 0.5rem; /* py-2 */
    height: 1.25rem;  /* Adjust height for smaller screens */
  }
}

  @media (max-width:1500px){
    .container{
      margin-left: 11rem;
      margin-right: 11rem;
    }
  }

  @media (max-width:1250px){
    .container{
      margin-left: 8rem;
      margin-right: 8rem;
    }
  }


  @media (max-width: 1024px) {
    .container{
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  @media (max-width: 600px) {
    .container{
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  @media (max-width: 480px) {
    .container{
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
</style>
