import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqVQua6eMTAT1n4bY7v5x3njE_0QZrxGQ",
  authDomain: "muro-interactivo-d82e1.firebaseapp.com",
  projectId: "muro-interactivo-d82e1",
  storageBucket: "muro-interactivo-d82e1.firebasestorage.app",
  messagingSenderId: "1071997272714",
  appId: "1:1071997272714:web:2566d2a525432e97166373",
  measurementId: "G-T3PER2BBZB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
import { getStorage } from 'firebase/storage';
export const storage = getStorage(app);
