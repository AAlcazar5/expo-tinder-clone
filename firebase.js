// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_API_KEY } from "@env";
import { FIREBASE_AUTH_DOMAIN } from "@env";
import { FIREBASE_PROJECT_ID } from "@env";
import { FIREBASE_STORAGE_BUCKET } from "@env";
import { FIREBASE_MESSAGING_SENDER_ID } from "@env";
import { FIREBASE_APP_ID } from "@env";

const firebaseConfig = {
  apiKey: `${FIREBASE_API_KEY}`,
  authDomain: `${FIREBASE_AUTH_DOMAIN}`,
  projectId: `${FIREBASE_PROJECT_ID}`,
  storageBucket: `${FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${FIREBASE_APP_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
