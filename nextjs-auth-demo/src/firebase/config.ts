import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAo5xKnaqKxaIiq06pMkUVCDGxQxGfMfco",
  authDomain: "nextjs-auth-demo-9c444.firebaseapp.com",
  projectId: "nextjs-auth-demo-9c444",
  storageBucket: "nextjs-auth-demo-9c444.firebasestorage.app",
  messagingSenderId: "1057776835340",
  appId: "1:1057776835340:web:48833422571af60f3b8729"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
}
