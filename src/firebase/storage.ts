// @ts-ignore
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "recipify-d4560.firebaseapp.com",
  projectId: "recipify-d4560",
  storageBucket: "recipify-d4560.appspot.com",
  messagingSenderId: "35074631676",
  appId: "1:35074631676:web:7d4b4f22a41865ed07b479",
  measurementId: "G-76PVVWD98H",
};

const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);
