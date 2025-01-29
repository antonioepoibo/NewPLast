import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessageStore = defineStore('messages', () => {
  const msg_show = ref(false);
  const msg_Title = ref('');
  const msg_content = ref('');
  const msg_type = ref('');

  function showMessage(title: string, content: string, type: string) {
    msg_Title.value = title;
    msg_content.value = content;
    msg_type.value = type;
    msg_show.value = true;

    // Masquer automatiquement le message après 5 secondes
    setTimeout(() => {
      clearMessage();
    }, 5000);
  }

  function clearMessage() {
    msg_show.value = false;
    msg_Title.value = '';
    msg_content.value = '';
    msg_type.value = '';
  }

  return {
    msg_show,
    msg_Title,
    msg_content,
    msg_type,
    showMessage,
    clearMessage
  };
});
