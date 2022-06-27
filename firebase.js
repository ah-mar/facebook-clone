// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./firebaseConfig";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) :firebase.app()
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
