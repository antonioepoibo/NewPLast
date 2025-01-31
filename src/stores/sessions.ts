import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: null as any,
    isLoggedIn: false,
    isLoading: true,  // Initially loading the session
    mail: '',
    username: '',
    userId: '', // Initialize userId as a regular string
    isCompany:false,
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
      if (this.isCompany === false) {
        this.isCompany = JSON.parse(localStorage.getItem('isCompany') || 'false');
      }     
      console.log(userId.value);  // Log the userId value
    },

    setUsername(username: string) {
      this.username = username; // Store the username
      console.log('Username set in store:', this.username); // Debug log for username
    },

    // @ts-ignore
    setCompanyStatus(isCompany) {
      this.isCompany = isCompany;
      localStorage.setItem('isCompany', JSON.stringify(isCompany));  // Sauvegarde dans localStorage
      console.log("isCompany mis à jour:", this.isCompany);
  },  

    clearSession() {
      this.isLoading = false;  // Reset loading flag
      this.session = null;
      this.isLoggedIn = false;
      this.mail = '';
      this.username = '';
      this.userId = '';  // Reset userId
      this.isCompany = false;
    },
    persist: true,
  }
});
