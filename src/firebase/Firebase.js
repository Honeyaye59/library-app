// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAd4fDJ3C5imZpAMrh2zsCVKMgUzCtX3Bk",
    authDomain: "library-app-65345.firebaseapp.com",
    projectId: "library-app-65345",
    storageBucket: "library-app-65345.appspot.com",
    messagingSenderId: "725028564255",
    appId: "1:725028564255:web:ff39e491734ac1505a942a",
    measurementId: "G-P2M7CC0SEQ"
  };

  const app = initializeApp(firebaseConfig);

  let db = getFirestore(app);
  let auth = getAuth(app)
  let storage = getStorage(app)

  export {db, auth, storage};
