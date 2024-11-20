<template>
    <div v-if="receiver">
      <h3>Chat with {{ receiver.username }}</h3>
      <div class="chat-window">
        <div v-for="message in messages" :key="message.id" class="message">
          <strong v-if="message.sender_id === userId">You:</strong>
          <strong v-else>{{ receiver.username }}:</strong>
          <p>{{ message.content }}</p>
        </div>
      </div>
  
      <form @submit.prevent="sendMessage">
        <textarea v-model="newMessage" placeholder="Type a message"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { supabase } from '../supabase';
  
  // Props
  const props = defineProps({
    receiver: { type: Object, required: true },
    userId: { type: Number, required: true },
  });
  
  const messages = ref([]);
  const newMessage = ref('');
  
  async function fetchMessages() {
    if (!props.receiver) return;
  
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${props.userId},receiver_id.eq.${props.receiver.id}`)
      .or(`sender_id.eq.${props.receiver.id},receiver_id.eq.${props.userId}`)
      .order('timestamp', { ascending: true });
  
    if (error) {
      console.error(error);
    } else {
      messages.value = data;
    }
  }
  
  async function sendMessage() {
    if (!newMessage.value.trim()) return;
  
    const { error } = await supabase.from('messages').insert({
      sender_id: props.userId,
      receiver_id: props.receiver.id,
      content: newMessage.value.trim(),
    });
  
    if (error) {
      console.error(error);
    } else {
      newMessage.value = '';
      fetchMessages(); // Refresh messages
    }
  }
  
  // Fetch messages whenever the selected receiver changes
  watch(() => props.receiver, fetchMessages);
  
  onMounted(fetchMessages);
  </script>
  
  <style scoped>
  .chat-window {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    padding: 10px;
  }
  .message {
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
  }
  </style>
  