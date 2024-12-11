<template>
  <div>
   
    <div v-if="activities.length > 0" class="flex flex-wrap gap-[2rem] justify-between my-6 mx-4">
      <div v-for="activity in activities" :key="activity.id" class="flex gap-4 items-center">
          
                <span class="flex flex-col items-start border-[.15rem] border-white text-white px-6 py-1 text-[24px] font-bold rounded-lg">{{activity.start_time.replace('T', ' ').split(' ')[0].split('-')[2] }} <br>{{activity.start_time.replace('T', ' ').split(' ')[0].split('-')[1] }}</span>
                <div class="flex flex-col text-white">
                  <h1 class="text-[20px] font-bold w-[14rem]">{{ activity.name }}</h1>
                  <p class="text-[14px] opacity-50">{{ activity.type }}</p>
                </div>
                <div v class="flex gap-4 text-2xl items-center">
                <p class="text-white">{{ activity.price }}€</p>
                <p class="text-green-600">12/2</p>
                <i class="text-white fa-solid fa-user-group"></i>

                </div>
          </div>
    </div>
    <div v-else>
      <p>You have no upcoming activities.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import { Activity } from '../types';
import { useSessionStore } from '../stores/sessions';





// State to store the list of subscribed activities
const activities = ref<Activity[]>([]);
 // State to track whether the agenda should be shown



// Fetch the subscribed activities for the logged-in user
async function fetchUserAgenda(userId: string) {
  
  // Log the userId being passed to check if it is valid
  console.log("Fetching subscriptions for userId:", userId);

  const { data, error } = await supabase
    .from('subscriptions')
    .select('activity_id')
    .eq('userId', userId);

  // Log errors or data if available
  if (error) {
    console.error('Error fetching subscriptions:', error);
    return;
  }

  console.log("Subscriptions data:", data);  // Log the data to check what is returned

  if (!data || data.length === 0) {
    console.log('No subscriptions found for this user.');
    return;
  }
  console.log("LIL");

  // Now fetch the details of each subscribed activity
  if (data && data.length > 0) {
    console.log("Found subscriptions, fetching activities...");
    const activityIds = data.map(sub => sub.activity_id);  // Extract activity IDs from the subscriptions
    console.log("Activity IDs:", activityIds);  // Log the activity IDs
    
    const { data: activitiesData, error: activitiesError } = await supabase
      .from('activity')
      .select('*')
      .in('id', activityIds);  // Fetch the activities by their IDs

    if (activitiesError) {
      console.error('Error fetching activities:', activitiesError);
    } else {
      console.log("Fetched activities:", activitiesData);
      activities.value = activitiesData;
    }
  } else {
    console.log("No subscriptions found for this user.");
  }
}


const actDate = activities.value
const sessionStore = useSessionStore();
// Fetch the user's agenda when the component is mounted
onMounted(() => {
  // Fetch the agenda using the username prop passed from the parent component
  fetchUserAgenda(sessionStore.userId);
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 5px;
}

strong {
  font-size: 1.2em;
}

p {
  margin: 0.5em 0;
}
</style>
