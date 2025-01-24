<template>
    <div v-if="isReportModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
      <div class="bg-white p-6 rounded-lg w-[90%] max-w-[500px]">
        <h2 class="text-lg font-bold mb-4">Signaler l'activité ou le créateur</h2>
        <textarea
          v-model="reportMessage"
          class="w-full p-3 border rounded mb-4 text-black"
          rows="5"
          placeholder="Entrez votre message..."
        ></textarea>
        <div class="flex justify-end gap-2">
          <button @click="closeModal" class="bg-gray-300 text-black py-2 px-4 rounded">Annuler</button>
          <button @click="submitReport" class="bg-red-600 text-white py-2 px-4 rounded">
            Envoyer le signalement
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useSessionStore } from '../stores/sessions';
  import { supabase } from '../supabase.js'; 

  const sessionStore = useSessionStore();
  const userID = ref('');
  
  const props = defineProps({
    isReportModalOpen: Boolean,
    activity: Object,
    owner: Object,
  });

  console.log(props.owner);

  async function getUserIDwithOwner(){
    const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('lastname', props.owner.split(' ')[1]);

    
    if (error) {
      console.error('Erreur lors de récupération de l\'ID du créateur :', error.message);
      return null;
    }
    
    userID.value = data[0].id;
    console.log('ID du créateur récupéré :', userID.value);
  }
  
  const emit = defineEmits(['update:isReportModalOpen']); // Permet de synchroniser `isReportModalOpen` avec le parent.
  
  const reportMessage = ref('');
  
  // Fermer la modale
  function closeModal() {
    emit('update:isReportModalOpen', false);
  }
  
  // Soumettre le rapport
  async function submitReport() {
    if (!reportMessage.value.trim()) {
      alert('Veuillez écrire un message avant d\'envoyer le signalement.');
      return;
    }
  
    if (!props.activity) {
      alert('L\'activité est introuvable. Impossible de soumettre le signalement.');
      return;
    }
  
    const reportData = {
      activity_id: props.activity,
      reporter_id: userID.value,
      message: reportMessage.value,
      reported_at: new Date().toISOString(),
    };
  
    try {
      const { data, error } = await supabase.from('reports').insert([reportData]);
  
      if (error) {
        console.error('Erreur lors de l\'envoi du signalement :', error.message);
        alert('Échec de l\'envoi du signalement. Veuillez réessayer.');
      } else {
        alert('Merci pour votre signalement. Nous allons le traiter rapidement.');
        reportMessage.value = '';
        closeModal();
      }
    } catch (err) {
      console.error('Une erreur est survenue :', err);
      alert('Une erreur inattendue s\'est produite. Veuillez réessayer.');
    }
  }

  onMounted(() => {
    getUserIDwithOwner();
  });
  </script>
  
  <style scoped>
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
  