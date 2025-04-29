import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAVFtTFqqvL_SUemaMs1BwuZSWhrB2_J0",
  authDomain: "nextjs-auth-demo-432de.firebaseapp.com",
  projectId: "nextjs-auth-demo-432de",
  storageBucket: "nextjs-auth-demo-432de.firebasestorage.app",
  messagingSenderId: "338183565115",
  appId: "1:338183565115:web:e8d49602631845ab8e511e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
