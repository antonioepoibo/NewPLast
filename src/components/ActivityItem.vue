<!-- src/components/ActivityItem.vue -->
<template>
    <div class="activity">
  <p><strong>{{ activity.name }}</strong> - {{ activity.type }}</p>
  <p>{{ activity.location }}</p>
  <p>{{ activity.start_time }} to {{ activity.end_time }}</p>
  <p>Price: ${{ activity.price }} (Discount: {{ activity.discount }}%)</p>
  <p>Max Participants: {{ activity.max_participants }}</p>
  <p>Deadline: {{ activity.deadline }}</p>
  <p>Owner: {{ activity.owner }}</p>
  
  <!-- Only show the subscribe button if user is not the owner and is not subscribed -->
  <button 
    v-if="!activity.subscribed && !activity.isOwner"
    @click="subscribeToActivity(activity.id)"
  >
    Subscribe
  </button>
  
  <!-- Display appropriate messages based on subscription and ownership status -->
  <p v-else-if="activity.subscribed">You are subscribed to this activity!</p>
  <p v-else-if="activity.isOwner">You are the creator of this activity.</p>
</div>

  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { Activity } from '../types';
  
  // Define the props for the ActivityItem component
  const props = defineProps({
    activity: {
      type: Object as () => Activity,
      required: true
    },
    subscribeToActivity: {
      type: Function,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .activity {
    margin-top: 1em;
    padding: 1em;
    background-color: #f9f9f9;
    border-radius: 5px;
  }
  
  button {
    margin-top: 1em;
  }
  </style>
  