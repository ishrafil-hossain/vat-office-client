import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase.config';  //ata auto import hoyni

const initializeFirebase = () => {
    initializeApp(firebaseConfig);
}

export default initializeFirebase;