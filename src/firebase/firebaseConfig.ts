import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {

  apiKey: "AIzaSyBlTgLFHC006CDx251wY37qNuV9AFOJ0eI",

  authDomain: "g-sam-rurahealth.firebaseapp.com",

  projectId: "g-sam-rurahealth",

  storageBucket: "g-sam-rurahealth.firebasestorage.app",

  messagingSenderId: "298202555946",

  appId: "1:298202555946:web:4ca15b7650a778c8d40553"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);