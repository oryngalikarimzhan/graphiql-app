import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_iD,
  appId: import.meta.env.VITE_APP_FIREBASE_API_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
