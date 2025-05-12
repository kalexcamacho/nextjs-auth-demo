"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function RegisterWithEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const registerWithEmail = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered user:", result.user);
      setSuccess(true);
    } catch (error) {
      console.error("Registration error:", error);
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
        data-testid="register-email-input"
      />
      <input
        type="password"
        placeholder="Password"
        className="border px-2 py-1 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-testid="register-password-input"
      />
      <button
        onClick={registerWithEmail}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        data-testid="register-button"
      >
        Register with Email
      </button>
      {success && (
        <p data-testid="register-success-message">Registration successful</p>
      )}
    </div>
  );
}
