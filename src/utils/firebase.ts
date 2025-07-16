import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, query, orderBy, getDocs
} from "firebase/firestore";
import { getStorage } from 'firebase/storage';
/* ─── Firebase ─────────────────────────────────────────────── */
const firebaseConfig = {
  apiKey: "AIzaSyBFdQDFm6wlFGgXy2Ab9uAK0v0Cws0zrns",
  authDomain: "remind-54163.firebaseapp.com",
  projectId: "remind-54163",
  storageBucket: "remind-54163.firebasestorage.app",
  messagingSenderId: "688763837360",   
  appId: "1:688763837360:web:8c2c50c78f581cc8981475",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app, 'gs://remind-54163.firebasestorage.app');
export { db };