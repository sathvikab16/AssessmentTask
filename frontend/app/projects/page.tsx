"use client";

import { useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      name: "Website Redesign",
      priority: "High",
      lead: "John Doe",
      dueDate: "15 Sep 2026",
    },
    {
      name: "Mobile App Launch",
      priority: "Medium",
      lead: "Jane Smith",
      dueDate: "20 Sep 2026",
    },
  ]);

  const addProject = () => {
    const projectName = window.prompt("Enter project name");

    if (!projectName) return;

    setProjects([
      ...projects,
      {
        name: projectName,
        priority: "Low",
        lead: "New Lead",
        dueDate: "30 Sep 2026",
      },
    ]);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Projects</h1>

        <button
          onClick={addProject}
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          + Add Project
        </button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Project</th>
              <th className="text-left p-4">Priority</th>
              <th className="text-left p-4">Lead</th>
              <th className="text-left p-4">Due Date</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">{project.name}</td>
                <td className="p-4">{project.priority}</td>
                <td className="p-4">{project.lead}</td>
                <td className="p-4">{project.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}