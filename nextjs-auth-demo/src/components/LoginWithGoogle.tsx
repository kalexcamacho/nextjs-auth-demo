"use client";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useState } from "react";

export default function LoginWithGoogle() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      if (process.env.NEXT_PUBLIC_TEST_MODE === "true") {
        // Modo test: usar credencial mock
        const mockIdToken = JSON.stringify({
          sub: "test-user-id",
          email: "testuser@example.com",
          email_verified: true,
        });

        const mockCredential = GoogleAuthProvider.credential(mockIdToken);
        const result = await signInWithCredential(auth, mockCredential);
        setLoggedInUser(result.user.email ?? "Unknown user");
      } else {
        // Modo real
        const result = await signInWithPopup(auth, provider);
        setLoggedInUser(result.user.email ?? "Unknown user");
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={loginWithGoogle}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>

      {loggedInUser && (
        <p className="mt-4 text-green-600">
          Logged in user (Google): {loggedInUser}
        </p>
      )}
    </div>
  );
}
