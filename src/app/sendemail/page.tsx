"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function sendForgotEmail() {
  const [user, setUser] = useState({ email: "" });
  const [forgotPasswordStatus, setForgotPasswordStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const forgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgetPasswordEmail", user);
      console.log("Forgot password - Email sent", response.data);
      toast.success("Forgot password - Email sent");
      setForgotPasswordStatus(true);
      setUser({ email: "" });
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="email" className="text-xl p-3">
        {loading
          ? "Processing"
          : "Forgot Password"}
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg-mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <button
        onClick={forgotPassword}
        className="p-3 m-5 rounded-lg focus:outline-none bg-orange-500 text-black font-semibold"
      >
        Send Mail
      </button>
    </div>
  );
}
