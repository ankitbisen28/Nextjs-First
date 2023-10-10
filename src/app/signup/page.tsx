"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisable, setButtonDisable] = React.useState(true);

  const Signup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg-mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg-mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg-mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="username"
      />
      <button
        onClick={Signup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisable ? "No Signup" : "Signup here"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}
