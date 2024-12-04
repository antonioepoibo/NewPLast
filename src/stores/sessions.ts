import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: null as any,
    isLoggedIn: false,
    isLoading: true,  // Initially loading the session
    mail: '',
    userId: ''  // Initialize userId as a regular string
  }),
  actions: {
    // Define a ref for userId in the action
    async setSession(newSession: any) {
      this.isLoading = true;  // Start loading session
      this.session = newSession;
      this.isLoggedIn = !!newSession?.user;
      this.mail = newSession?.user?.email || '';
      
      const userId = ref('');  // Define a local ref for userId within the action
      userId.value = newSession?.user?.id || '';  // Set the ref value
      this.userId = userId.value;  // Store the ref value in the state

      console.log(userId.value);  // Log the userId value
    },

    clearSession() {
      this.isLoading = false;  // Reset loading flag
      this.session = null;
      this.isLoggedIn = false;
      this.mail = '';
      this.userId = '';  // Reset userId
    },
    persist: true,
  }
});
