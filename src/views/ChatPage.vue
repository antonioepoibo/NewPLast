<template>
  <div class="chat-page">
    <div v-if="!$route.query.owner || !$route.query.activityId" class="h-[78.8vh]">
      <h1 class="text-white">Avec qui Tchater ?</h1>
    </div>
    
    <div v-if="$route.query.owner && $route.query.activityId" class="container chat-container">
      <div v-for="act in activity" class="bg-[#021925] border border-1 border-b-0 flex w-full max-[500px]:flex-col" :key="act.id">
        <img :src="act.image_url" class="w-[30rem] object-cover p-6 max-[500px]:h-[10rem]" alt="">
        <div class="relative flex justify-between w-full my-6">
          <div class="flex flex-col gap-2 w-[30rem] max-[500px]:w-[90%] max-[500px]:m-auto">
            <div class="">
              <div class="flex gap-4 items-center">
                <p class="text-[30px] font-bold text-white max-[500px]:text-[20px]">{{ act.name }}</p>
                <!-- Affichage du prix -->
                <div class="flex gap-2">
                    <i v-for="n in parseInt(activity[0].price.toString().charAt(0))" class="fa-solid fa-sack-dollar text-white max-[500px]:text-[10px]"></i>
                </div>
              </div>
              <div class="flex gap-4 max-[500px]:items-center">
                <p class="text-white opacity-70 text-[14px] max-[500px]:text-[10px]">Par {{ ownerNames[act.owner] || 'Chargement...' }}</p>
                <p class="text-white opacity-70 text-[14px] max-[500px]:text-[10px]">-</p>
                <p class="text-white opacity-70 text-[14px] max-[500px]:text-[10px]">Le {{ new Date(act.start_time).toLocaleDateString('fr-FR') }} à {{ act.start_time.split('T')[1] }}</p>
              </div>
            </div>
            <div class="flex gap-2 items-center">
              <span class="text-slate-400 cursor-default border border-slate-400 border-1 px-4 rounded-full text-[12px] duration-200 hover:text-white hover:border-white" v-for="desc in act.type.split(',')">{{ desc }}</span>
            </div>
            <div>
              <p class="text-white italic opacity-70 max-[500px]:text-[12px]">"{{ act.desc }}"</p>
            </div>
            <div class="flex gap-2 items-center">
              <div class="flex gap-2">
                <i @click="$router.push(`/friendsprofile?profildata=${avatar.id}`)" :title="avatar.full_name" v-for="avatar in avatarSubscription" class="fa-solid fa-person text-slate-500 hover:text-white duration-200 text-[28px] max-[500px]:text-[20px]"></i>
              </div>
              <p class="text-white text-[28px] max-[500px]:text-[16px]">|</p>
              <div :title="'limite de ' + act.max_participants + ' personne(s)' " class="relative flex gap-2 group">
                <i class="fa-solid fa-people-group text-slate-500 text-[28px] duration-200 group-hover:text-white max-[500px]:text-[20px]"></i>
                <div class="absolute text-center top-[-7px] right-[-7px] w-3 h-3 rounded-full bg-slate-500 duration-200 group-hover:bg-white max-[500px]:w-[.7] max-[500px]:h-[.7]"><p class="text-[8px] text-[#021925] font-bold">{{ act.max_participants }}</p></div>
              </div>
            </div>
            <iframe :src="mapUrl(act.localisation)" width="600" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="rounded-lg max-[500px]:w-full max-[500px]:flex max-[500px]:justify-center"> </iframe>
          </div>
          <div class="relative flex items-center h-[55px] w-[200px] overflow-visible max-[500px]:hidden">
            <img @click="$router.push(`/friendsprofile?profildata=${avatar.id}`)" :title="avatar.full_name" v-for="(avatar, index) in avatarSubscription" :key="avatar.id" :src="avatar.avatar_url" :style="{ left: `${index * 40}px` }" class="absolute w-[55px] h-[55px] rounded-full border-[#021925] border-4" alt="" />
          </div>
        </div>
      </div>
      <div class="relative messages-container h-[15rem]">
        <p class="text-white text-[16px] border border-1 px-6 absolute top-[0px] left-1/2 transform -translate-x-1/2 max-[500px]:text-[12px]">Chat</p>
        <div v-for="message in messages" :key="message.id" class="message-item max-[500px]:text-[16px]">
          <strong>{{ message.sender }}</strong>: {{ message.message }}
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="bg-[#021925] w-full px-4 border border-1 max-[500px]:mb-[5rem] max-[500px]:text-[14px]">
        <input v-model="newMessage" placeholder="Ecrit ton message ici..." class="message-input max-[500px]:w-[10rem] max-[500px]:text-[14px]"/>
        <div class="flex gap-4 max-[500px]:flex-col max-[500px]:items-center max-[500px]:gap-1 max-[500px]:my-2">
          <button @click="sendMessage" type="submit" class="send-button max-[500px]:w-[4.5rem]">Envoyer</button>
          <button type="button" class="repport-button max-[500px]:w-[4.5rem]" @click="openReportModal">Signaler</button>
        </div>
      </form>

      <reportModal
      :isReportModalOpen="isReportModalOpen"
      @close="isReportModalOpen = false"
      :activity="$route.query.activityId"
      :owner="$route.query.owner"
    />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { supabase } from '../supabase.js'; // Make sure to set up and import Supabase client
import { useSessionStore } from '../stores/sessions';
import { useRoute } from 'vue-router';
import reportModal from '../components/reportModal.vue';

const sessionStore = useSessionStore();
const newMessage = ref('');
const messages = ref([]); // Store the messages here
const route = useRoute();
const receiver = route.query.owner;
const activity_id = route.query.activityId;
let messageSubscription;
const activity = ref([]);
const avatarSubscription = ref([]);
const userlenght = ref([]);
const ownerNames = ref({});


