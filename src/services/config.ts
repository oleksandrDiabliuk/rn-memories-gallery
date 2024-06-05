import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBl5k3niWkrHSJmD3JwYVmGHK-LKTOPjFM",
  authDomain: "memories-a7204.firebaseapp.com",
  projectId: "memories-a7204",
  storageBucket: "memories-a7204.appspot.com",
  messagingSenderId: "39593137447",
  appId: "1:39593137447:web:b0f9b58969becf30f1c502",
  measurementId: "G-8QNJ3KK1RH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app, 'gs://memories-a7204.appspot.com');

const authentication = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});

export { app, db, authentication, storage };