"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Task = {
  id: number;
  title: string;
  description?: string;
  status?: string;
};

// These tasks appear immediately while the live backend wakes up.
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete assessment",
    description: "Finish the task management project",
    status: "Todo",
  },
  {
    id: 2,
    title: "Build dashboard",
    description: "Create the task management dashboard",
    status: "Todo",
  },
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [userName, setUserName] = useState("Guest User");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name || "Guest User");
      } catch {
        setUserName("Guest User");
      }
    }

    // Load the latest tasks from the live backend in the background.
    fetch("https://ablespace-backend-4mrj.onrender.com/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTasks(data);
        }
      })
      .catch((error) => {
        console.error("Backend loading failed:", error);
        // Keep the initial tasks visible if the backend is sleeping.
      });
  }, []);

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) =>
      !task.status ||
      task.status.toLowerCase() === "todo" ||
      task.status.toLowerCase() === "to do",
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status?.toLowerCase() === "in progress",
  ).length;

  const completedTasks = tasks.filter(
    (task) =>
      task.status?.toLowerCase() === "completed" ||
      task.status?.toLowerCase() === "done",
  ).length;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-blue-600"
          >
            AbleSpace
          </Link>

          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="/dashboard"
              className="font-semibold text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              href="/board"
              className="text-gray-600 hover:text-blue-600"
            >
              Board
            </Link>

            <Link
              href="/tasks"
              className="text-gray-600 hover:text-blue-600"
            >
              Tasks
            </Link>

            <Link
              href="/users"
              className="text-gray-600 hover:text-blue-600"
            >
              Users
            </Link>

            <Link
              href="/profile"
              className="text-gray-600 hover:text-blue-600"
            >
              Profile
            </Link>

            <Link
              href="/settings"
              className="text-gray-600 hover:text-blue-600"
            >
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-blue-600">
            Dashboard
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {userName}
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your tasks and keep track of your work.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalTasks}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">To Do</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {todoTasks}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">In Progress</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {inProgressTasks}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {completedTasks}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Tasks
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest tasks
              </p>
            </div>

            <Link
              href="/tasks"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-left">
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Task
                  </th>

                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Description
                  </th>

                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {tasks.slice(0, 5).map((task) => (
                  <tr
                    key={task.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      <Link
                        href={`/task-view?id=${task.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {task.title}
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {task.description || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                        {task.status || "Todo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <Link
            href="/tasks"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Create a Task
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Add a new task to your task list.
            </p>
          </Link>

          <Link
            href="/board"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Open Task Board
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              View and organize your tasks on the board.
            </p>
          </Link>

          <Link
            href="/task-view"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Task View
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Open the task details page.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}