<template>
    <div>
      <h2>Messages</h2>
  
      <!-- Select a user to send a message to -->
      <label for="receiver">Send message to:</label>
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.username }}
        </option>
      </select>
  
      <!-- Message input -->
      <textarea v-model="messageContent" placeholder="Type your message here"></textarea>
      <button @click="sendMessage">Send</button>
  
      <h3>Messages</h3>
      <div v-for="message in messages" :key="message.id">
        <p><strong>{{ message.sender_name }}</strong>: {{ message.content }}</p>
        <p class="timestamp">{{ new Date(message.timestamp).toLocaleString() }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { supabase } from '../supabase';
  
  // States
  const users = ref([]); // List of users
  const selectedUser = ref('');
  const messageContent = ref('');
  const messages = ref([]);
  
  // Fetch all users except the logged-in user
  async function fetchUsers(currentUserId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', currentUserId);
  
    if (error) {
      console.error('Error fetching users:', error);
    } else {
      users.value = data || [];
    }
  }
  
  // Fetch messages involving the logged-in user
  async function fetchMessages(currentUserId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:sender_id (username), receiver:receiver_id (username)')
      .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
      .order('timestamp', { ascending: false });
  
    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      messages.value = data.map(msg => ({
        id: msg.id,
        sender_name: msg.sender.username,
        receiver_name: msg.receiver.username,
        content: msg.content,
        timestamp: msg.timestamp,
      }));
    }
  }
  
  // Send a new message
  async function sendMessage() {
    if (!selectedUser.value || !messageContent.value) {
      alert('Please select a user and type a message.');
      return;
    }
  
    const { error } = await supabase.from('messages').insert({
      sender_id: currentUserId,
      receiver_id: selectedUser.value,
      content: messageContent.value,
    });
  
    if (error) {
      console.error('Error sending message:', error);
    } else {
      messageContent.value = '';
      fetchMessages(currentUserId); // Refresh the message list
    }
  }
  
  // Simulated logged-in user
  const currentUserId = 'current-logged-in-user-id'; // Replace with real logic
  
  // On component mount
  onMounted(() => {
    fetchUsers(currentUserId);
    fetchMessages(currentUserId);
  });
  </script>
  
  <style scoped>
  .timestamp {
    font-size: 0.8em;
    color: gray;
  }
  textarea {
    display: block;
    width: 100%;
    margin: 1em 0;
  }
  </style>
  