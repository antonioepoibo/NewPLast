<template>
  <div>
    <!-- Button to show/hide the agenda -->
    <button @click="toggleAgenda" class="agenda-button">
      My Agenda
    </button>

    <!-- Show agenda only when showAgenda is true -->
    <div v-if="showAgenda">
      <h2>Your Agenda</h2>
      
      <!-- If there are activities, show them in a calendar -->
      <div v-if="activities.length > 0">
        <FullCalendar
          :events="events"
          :plugins="calendarPlugins"
          :initialView="'dayGridMonth'"
          @eventClick="handleEventClick"
        />
      </div>

      <!-- If no activities, show a message -->
      <div v-else>
        <p>You have no upcoming activities.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import { Activity } from '../types';

// FullCalendar imports
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// Props
const props = defineProps<{
  username: string;  // This will receive the username from the parent
}>();

// State to control showing the agenda
const showAgenda = ref(false); // Control visibility of the agenda

// State to store the activities and events for the calendar
const activities = ref<Activity[]>([]);
const events = ref<any[]>([]);

// FullCalendar plugins
const calendarPlugins = [dayGridPlugin, interactionPlugin];

// Fetch activities for the logged-in user
async function fetchUserAgenda(username: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('activity_id')
    .eq('user_name', username);  // Fetch activities by the logged-in username
  
  if (error) {
    console.error('Error fetching subscriptions:', error);
    return;
  }

  if (data && data.length > 0) {
    const activityIds = data.map(sub => sub.activity_id);  // Extract activity IDs from subscriptions
    const { data: activitiesData, error: activitiesError } = await supabase
      .from('activity')
      .select('*')
      .in('id', activityIds);  // Fetch activities by IDs

    if (activitiesError) {
      console.error('Error fetching activities:', activitiesError);
    } else {
      activities.value = activitiesData;
      mapActivitiesToCalendarEvents(activities.value);  // Map to calendar events
    }
  }
}

// Map activities to FullCalendar events format
function mapActivitiesToCalendarEvents(activities: Activity[]) {
  events.value = activities.map(activity => ({
    title: activity.name,
    start: formatDate(activity.start_time),  // Format the start date
    end: formatDate(activity.end_time),      // Format the end date
    description: activity.location,
    extendedProps: {
      price: activity.price,
      discount: activity.discount
    }
  }));
}

// Format date to ISO string (if required)
function formatDate(date: string) {
  const isoDate = new Date(date).toISOString();
  return isoDate;
}

// Fetch user agenda when the component is mounted
onMounted(() => {
  fetchUserAgenda(props.username);
});

// Handle event click on FullCalendar
function handleEventClick(info: any) {
  alert(`Activity: ${info.event.title}\nLocation: ${info.event.extendedProps.description}`);
}

// Toggle visibility of the agenda
function toggleAgenda() {
  showAgenda.value = !showAgenda.value; // Toggle agenda visibility
}
</script>

<style scoped>
.agenda-button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
}

.agenda-button:hover {
  background-color: #0056b3;
}

/* Styling for the agenda */
h2 {
  font-size: 1.5em;
}

.fc-daygrid-day-number {
  font-size: 14px;
  padding: 3px;
}

.fc-daygrid-event {
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  padding: 5px;
}
</style>
