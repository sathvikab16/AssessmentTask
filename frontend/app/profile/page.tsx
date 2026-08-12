"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Theme = "light" | "dark" | "system";

export default function ProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("Dexter");
  const [title, setTitle] = useState("Designer");
  const [username, setUsername] = useState("Dexuser");
  const [email, setEmail] = useState("dexter@gmail.com");

  const [editingEmail, setEditingEmail] = useState(false);
  const [picture, setPicture] = useState("D");

  const [theme, setTheme] = useState<Theme>("light");
  const [showTheme, setShowTheme] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const [accent, setAccent] = useState("black");

  useEffect(() => {
    const savedTheme = localStorage.getItem("profile-theme") as Theme | null;
    const savedAccent = localStorage.getItem("profile-accent");

    if (savedTheme) {
      setTheme(savedTheme);
    }

    if (savedAccent) {
      setAccent(savedAccent);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profile-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("profile-accent", accent);
  }, [accent]);

  const handlePictureChange = () => {
    const newPicture = prompt("Enter one letter for your profile picture:");

    if (newPicture && newPicture.trim()) {
      setPicture(newPicture.trim().charAt(0).toUpperCase());
    }
  };

  const handleLeaveWorkspace = () => {
    const confirmed = window.confirm(
      "Are you sure you want to leave the workspace?"
    );

    if (confirmed) {
      alert("You have left the workspace.");
      router.push("/");
    }
  };

  const handleBackToApp = () => {
    router.push("/");
  };

  const accentClass =
    accent === "blue"
      ? "bg-blue-600"
      : accent === "purple"
        ? "bg-purple-600"
        : accent === "green"
          ? "bg-green-600"
          : "bg-black";

  const filteredItems = [
    "Profile",
    "Theme",
    "Color",
    "Email",
    "Full name",
    "Title",
    "Username",
    "Workspace access",
  ].filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#18181b] dark:text-white">

      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="relative w-[275px] shrink-0 border-r border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#18181b]">

          {/* Back */}
          <button
            onClick={handleBackToApp}
            className="mb-8 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="text-xl">←</span>
            Back to app
          </button>

          {/* Search */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="mb-3 flex w-full items-center gap-3 rounded-lg border border-gray-300 px-3 py-2 text-left text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span>⌕</span>
            <span>Search</span>
          </button>

          {/* Search panel */}
          {showSearch && (
            <div className="mb-4 rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">

              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <div className="mt-3 space-y-1">

                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setSearch(item);
                        setShowSearch(false);
                      }}
                      className="block w-full rounded-md px-2 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {item}
                    </button>
                  ))
                ) : (
                  <p className="px-2 py-2 text-sm text-gray-500">
                    No results found.
                  </p>
                )}

              </div>
            </div>
          )}

          {/* Profile */}
          <button
            onClick={() => {
              setShowTheme(false);
              setShowColor(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex w-full items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-left font-medium dark:bg-gray-800"
          >
            <span>♙</span>
            Profile
          </button>

          {/* Theme */}
          <button
            onClick={() => {
              setShowTheme(!showTheme);
              setShowColor(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span>☼</span>
            Theme
            <span className="ml-auto">›</span>
          </button>

          {/* Theme options */}
          {showTheme && (
            <div className="ml-5 mt-1 rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800">

              <button
                onClick={() => {
                  setTheme("light");
                  setShowTheme(false);
                }}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  theme === "light" ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
              >
                ☀️ Light
              </button>

              <button
                onClick={() => {
                  setTheme("dark");
                  setShowTheme(false);
                }}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  theme === "dark" ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
              >
                🌙 Dark
              </button>

              <button
                onClick={() => {
                  setTheme("system");
                  setShowTheme(false);
                }}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  theme === "system" ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
              >
                🖥 System
              </button>

            </div>
          )}

          {/* Color */}
          <button
            onClick={() => {
              setShowColor(!showColor);
              setShowTheme(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className={`h-4 w-4 rounded-sm ${accentClass}`} />
            Color
            <span className="ml-auto">›</span>
          </button>

          {/* Color options */}
          {showColor && (
            <div className="ml-5 mt-1 rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800">

              <button
                onClick={() => {
                  setAccent("black");
                  setShowColor(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="h-4 w-4 rounded-full bg-black" />
                Black
              </button>

              <button
                onClick={() => {
                  setAccent("blue");
                  setShowColor(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="h-4 w-4 rounded-full bg-blue-600" />
                Blue
              </button>

              <button
                onClick={() => {
                  setAccent("purple");
                  setShowColor(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="h-4 w-4 rounded-full bg-purple-600" />
                Purple
              </button>

              <button
                onClick={() => {
                  setAccent("green");
                  setShowColor(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="h-4 w-4 rounded-full bg-green-600" />
                Green
              </button>

            </div>
          )}

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto px-16 py-16">

          <div className="mx-auto max-w-[690px]">

            <h1 className="mb-10 text-3xl font-medium">
              Profile
            </h1>

            {/* PROFILE CARD */}
            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#27272a]">

              {/* Profile picture */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-7 dark:border-gray-700">

                <span className="font-medium">
                  Profile picture
                </span>

                <button
                  onClick={handlePictureChange}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-white hover:opacity-80 ${accentClass}`}
                  title="Change picture"
                >
                  {picture}
                </button>

              </div>

              {/* Email */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-7 dark:border-gray-700">

                <span className="font-medium">
                  Email
                </span>

                <div className="flex items-center gap-4">

                  {editingEmail ? (
                    <>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-gray-300"
                      />

                      <button
                        onClick={() => setEditingEmail(false)}
                        className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:opacity-80"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <span>
                        {email}
                      </span>

                      <button
                        onClick={() => setEditingEmail(true)}
                        className="rounded-full bg-gray-100 px-3 py-2 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        title="Edit email"
                      >
                        ✎
                      </button>
                    </>
                  )}

                </div>
              </div>

              {/* Full name */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-7 dark:border-gray-700">

                <span className="font-medium">
                  Full name
                </span>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-[190px] rounded-lg bg-gray-100 px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200"
                />

              </div>

              {/* Title */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-7 dark:border-gray-700">

                <div>
                  <p className="font-medium">
                    Title
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Your job title or role
                  </p>
                </div>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-[190px] rounded-lg bg-gray-100 px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200"
                />

              </div>

              {/* Username */}
              <div className="flex items-center justify-between px-6 py-7">

                <div>
                  <p className="font-medium">
                    Username
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    One word, like a nickname or first name
                  </p>
                </div>

                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-[190px] rounded-lg bg-gray-100 px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200"
                />

              </div>

            </div>

            {/* WORKSPACE */}
            <h2 className="mb-6 mt-14 text-xl font-medium">
              Workspace access
            </h2>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 px-6 py-7 dark:border-gray-700">

              <span className="text-gray-500 dark:text-gray-400">
                Remove yourself from the workspace
              </span>

              <button
                onClick={handleLeaveWorkspace}
                className="rounded-lg bg-red-50 px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                Leave Workspace
              </button>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}