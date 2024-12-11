<!-- src/components/ActivityItem.vue -->
<template>
    <div class="">


  <div class="w-[20rem] bg-[#3B5562] py-10 rounded-sm shadow-xl relative max-[1300px]:w-[16rem] max-[1300px]:py-6 max-[920px]:w-[12rem] max-[920px]:py-4">
    <p class="text-white opacity-70 text-[14px]">{{ activity.type }}</p>
    <img src="../assets/img/default_activite.svg" alt="">
    <div class="flex justify-between items-center px-3 pt-4">
      <div class="flex gap-4 items-center">
        <!-- <img src="../assets/img/default_activite.svg" class="rounded-full w-[60px] h-[60px] object-cover" alt="">
         -->
        <div>
          <h2 class="text-white text-[18px] font-bold max-[1300px]:text-[15px] max-[920px]:text-[12px]">{{ activity.owner }}</h2>
            <p class="text-white opacity-50 text-[14px] max-[1300px]:text-[12px] max-[920px]:text-[10px]">Par {{ activity.owner }}</p>
        </div>
      </div>
      <div class="flex flex-col gap-2 justify-start">
        <div class="flex flex-col items-end">
          <p class="text-white opacity-80 text-[14px] max-[1300px]:text-[12px] max-[920px]:text-[10px]">{{ activity.price }} $</p>
          <p class="text-white opacity-50 text-[14px] max-[1300px]:text-[12px] max-[920px]:text-[10px]">{{ activity.location }}</p>
        </div>
      </div>
    </div>
    <div class="flex items-center text-[10px] text-white gap-2 flex-row-reverse px-3">
      <p class="max-[1300px]:text-[12px]">0 /{{ activity.max_participants || 0 }}</p>
      <progress :max="activity.max_participants" :value="0" class="h-2 w-[6rem] max-[920px]:w-[3.8rem]"></progress>
    </div>
    <p class="text-white text-[16px] opacity-80 mt-5 italic max-[1300px]:text-[13px] px-3 max-[920px]:text-[10px]"></p>
    <p>{{ activityStartDate + ' ' + activityStartNum }} to {{ activityEndDate + ' ' + activityEndNum }}</p>
  </div>
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

  const activityStartDate = props.activity.start_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[0];
  const activityStartNum = props.activity.start_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[1];

  const activityEndDate = props.activity.end_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[0];
  const activityEndNum = props.activity.end_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[1];
  </script>
  
  <style scoped>
  .activity {
    margin-top: 1em;
    padding: 1em;
    background-color: #f9f9f9;
    border-radius: 5px;
    width: 20rem;
  }
  
  button {
    margin-top: 1em;
  }
  </style>
  