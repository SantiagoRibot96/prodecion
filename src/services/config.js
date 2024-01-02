import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBtPi4GCW4vkuqaveBywWb2Yf8AJi39SBM",
    authDomain: "prodecion-c4c7d.firebaseapp.com",
    projectId: "prodecion-c4c7d",
    storageBucket: "prodecion-c4c7d.appspot.com",
    messagingSenderId: "1083091797565",
    appId: "1:1083091797565:web:e00f0ec81895f875878c54"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);