import { defineStore } from 'pinia'
import db from '../firebase/firebaseInit'
import dayjs from 'dayjs'

export const useInvoiceStore = defineStore({
  id: 'invoices',
  state: () => ({
    data: [],
    isLoading: false
  }),
  actions: {
    /* 
      Improve this methods using firebase query. 

      CURRENT => Still fetching all data then .filter() it based on userId
      EXPECTED IMPROVEMENT => Using firebase query to get data based on userId
    */
    async fetchData(user_id) {
      this.isLoading = true
      const getData = db.collection('invoices')
      const snapshot = await getData.get()
      this.data = snapshot.docs
        .filter((o) => o.data().userId === user_id)
        .map((doc) => {
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
      this.isLoading = false
    }
  }
})
