<!-- src/components/ActivityItem.vue -->
<template>
    <div class="h-[auto] mt-6">
      <div class="relative w-[19rem] h-[28rem] mt-[1rem] cursor-pointer bg-[#3B5562] rounded-sm shadow-xl flex flex-col justify-between max-[500px]:w-[18rem] max-[500px]:h-[26rem] max-[400px]:w-[21rem]">
      <div class="bg-red-600 border-red-800 border-2 rounded-full absolute top-[-1rem] right-[-.7rem] z-60 rotate-12">
        <i @click="openReportModal" class="fa-solid fa-person-circle-exclamation text-white text-[20px] m-2"></i>
      </div>
      <div @click="openChat(activity.id ?? 0)">
          <div class="flex justify-between items-center px-3 py-5 max-[500px]:flex-col gap-2">
          <div class="flex gap-1 items-center flex-nowrap mr-2">
            <p v-for="acti in activity.type.split(',')" :key="acti" class="text-[#3B5562] opacity-70 text-[9px] max-[500px]:text-[7px] flex bg-white py-1 px-3 rounded-full font-bold">{{ acti }}</p>
          </div>
        <p class="text-white opacity-70 text-[6px] italic max-[500px]:text-[5px]">{{ activityStartDate + ' ' + activityStartNum }} -> {{ activityEndDate + ' ' + activityEndNum }}</p>
      </div>
        <img :src="activity.image_url" class="h-[10rem] w-[100%] object-cover max-[500px]:h-[10rem]" alt="">
        <div class="flex justify-between items-center px-3 pt-4">
          <div class="flex gap-4 items-center">
            <img @click="$router.push(`/friendsprofile?profildata=${activity.owner}`)" src="https://tnrusogdplqbithagiji.supabase.co/storage/v1/object/public/profile-pictures/default_img.png" class="rounded-full w-[60px] h-[60px] object-cover max-[500px]:hidden" alt="">
            <div>
              <h2 class="text-white text-[14px] font-bold max-[500px]:text-[10px]">{{ activity.name }}</h2>
                <p class="text-white opacity-50 text-[10px] max-[500px]:text-[8px]">Par {{ activity.owner.split('@')[0] }}</p>
            </div>
          </div>
          <div class="flex flex-col gap-2 justify-start w-[6rem]">
            <div class="flex flex-col items-end">
              <p class="text-white opacity-80 text-[12px] max-[500px]:text-[10px]">{{ activity.price }} €</p>
              <div class="flex gap-1 text-white items-center text-[14px] opacity-80">
                <i class="fa-solid fa-people-group"></i> 
                <p>/{{ activity.max_participants || 0 }}</p>
              </div>
              <!-- <p class="text-white opacity-50 text-[10px] max-[500px]:text-[6px] max-[500px]:text-right">{{ activity.location }}</p> -->
            </div>
          </div>
        </div>
        <p class="text-white text-[10x] opacity-80 mt-5 h-[2rem] italic max-[1300px]:text-[11px] px-3 max-[920px]:text-[8px]"> {{ truncateText(activity.desc || defaultText, 100) }}</p>
      </div>
      <div class="py-5 flex justify-center relative z-40">
        

        <!-- Bouton pour signaler
        <button
          @click="openReportModal"
          class="bg-red-600 text-white py-2 text-[14px] px-6 font-bold rounded-full mt-2 max-[500px]:text-[10px] max-[500px]:px-4 max-[500px]:py-1"
        >
          Signaler
        </button> -->
      </div>

      <!-- Modale pour le signalement -->
      <div
        v-if="isReportModalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
        <div class="bg-white p-6 rounded-lg w-[90%] max-w-[500px]">
          <h2 class="text-lg font-bold mb-4">Signaler l'activité ou le créateur</h2>
          <textarea
            v-model="reportMessage"
            class="w-full p-3 border rounded mb-4 text-white"
            rows="5"
            placeholder="Entrez votre message..."
          ></textarea>
          <div class="flex justify-end gap-2">
            <button
              @click="isReportModalOpen = false"
              class="bg-gray-300 text-black py-2 px-4 rounded"
            >
              Annuler
            </button>
            <button
              @click="submitReport"
              class="bg-red-600 text-white py-2 px-4 rounded"
            >
              Envoyer le signalement
            </button>
          </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Activity } from '../type';
import { useSessionStore } from '../stores/sessions';
// @ts-ignore
import {supabase} from '../supabase.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const avatar_url = ref('');
const sessionStore = useSessionStore();
const defaultText = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum nisi facere voluptatibus doloremque accusamus dolore aperiam dolores incidunt veniam nulla nostrum a qui mollitia voluptas, quis aliquid sequi tempore exercitationem?";

function truncateText(text: string, maxLength: number): string {
return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

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

function openChat(id: number) {
console.log(props.activity.owner)
router.push({
  name: 'ChatPage',
  query: { owner: props.activity.owner, activityId: id }, 
});
}

const activityStartDate = props.activity.start_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[0];
const activityStartNum = props.activity.start_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[1].split(':').slice(0, 2).join(':').replace(':', 'h');

const activityEndDate = props.activity.end_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[0];
const activityEndNum = props.activity.end_time.replace('T', ' ').replace('-', '/').replace('-', '/').split(' ')[1].split(':').slice(0, 2).join(':').replace(':', 'h');

// SIGNALEMEMT
const isReportModalOpen = ref(false); // État de la fenêtre modale
const reportMessage = ref(''); // Contient le message saisi par l'utilisateur

function openReportModal() {
  isReportModalOpen.value = true;
}

async function submitReport() {
  if (!reportMessage.value.trim()) {
    alert('Please write a message before sending.');
    return;
  }

  const reportData = {
    activity_id: props.activity.id,
    reporter_id: sessionStore.userId,
    message: reportMessage.value,
    reported_at: new Date().toISOString(),
  };

  const { data, error } = await supabase.from('reports').insert([reportData]);

  if (error) {
    console.error('Error reporting activity:', error.message);
    alert('Failed to send the report. Please try again.');
  } else {
    alert('Thank you for your report. We will review it shortly.');
    reportMessage.value = ''; // Réinitialiser le message
    isReportModalOpen.value = false; // Fermer la fenêtre modale
  }
}
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

/* Styles pour la modale */
.fixed {
  position: fixed;
  z-index: 1000;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

.rounded-lg {
  border-radius: 0.5rem;
}
</style>
