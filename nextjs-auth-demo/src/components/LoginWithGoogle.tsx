"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function LoginWithGoogle() {
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Logged in user (Google):", result.user);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Sign in with Google
    </button>
  );
}
