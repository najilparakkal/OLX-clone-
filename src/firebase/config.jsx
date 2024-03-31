
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyAVV4GuUey5L8EKDkmQ60rJshzZ22kgPCI",
    authDomain: "olx-clone-cc287.firebaseapp.com",
    projectId: "olx-clone-cc287",
    storageBucket: "olx-clone-cc287.appspot.com",
    messagingSenderId: "950865604435",
    appId: "1:950865604435:web:6cee9b3a51c243e203fba6",
    measurementId: "G-12X23NFJ57"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, auth ,firestore};

