import { defineStore } from 'pinia'
import db from '../firebase/firebaseInit'

export const useInvoiceStore = defineStore({
  id: 'invoices',
  state: () => ({
    data: []
  }),
  actions: {
    async fetchData() {
      const getData = db.collection('invoices')
      const snapshot = await getData.get()
      this.data = snapshot.docs.map((doc) => {
        const tempData = doc.data()
        const { id, dueDate, billTo, status } = tempData
        return {
          ...tempData,
          preview: {
            id,
            dueDate,
            status,
            amount: 0,
            biller: billTo.name
          }
        }
      })
    }
  }
})
