"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function RegisterWithEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerWithEmail = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered user:", result.user);
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
      />
      <input
        type="password"
        placeholder="Password"
        className="border px-2 py-1 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={registerWithEmail}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register with Email
      </button>
    </div>
  );
}
