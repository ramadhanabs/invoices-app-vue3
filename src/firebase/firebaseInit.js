import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAcX4eMPK5OQIFcYAk8Jicjd8e8TrG85bE',
  authDomain: 'invoice-app-vue-a22b9.firebaseapp.com',
  projectId: 'invoice-app-vue-a22b9',
  storageBucket: 'invoice-app-vue-a22b9.appspot.com',
  messagingSenderId: '1061091480303',
  appId: '1:1061091480303:web:a50757b9bfbb0d65dc411a'
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()
