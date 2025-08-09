// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCki6bRVCnZmGpRzDVHVdieQYjd0S4PfUg",
  authDomain: "operatorterminal-f276a.firebaseapp.com",
  projectId: "operatorterminal-f276a",
  storageBucket: "operatorterminal-f276a.firebasestorage.app",
  messagingSenderId: "158701660886",
  appId: "1:158701660886:web:82d558694e05e8411a7777",
  measurementId: "G-HGT2G1LLSB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
