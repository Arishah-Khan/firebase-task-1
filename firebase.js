
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup  ,signInWithEmailAndPassword , signOut , onAuthStateChanged,updateProfile,sendEmailVerification,updatePassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

 

  const firebaseConfig = {
    apiKey: "AIzaSyBa9QrRWNVq7oGXD2ECdzMtyBYCQEtCujo",
    authDomain: "fir-task1-39596.firebaseapp.com",
    projectId: "fir-task1-39596",
    storageBucket: "fir-task1-39596.appspot.com",
    messagingSenderId: "422669912553",
    appId: "1:422669912553:web:69fbeb5247a42c80446378"
  };

  const app = initializeApp(firebaseConfig);

  export {getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , onAuthStateChanged,updateProfile,sendEmailVerification,updatePassword , GoogleAuthProvider,signInWithPopup}
