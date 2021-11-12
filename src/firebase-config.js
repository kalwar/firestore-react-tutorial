import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEe51X9ZaW-GTPPDG3I_dwU2iutsAXIHM",
  authDomain: "firestore-tutorial-2dc5e.firebaseapp.com",
  projectId: "firestore-tutorial-2dc5e",
  storageBucket: "firestore-tutorial-2dc5e.appspot.com",
  messagingSenderId: "377349833889",
  appId: "1:377349833889:web:a6f9da4d2f03b21c315ce0",
};

initializeApp(firebaseConfig);

export const db = getFirestore();

// do not publish your api keys in github
// maybe use .env variable
