"use client";

import { useEffect, useState } from "react";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/firebase/config";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export default function LoginWithPhone() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const [recaptchaSolved, setRecaptchaSolved] = useState(false);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: () => {
            console.log("reCAPTCHA solved. Proceeding with OTP.");
            setRecaptchaSolved(true);
          },
        }
      );
    }
  }, []);

  const sendOtp = async () => {
    try {
      const appVerifier = window.recaptchaVerifier!;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmation(result);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOtp = async () => {
    if (confirmation) {
      try {
        const result = await confirmation.confirm(otp);
        console.log("Logged in user (Phone):", result.user);
      } catch (error) {
        console.error("OTP verification error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="tel"
        placeholder="+1234567890"
        className="border px-2 py-1 rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        onClick={sendOtp}
        disabled={!recaptchaSolved}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Send OTP
      </button>
      {confirmation && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border px-2 py-1 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={verifyOtp}
            className="bg-yellow-700 text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
        </>
      )}
      <div id="recaptcha-container" data-testid="recaptcha-container" />
    </div>
  );
}
