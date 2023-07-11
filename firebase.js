import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCh5d4b6lQyWu5xluDskkiVZTSe8xaQZDE",
  authDomain: "blogdb-1850e.firebaseapp.com",
  projectId: "blogdb-1850e",
  storageBucket: "blogdb-1850e.appspot.com",
  messagingSenderId: "429061273645",
  appId: "1:429061273645:web:28fae426d0eb60496a60a4",
  measurementId: "G-S12R0ZR4SP"
};


if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)


const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export { auth, db, storage, serverTimestamp }


