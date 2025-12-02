// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfFvyXKCQCo-nwGDogH-7nYexsIAvEgJQ",
  authDomain: "travelease-43b9c.firebaseapp.com",
  projectId: "travelease-43b9c",
  storageBucket: "travelease-43b9c.firebasestorage.app",
  messagingSenderId: "122300807646",
  appId: "1:122300807646:web:7422072c7311421577454f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);