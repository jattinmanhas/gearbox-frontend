// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDAKctm1hv317atf8BdZqjdroJPxhGiTLE",
  authDomain: "gearbox-37a0b.firebaseapp.com",
  projectId: "gearbox-37a0b",
  storageBucket: "gearbox-37a0b.firebasestorage.app",
  messagingSenderId: "43651274178",
  appId: "1:43651274178:web:54781a3d752ca458a7b25b",
  measurementId: "G-CWXYMELLD8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
