import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGhYB-dLysal9zzFkuWKSrLnKguGaoy4Q",
  authDomain: "studox-edu.firebaseapp.com",
  projectId: "studox-edu",
  storageBucket: "studox-edu.appspot.com",
  messagingSenderId: "998271400895",
  appId: "1:998271400895:web:6b2a969cd65756d1c8bf0a",
  measurementId: "G-4QYQNH1Q48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
