import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),
  
  actions: {
    async login(credentials) {
      try {
        const response = await new Promise(resolve => 
          setTimeout(() => resolve({ 
            user: { 
              id: 1, 
              email: credentials.email,
              role: 'user'
            }, 
            token: 'fake-jwt-token' 
          }), 1000)
        )
        
        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true
        localStorage.setItem('token', response.token)
      } catch (error) {
        throw new Error('Erreur de connexion')
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
})