// Fetch old messages
async function fetchMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('activity_id', activity_id)
    .order('timestamp', { ascending: true }); // Fetch and order messages by timestamp

  if (error) {
    console.error('Error fetching messages:', error);
    return;
  }
  console.log(messages);
  messages.value = data || [];
}

function mapUrl(url) {
  // Encode le nom de lieu pour qu'il soit compatible avec une URL
  const encodedPlace = encodeURIComponent(url || '');
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2608.1872144012877!2d-0.35533274405310294!3d49.17803399780143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480a429e911bbcb5%3A0x99a93d3f36b06286!2s${encodedPlace}!5e0!3m2!1sfr!2sfr!4v1737710780054!5m2!1sfr!2sfr`;
}

watch(mapUrl);


async function GetActivityById(){
  const {data, error} = await supabase
   .from('activity')
   .select('*')
   .eq('id', activity_id);

   if(error){
    console.error('Error fetching activity:', error);
    return;
   }

   activity.value = data || [];

   // Récupère les noms des propriétaires
   await fetchOwnerNames();
   GetUserWithID();
}

async function fetchOwnerNames() {
  const ownerIds = activity.value.map(act => act.owner);
  
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', ownerIds);

  if (error) {
    console.error('Erreur lors de la récupération des noms des propriétaires:', error);
    return;
  }

  data.forEach(profile => {
    ownerNames.value[profile.id] = profile.full_name;
  });
}



async function GetUserWithID(){
  const {data, error} = await supabase
   .from('subscriptions')
   .select('*')
   .eq('activity_id', activity_id);

   if(error){
    console.error('Error fetching user:', error);
    return;
   } else {
    userlenght.value = data || [];
    console.log('User:', data);
    const userIds = data.map(user => user.userId);
    const { data: avatars, error: avatarError } = await supabase
      .from('profiles')
      .select('avatar_url, full_name, id')
      .in('id', userIds);

    if (avatarError) {
      console.error('Error fetching avatars:', avatarError);
      return;
    }

    avatarSubscription.value = avatars || [];
  }
}

async function sendMessage() {
  if (!newMessage.value.trim()) {
    alert('Please enter a message.');
    return;
  }

  const { error } = await supabase.from('messages').insert({
    sender: sessionStore.username,
    receiver: receiver,
    message: newMessage.value,
    activity_id: activity_id,
  });

  if (error) {
    console.error('Error sending message:', error);
    alert('Failed to send message. Please try again.');
  } else {
    alert('Message sent successfully!');
    newMessage.value = ''; // Clear the input field
    fetchMessages(); // Refresh messages after sending a new one
  }
}

const isReportModalOpen = ref(false); // État de la fenêtre modale

function openReportModal() {
  isReportModalOpen.value = true;
}

async function getName(id) {
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', id)
    .single(); // Ajoute .single() si tu es sûr que l'id est unique

  if (error) {
    console.error('Erreur Supabase:', error);
    return null; // Retourne null en cas d'erreur pour éviter les plantages
  }

  return data.full_name; // Pas besoin de await ici
}

// // Fetch messages on component mount and subscribe to real-time updates
// onMounted(() => {

//   // Subscribe to real-time updates
//   messageSubscription = supabase
//     .channel('messages')
//     .on(
//       'postgres_changes',
//       { event: 'INSERT', schema: 'public', table: 'messages' },
//       (payload) => {
//         messages.value.push(payload.new);
//       }
//     )
//     .subscribe();
// });

onMounted(async () => {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) console.error('Error getting session:', sessionError);
        
        if (sessionData?.session) {
            sessionStore.setSession(sessionData.session);
            
            fetchMessages();
            GetActivityById();
        } else {
            sessionStore.clearSession();
        }
        
        //@ts-ignore
        supabase.auth.onAuthStateChange((event, newSession) => {
            if (event === 'SIGNED_IN' && newSession) {
            sessionStore.setSession(newSession);
            console.log(sessionStore.userId);

            } else if (event === 'SIGNED_OUT') {
            sessionStore.clearSession();
            }
        });
        // Subscribe to real-time updates
        messageSubscription = supabase
          .channel('messages')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages' },
            (payload) => {
              messages.value.push(payload.new);
            }
          )
          .subscribe();
    });

onBeforeUnmount(() => {
  if (messageSubscription) {
    supabase.removeChannel(messageSubscription);
  }
});

</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 100vh;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.messages-container {
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
  background: #021925;
  border: 1px solid #ddd;
  padding: 1rem;
  /* margin-bottom: 1rem; */
}

.message-item {
  margin-bottom: 0.5rem;
  color: white;
}

.message-item strong {
  color: #007bff;
}

form {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.message-input {
  flex: 1;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: transparent; /* Change input background color for contrast */
  color: white; /* Text inside the input will be white */
}

.message-input::placeholder {
  color: #aaa; /* Placeholder text in lighter color */
}

.send-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition-duration: 200ms;
}

.repport-button {
  padding: 0.5rem 1rem;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition-duration: 200ms;
}

.send-button:hover {
  background-color: #0056b3;
}

.repport-button:hover {
  background-color: #a30000;
}

@media (max-width: 400px){
  .chat-container {
    height: auto;
  }

  .send-button{
    font-size: 12px;
    padding: 0 0;
    height: 2rem;
    margin: 0;
  }
  .repport-button{
    font-size: 12px;
    padding: 0 0;
    height: 2rem;
    margin: 0;
  }
  .message-item{
    font-size: 14px;
  }
  .message-strong{
    font-size: 14px;
  }
}
</style>
