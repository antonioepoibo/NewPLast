<template>
  <div class="chat-page">
    <div v-if="!$route.query.owner || !$route.query.activityId">
      <h1>Avec qui Tchater ?</h1>
    </div>
    <div v-if="$route.query.owner && $route.query.activityId" class="chat-container">
      <h1>Chat Page</h1>
      <div class="messages-container">
        <div v-for="message in messages" :key="message.id" class="message-item">
          <strong>{{ message.sender }}</strong>: {{ message.message }}
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input
          type="text"
          v-model="newMessage"
          placeholder="Type your message here..."
          class="message-input"
        />
        <button type="submit" class="send-button">Send</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { supabase } from '../supabase.js'; // Make sure to set up and import Supabase client
import { useSessionStore } from '../stores/sessions';
import { useRoute } from 'vue-router';

const sessionStore = useSessionStore();
const newMessage = ref('');
const messages = ref([]); // Store the messages here
const route = useRoute();
const receiver = route.query.owner;
const activity_id = route.query.activityId;
let messageSubscription;

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

// Fetch messages on component mount and subscribe to real-time updates
onMounted(() => {
  fetchMessages();

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
  height: 100vh;
  padding: 1rem;
  background: #f9f9f9;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.messages-container {
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.message-item {
  margin-bottom: 0.5rem;
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
  background-color: #333; /* Change input background color for contrast */
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
}

.send-button:hover {
  background-color: #0056b3;
}
</style>
