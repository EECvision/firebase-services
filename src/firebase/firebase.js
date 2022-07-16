// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsZVTepBZfZ9WLDYoWirT3qzqct45TE4E",
  authDomain: "genadrop-2675c.firebaseapp.com",
  projectId: "genadrop-2675c",
  storageBucket: "genadrop-2675c.appspot.com",
  messagingSenderId: "720817815569",
  appId: "1:720817815569:web:8e857e8fa46278de3771b0",
  measurementId: "G-8CDQS7VXL3",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore();
