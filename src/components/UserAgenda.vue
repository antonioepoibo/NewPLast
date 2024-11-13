<template>
  <div>
    <h2>Your Agenda</h2>
    <!-- Check if the user has any subscribed activities -->
    <div v-if="activities.length > 0">
      <ul>
        <li v-for="activity in activities" :key="activity.id">
          <div>
            <strong>{{ activity.name }}</strong> - {{ activity.type }}
            <p>{{ activity.location }}</p>
            <p>{{ activity.start_time }} to {{ activity.end_time }}</p>
            <p>Price: ${{ activity.price }} (Discount: {{ activity.discount }}%)</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- If no activities, show a message -->
    <div v-else>
      <p>You have no upcoming activities.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import { Activity } from '../types';

// Props
const props = defineProps<{
  username: string;  // This will receive the username from the parent
}>();

// State to store the list of subscribed activities
const activities = ref<Activity[]>([]);

// Fetch the subscribed activities for the logged-in user
async function fetchUserAgenda(username: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('activity_id')
    .eq('user_name', username);  // Fetch activities by the logged-in username
  
  if (error) {
    console.error('Error fetching subscriptions:', error);
    return;
  }

  // Now fetch the details of each subscribed activity
  if (data && data.length > 0) {
    const activityIds = data.map(sub => sub.activity_id);  // Extract activity IDs from the subscriptions
    const { data: activitiesData, error: activitiesError } = await supabase
      .from('activity')
      .select('*')
      .in('id', activityIds);  // Fetch the activities by their IDs

    if (activitiesError) {
      console.error('Error fetching activities:', activitiesError);
    } else {
      activities.value = activitiesData;
    }
  }
}

// Fetch the user's agenda when the component is mounted
onMounted(() => {
  // Fetch the agenda using the username prop passed from the parent component
  fetchUserAgenda(props.username);
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
