// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBVFI_3Yl6atF-WrW5ErkE8rb7MHAT5EsI",
    authDomain: "react-casual-blog-b258b.firebaseapp.com",
    projectId: "react-casual-blog-b258b",
    storageBucket: "react-casual-blog-b258b.appspot.com",
    messagingSenderId: "7542540464",
    appId: "1:7542540464:web:726a90577ad28ab3751375"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();