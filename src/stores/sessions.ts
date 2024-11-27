// stores/session.ts
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: null as any,
    isLoggedIn: false,
    isLoading: true,  // Initially loading the session
    mail: '',
    userId: ''
  }),
  actions: {
    async setSession(newSession: any) {
      this.isLoading = true;  // Start loading session
      this.session = newSession;
      this.isLoggedIn = !!newSession?.user;
      this.mail = newSession?.user?.email || '';
      this.userId = newSession?.user?.id || '';

        
    },
    clearSession() {
      this.isLoading = false;  // Reset loading flag
      this.session = null;
      this.isLoggedIn = false;
      this.mail = '';
      this.userId = '';
    }
  }
});
