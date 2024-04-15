import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyBcsDsjrLYjlENB34ioDKgrY7GJOPtMwIQ",
  authDomain: "trailtrek-735c9.firebaseapp.com",
  projectId: "trailtrek-735c9",
  storageBucket: "trailtrek-735c9.appspot.com",
  messagingSenderId: "103775705133",
  appId: "1:103775705133:web:7ca2fc8f2086ab7775c0a4",
  measurementId: "G-ZT18MWTEK4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase authentication
export const auth = getAuth(app);
const db = getFirestore(app);
 const storage = getStorage(app); 


export { app, db, storage }; 