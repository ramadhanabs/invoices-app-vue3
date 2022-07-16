import { defineStore } from 'pinia'
import { getAuth } from 'firebase/auth'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: '',
    name: '',
    email: '',
    photoUrl: '',
    emailVerified: ''
  }),
  actions: {
    getUser() {
      const { currentUser } = getAuth()
      const { uid, displayName, email, photoURL, emailVerified } = currentUser

      /* Needs improvement */
      this.id = uid
      this.name = displayName
      this.email = email
      this.photoUrl = photoURL
      this.emailVerified = emailVerified
    }
  }
})
