import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCEmZRkVfyJfSsdlH89ik01ySAYGuLq_M",
  authDomain: "balancesheet-967d9.firebaseapp.com",
  projectId: "balancesheet-967d9",
  storageBucket: "balancesheet-967d9.appspot.com",
  messagingSenderId: "609095321675",
  appId: "1:609095321675:web:091a2c06560645a31425ce",
  measurementId: "G-0GR85L2ZF3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
