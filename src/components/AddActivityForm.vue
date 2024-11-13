<!-- src/components/AddActivityForm.vue -->
<template>
    <div>
      <form @submit.prevent="addActivity">
        <div>
          <label for="name">Activity Name</label>
          <input id="name" v-model="form.name" placeholder="e.g., Yoga Class" required />
        </div>
        
        <div>
          <label for="type">Type</label>
          <input id="type" v-model="form.type" placeholder="e.g., Fitness" required />
        </div>
        
        <div>
          <label for="location">Location</label>
          <input id="location" v-model="form.location" placeholder="e.g., Central Park" required />
        </div>
        
        <div>
          <label for="start_time">Start Time</label>
          <input id="start_time" type="datetime-local" v-model="form.start_time" required />
        </div>
        
        <div>
          <label for="end_time">End Time</label>
          <input id="end_time" type="datetime-local" v-model="form.end_time" required />
        </div>
        
        <div>
          <label for="price">Price</label>
          <input id="price" type="number" v-model="form.price" placeholder="e.g., 20" required />
        </div>
        
        <div>
          <label for="discount">Discount (%)</label>
          <input id="discount" type="number" v-model="form.discount" placeholder="e.g., 10" />
        </div>
        
        <div>
          <label for="max_participants">Max Participants</label>
          <input id="max_participants" type="number" v-model="form.max_participants" placeholder="e.g., 20" required />
        </div>
        
        <div>
          <label for="deadline">Registration Deadline</label>
          <input id="deadline" type="datetime-local" v-model="form.deadline" required />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue';
  import { Activity } from '../types'; // Create an interface for Activity
  
  // Define props to receive data and methods from parent component
  const props = defineProps({
    form: {
      type: Object as () => Activity,
      required: true,
    },
    addActivity: {
      type: Function,
      required: true,
    },
  });
  
  // Handle form submission (the parent component will handle the logic)
  </script>
  
  <style scoped>
  form div {
    margin-bottom: 1em;
  }
  label {
    display: block;
    margin-bottom: 0.5em;
    font-weight: bold;
  }
  input {
    padding: 0.5em;
    width: 100%;
    box-sizing: border-box;
  }
  </style>
  