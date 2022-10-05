import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDbhUy_dgwkUrIGugCT6oQ7AFGRhXFVFJA",
    authDomain: "whatsup-6a839.firebaseapp.com",
    projectId: "whatsup-6a839",
    storageBucket: "whatsup-6a839.appspot.com",
    messagingSenderId: "234758444703",
    appId: "1:234758444703:web:f2c31d9db7108ff143f4aa",
    measurementId: "G-9QRHKSEMP1"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}