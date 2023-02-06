import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import antDesignPlugin from './js/ant'

import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyD_zCD-l29ZgdzRt8EXccixatCIdJBSVpU",
  authDomain: "phototaxis-equipment.firebaseapp.com",
  databaseURL: "https://phototaxis-equipment-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "phototaxis-equipment",
  storageBucket: "phototaxis-equipment.appspot.com",
  messagingSenderId: "337412903616",
  appId: "1:337412903616:web:1e00518113c5fcbac75325"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


createApp(App)
.provide('firebase', app)
.use(antDesignPlugin)
.mount('#app')
