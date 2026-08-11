"use client";

import { useState } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      name: "Design Homepage",
      priority: "High",
      member: "👤",
      dueDate: "12 Sep 2026",
    },
    {
      name: "Develop Login Feature",
      priority: "Low",
      member: "👤",
      dueDate: "15 Sep 2026",
    },
    {
      name: "Test Payment Gateway",
      priority: "Medium",
      member: "👤",
      dueDate: "18 Sep 2026",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [showPriority, setShowPriority] = useState(true);
  const [showMembers, setShowMembers] = useState(true);
  const [showDueDate, setShowDueDate] = useState(true);

  const addTask = () => {
    const taskName = window.prompt("Enter task name");

    if (!taskName) return;

    setTasks([
      ...tasks,
      {
        name: taskName,
        priority: "Low",
        member: "👤",
        dueDate: "30 Sep 2026",
      },
    ]);
  };

  const toggleFields = () => {
    setShowPriority(!showPriority);
    setShowMembers(!showMembers);
    setShowDueDate(!showDueDate);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || task.priority === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 w-full bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Tasks</h1>

        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg bg-white"
          />

          <button
            onClick={toggleFields}
            className="border px-4 py-2 rounded-lg bg-white"
          >
            Fields
          </button>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-4 py-2 rounded-lg bg-white"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            onClick={addTask}
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            + Add Task
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Task</th>

              {showPriority && (
                <th className="text-left p-4">Priority</th>
              )}

              {showMembers && (
                <th className="text-left p-4">Members</th>
              )}

              {showDueDate && (
                <th className="text-left p-4">Due Date</th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">{task.name}</td>

                {showPriority && (
                  <td className="p-4">{task.priority}</td>
                )}

                {showMembers && (
                  <td className="p-4">{task.member}</td>
                )}

                {showDueDate && (
                  <td className="p-4">{task.dueDate}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}