// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBnWS9v2giqRhXk5K7eFSZzGlSjdf5lODM",
    authDomain: "chatapp-c7976.firebaseapp.com",
    projectId: "chatapp-c7976",
    storageBucket: "chatapp-c7976.firebasestorage.app",
    messagingSenderId: "1055907858316",
    appId: "1:1055907858316:web:88c5642595f8cd5af838a9",
    measurementId: "G-NNFPHMKLWR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };