import { initializeApp } from 'firebase/app';
import {
  getAuth,

} from 'firebase/auth';
import {
  getFirestore,
} from 'firebase/firestore';
import {
  getStorage,
} from 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUiKd-Szjgm0h9sBV7pALN2mRKDhUIoqE",
    authDomain: "restaurant-5c835.firebaseapp.com",
    projectId: "restaurant-5c835",
    storageBucket: "restaurant-5c835.appspot.com",
    messagingSenderId: "1040452622845",
    appId: "1:1040452622845:web:9ee5ff7a45c19a9adb2194",
    measurementId: "G-YPGNSYWRH4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {
  auth,
  db,
  storage,
};
