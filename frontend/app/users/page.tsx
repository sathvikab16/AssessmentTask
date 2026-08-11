"use client";

import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Developer",
  },
];

export default function UsersPage() {
  const [users] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-900 dark:bg-gray-900 dark:text-white md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Users</h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage users and their roles.
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-left dark:border-gray-700 dark:bg-gray-700">
                  <th className="px-6 py-4 text-sm font-semibold">
                    Name
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Role
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-b-0 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                          {user.name.charAt(0)}
                        </div>

                        <span className="font-medium">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}