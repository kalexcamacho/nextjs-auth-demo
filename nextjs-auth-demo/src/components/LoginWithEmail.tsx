"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function LoginWithEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const loginWithEmail = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user (Email):", result.user);
      setSuccess(true);
    } catch (error) {
      console.error("Email login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="email"
        placeholder="Email"
        className="border px-2 py-1 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        data-testid="login-email-input"
      />
      <input
        type="password"
        placeholder="Password"
        className="border px-2 py-1 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-testid="login-password-input" 
      />
      <button
        onClick={loginWithEmail}
        className="bg-green-500 text-white px-4 py-2 rounded"
        data-testid="login-button"
      >
        Sign in with Email
      </button>
      {success && (
        <p data-testid="login-success-message">Registration successful</p>
      )}
    </div>
  );
}
