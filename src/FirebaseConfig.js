// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2lGuAkBt8dUD4ndScZqDe42FIf6Mw36M",
  authDomain: "myapp-2ff6e.firebaseapp.com",
  projectId: "myapp-2ff6e",
  storageBucket: "myapp-2ff6e.appspot.com",
  messagingSenderId: "876077181751",
  appId: "1:876077181751:web:c66755476a00753b1d08b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };