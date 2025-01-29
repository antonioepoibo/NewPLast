<template>
  <transition 
    enter-active-class="notification-enter-active" 
    leave-active-class="notification-leave-active">
    <div 
      v-if="isVisible" 
      :class="notificationClass"
      class="fixed top-0 right-0 z-20 flex flex-col items-end py-6 px-6 rounded-l-lg my-8 w-auto h-auto shadow-lg">
      <div class="flex justify-between items-center w-full flex-row-reverse">
        <p class="text-[18px] text-white font-bold">{{ currentTitle || props.title }}</p>
        <p @click="messages.clearMessage()" class="flex gap-2 items-center text-white opacity-60 hover:opacity-100 duration-200">
          <i class="fa-solid fa-xmark"></i>
        </p>
        
        
      </div>
      <p class="text-[16px] text-white opacity-60 mt-2 max-w-[22rem] text-end">{{ currentContent || props.content }}</p>
      <p :class="secClass" class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">{{ countdown}} s</p>
    </div>
  </transition>
</template>

<script setup>
import { computed, watch, ref, onUnmounted } from 'vue';
import { useMessageStore } from '../stores/messages';

const messages = useMessageStore();
const countdown = ref(5); 
let interval = null;
const currentTitle = computed(() => messages.msg_Title);
const currentContent = computed(() => messages.msg_content);

const isVisible = computed(() => messages.msg_show);


const props = defineProps({
  title: String, 
  content: String, 
  isVisible: Boolean,
  type: { type: String, default: 'info' }, 
});

const emit = defineEmits(['update:isVisible']);

watch([currentTitle, currentContent], ([newTitle, newContent]) => {
  if (newTitle || newContent) {
    emit('update:isVisible', true); 
    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      countdown.value--;
    }, 1000); 
    setTimeout(() => {
      messages.clearMessage();
      emit('update:isVisible', false); 
      clearInterval(interval)
      countdown.value = 5; 
    }, 5000); 
  }
});

const secClass = computed(() => {
  return props.type === 'info' || messages.msg_type === 'info'
    ? 'bg-[#286A50] border-2 px-2 border-green-500'
    : 'bg-[#6F1F25] border-2 px-2 border-red-500';
});

const notificationClass = computed(() => {
  return props.type === 'info' || messages.msg_type === 'info'
    ? 'bg-[#4b8d5b]/50 border-y-2 border-l-2 border-green-500'
    : 'bg-red-600/50 border-y-2 border-l-2 border-red-500';
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<style>
@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutToRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.notification-enter-active {
  animation: slideInFromRight 0.5s ease-out forwards;
}

.notification-leave-active {
  animation: slideOutToRight 0.5s ease-in forwards;
}
</style>
