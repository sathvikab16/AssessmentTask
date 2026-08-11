"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: email.split("@")[0],
        email,
        guest: false,
      }),
    );

    router.push("/dashboard");
  };

  const handleGuestLogin = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Guest User",
        email: "guest@example.com",
        guest: true,
      }),
    );

    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Login
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Sign in to your task management system
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mb-4 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />

          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mb-5 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600" />

          <span className="px-3 text-sm text-gray-500">OR</span>

          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600" />
        </div>

        <button
          type="button"
          onClick={handleGuestLogin}
          className="w-full rounded-lg border border-gray-400 p-3 font-medium hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-700"
        >
          Continue as Guest
        </button>
      </div>
    </main>
  );
}