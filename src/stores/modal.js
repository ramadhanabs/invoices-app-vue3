import { defineStore } from 'pinia'

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isOpen: false
  })
})
