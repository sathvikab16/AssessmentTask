"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedNotifications = localStorage.getItem("notifications");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    if (savedNotifications !== null) {
      setNotifications(savedNotifications === "true");
    }
  }, []);

  const handleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);

    if (enabled) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleNotifications = (enabled: boolean) => {
    setNotifications(enabled);
    localStorage.setItem("notifications", String(enabled));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold">Settings</h1>

        <p className="mb-6 text-gray-500 dark:text-gray-400">
          Manage your application preferences.
        </p>

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {/* Dark Mode */}
          <div className="flex items-center justify-between border-b pb-5 dark:border-gray-700">
            <div>
              <h2 className="font-semibold">Dark Mode</h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Switch between light and dark themes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleDarkMode(!darkMode)}
              className={`relative h-6 w-11 rounded-full transition ${
                darkMode ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label="Toggle dark mode"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  darkMode ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Notifications */}
          <div className="mt-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Notifications</h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enable task notifications.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleNotifications(!notifications)}
              className={`relative h-6 w-11 rounded-full transition ${
                notifications ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label="Toggle notifications"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  notifications ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}