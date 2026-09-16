import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Fill these in from Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyCG0cU_Tu2lx1PH_Uov_WdFYfUCXuCWtko",
  authDomain: "osh-equipment-system.firebaseapp.com",
  projectId: "osh-equipment-system",
  storageBucket: "osh-equipment-system.firebasestorage.app", // not used for file storage, only kept for SDK completeness
  messagingSenderId: "21208126908",
  appId: "1:21208126908:web:5b8cf4e3b7694948e807b9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
