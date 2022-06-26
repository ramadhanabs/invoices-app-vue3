import { defineStore } from 'pinia'
import { getAuth } from 'firebase/auth'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: '',
    name: '',
    email: ''
  }),
  actions: {
    getUser() {
      const { currentUser } = getAuth()
      const { uid, displayName, email } = currentUser

      this.id = uid
      this.name = displayName
      this.email = email
    }
  }
})
