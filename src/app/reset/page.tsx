"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// reset password page
export default function VerifyForgotPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [error, setError] = useState(false);

  const updateNewPassword = async () => {
    try {
      const user = await axios.post("/api/users/verifyForgotPassword", {
        token,
        newPassword,
      });
      setPasswordUpdated(true);
      router.push("/login")
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl m-3">Reset Password</h1>

      <label htmlFor="newPassword"></label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 
            focus:outline-None focus:border-gray-600 text-black"
        id="email"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter New Password"
      />

      <button
        onClick={updateNewPassword}
        className="bg-orange-500 hover:bg-orange-700 text-black font-bold py-2 px-4 rounded"
      >
        Update Password
      </button>

      {passwordUpdated && (
        <div>
          <h2 className="text-2xl">Password Updated</h2>
          <Link href="/login">Login here</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
