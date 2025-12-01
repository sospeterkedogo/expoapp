// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAIFJJAGOd1LTPbXqm160jsOa39PfkOfcw",
    authDomain: "friend-ful.firebaseapp.com",
    projectId: "friend-ful",
    storageBucket: "friend-ful.firebasestorage.app",
    messagingSenderId: "751350410718",
    appId: "1:751350410718:web:960c887dbc4a3f63e5c14f",
    measurementId: "G-RSZVBYLPMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
