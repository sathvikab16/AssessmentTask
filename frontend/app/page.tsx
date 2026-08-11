import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900">
          AbleSpace Task Manager
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome to your task management system
        </p>

        <div className="mt-8 rounded-xl border bg-gray-50 p-5 text-left">
          <p className="text-sm text-gray-500">Logged in as</p>

          <h2 className="mt-1 text-xl font-semibold text-gray-900">
            Guest User
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Guest access
          </p>
        </div>

        <Link
          href="/dashboard"
          className="mt-6 block w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Continue to Dashboard
        </Link>
      </div>
    </main>
  );
}