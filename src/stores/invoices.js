import { defineStore } from 'pinia'
import db from '../firebase/firebaseInit'
import dayjs from 'dayjs'

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
        const { id, dueDate, billTo, status, totalAmount } = tempData
        return {
          ...tempData,
          preview: {
            id,
            dueDate: dayjs(dueDate).format('MMMM D, YYYY'),
            status,
            amount: totalAmount,
            biller: billTo.name
          }
        }
      })
    }
  }
})
