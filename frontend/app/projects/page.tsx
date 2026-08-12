"use client";

import { useMemo, useState } from "react";

type ColorName =
  | "Amber"
  | "Blue"
  | "Pink"
  | "Rose"
  | "Emerald"
  | "Black";

type Project = {
  id: number;
  name: string;
  priority: "High" | "Medium" | "Low";
  lead: string;
  dueDate: string;
};

const colorOptions: {
  name: ColorName;
  className: string;
}[] = [
  { name: "Amber", className: "bg-amber-500" },
  { name: "Blue", className: "bg-blue-500" },
  { name: "Pink", className: "bg-pink-500" },
  { name: "Rose", className: "bg-rose-500" },
  { name: "Emerald", className: "bg-emerald-500" },
  { name: "Black", className: "bg-black" },
];

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Design Homepage",
    priority: "High",
    lead: "A",
    dueDate: "12 Sep 2026",
  },
  {
    id: 2,
    name: "Develop Login Feature",
    priority: "Low",
    lead: "CN",
    dueDate: "15 Sep 2026",
  },
  {
    id: 3,
    name: "Test Payment Gateway",
    priority: "Medium",
    lead: "+",
    dueDate: "18 Sep 2026",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] =
    useState<Project[]>(initialProjects);

  const [profileOpen, setProfileOpen] = useState(true);
  const [colorOpen, setColorOpen] = useState(false);

  const [theme, setTheme] =
    useState<"light" | "dark">("light");

  const [color, setColor] =
    useState<ColorName>("Blue");

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [fieldsOpen, setFieldsOpen] =
    useState(false);

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [settingsOpen, setSettingsOpen] =
    useState(false);

  const [showAddProject, setShowAddProject] =
    useState(false);

  const [newProjectName, setNewProjectName] =
    useState("");

  const [showAddTask, setShowAddTask] =
    useState(false);

  const [taskMessage, setTaskMessage] =
    useState("");

  const [showLead, setShowLead] =
    useState(true);

  const [showPriority, setShowPriority] =
    useState(true);

  const [showDueDate, setShowDueDate] =
    useState(true);

  const [filterPriority, setFilterPriority] =
    useState<"All" | "High" | "Medium" | "Low">(
      "All",
    );

  const isDark = theme === "dark";

  const accentClass =
    color === "Amber"
      ? "bg-amber-500"
      : color === "Blue"
        ? "bg-blue-500"
        : color === "Pink"
          ? "bg-pink-500"
          : color === "Rose"
            ? "bg-rose-500"
            : color === "Emerald"
              ? "bg-emerald-500"
              : "bg-black";

  const accentTextClass =
    color === "Amber"
      ? "text-amber-600"
      : color === "Blue"
        ? "text-blue-600"
        : color === "Pink"
          ? "text-pink-600"
          : color === "Rose"
            ? "text-rose-600"
            : color === "Emerald"
              ? "text-emerald-600"
              : "text-black";

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesPriority =
        filterPriority === "All" ||
        project.priority === filterPriority;

      return matchesSearch && matchesPriority;
    });
  }, [projects, search, filterPriority]);

  function chooseColor(value: ColorName) {
    setColor(value);
    setColorOpen(false);
  }

  function toggleTheme() {
    setTheme((current) =>
      current === "light" ? "dark" : "light",
    );
  }

  function addProject() {
    const name = newProjectName.trim();

    if (!name) return;

    const newProject: Project = {
      id:
        projects.length > 0
          ? Math.max(...projects.map((p) => p.id)) + 1
          : 1,
      name,
      priority: "Medium",
      lead: "A",
      dueDate: "20 Sep 2026",
    };

    setProjects((current) => [
      ...current,
      newProject,
    ]);

    setNewProjectName("");
    setShowAddProject(false);
  }

  function addTask() {
    if (!taskMessage.trim()) return;

    alert(`Task added: ${taskMessage.trim()}`);

    setTaskMessage("");
    setShowAddTask(false);
  }

  function toggleField(
    field: "lead" | "priority" | "dueDate",
  ) {
    if (field === "lead") {
      setShowLead((value) => !value);
    }

    if (field === "priority") {
      setShowPriority((value) => !value);
    }

    if (field === "dueDate") {
      setShowDueDate((value) => !value);
    }
  }

  return (
    <main
      className={
        isDark
          ? "min-h-screen bg-[#171717] text-white"
          : "min-h-screen bg-[#f7f7f7] text-[#171717]"
      }
    >
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside
          className={
            isDark
              ? "w-[170px] shrink-0 border-r border-gray-700 bg-[#202020]"
              : "w-[170px] shrink-0 border-r border-gray-200 bg-white"
          }
        >
          {/* TOP PROFILE */}
          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setProfileOpen((value) => !value)
              }
              className="flex h-[58px] w-full items-center gap-2 px-5 text-left"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ${accentClass}`}
              >
                D
              </div>

              <span className="text-[11px] font-semibold">
                Dexter
              </span>

              <span className="ml-auto text-[11px]">
                ⌃
              </span>
            </button>

            {/* PROFILE MENU */}
            {profileOpen && (
              <div
                className={
                  isDark
                    ? "absolute left-2 top-[58px] z-50 w-[150px] rounded-lg border border-gray-700 bg-[#252525] p-2 shadow-xl"
                    : "absolute left-2 top-[58px] z-50 w-[150px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl"
                }
              >
                <div className="mb-2 border-b border-gray-200 pb-3 text-center dark:border-gray-700">

                  <div
                    className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${accentClass}`}
                  >
                    D
                  </div>

                  <p className="text-[10px] font-medium">
                    Dexter
                  </p>

                  <p className="text-[8px] text-gray-400">
                    Dexter@gmail.com
                  </p>
                </div>

                {/* CHANGE THEME */}
                <button
                  type="button"
                  onClick={() => {
                    setColorOpen(false);
                    setSettingsOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>☼ &nbsp; Change Theme</span>
                  <span>›</span>
                </button>

                {/* COLOR MODE */}
                <button
                  type="button"
                  onClick={() => {
                    setColorOpen(
                      (value) => !value,
                    );
                    setSettingsOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rounded-sm ${accentClass}`}
                    />
                    Color Mode
                  </span>

                  <span>›</span>
                </button>

                {/* COLOR MENU */}
                {colorOpen && (
                  <div
                    className={
                      isDark
                        ? "absolute left-[150px] top-[108px] z-[100] w-[120px] rounded-lg border border-gray-700 bg-[#252525] p-2 shadow-xl"
                        : "absolute left-[150px] top-[108px] z-[100] w-[120px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl"
                    }
                  >
                    <p className="px-2 py-1 text-[8px] text-gray-400">
                      Color Mode
                    </p>

                    {colorOptions.map(
                      (option) => (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() =>
                            chooseColor(
                              option.name,
                            )
                          }
                          className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-[9px] hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <span
                            className={`h-3 w-3 rounded-sm ${option.className}`}
                          />

                          <span>
                            {option.name}
                          </span>

                          {color ===
                            option.name && (
                            <span className="ml-auto">
                              ✓
                            </span>
                          )}
                        </button>
                      ),
                    )}
                  </div>
                )}

                {/* LIGHT / DARK */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>
                    {isDark ? "☀" : "◐"}{" "}
                    {isDark
                      ? "Light"
                      : "Dark"}
                  </span>

                  <span>
                    {isDark ? "Light" : "Dark"}
                  </span>
                </button>

                {/* SETTINGS */}
                <button
                  type="button"
                  onClick={() => {
                    setSettingsOpen(
                      (value) => !value,
                    );
                    setColorOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>⚙ Settings</span>
                  <span>›</span>
                </button>

                {settingsOpen && (
                  <div className="mt-1 rounded-md bg-gray-50 p-2 dark:bg-[#303030]">
                    <p className="text-[9px] text-gray-500">
                      Settings
                    </p>

                    <p className="mt-1 text-[9px]">
                      Theme: {isDark ? "Dark" : "Light"}
                    </p>

                    <p className="mt-1 text-[9px]">
                      Color: {color}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">

          {/* TOP BAR */}
          <header
            className={
              isDark
                ? "flex h-[58px] items-center justify-between border-b border-gray-700 bg-[#202020] px-5"
                : "flex h-[58px] items-center justify-between border-b border-gray-200 bg-white px-5"
            }
          >
            <button
              type="button"
              className="text-gray-500"
            >
              ◧
            </button>

            <div className="flex items-center gap-2">

              {/* SEARCH */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setSearchOpen(
                      (value) => !value,
                    )
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-xs hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  title="Search"
                >
                  ⌕
                </button>

                {searchOpen && (
                  <div className="absolute right-0 top-9 z-50 w-[220px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-[#252525]">
                    <input
                      autoFocus
                      value={search}
                      onChange={(event) =>
                        setSearch(
                          event.target.value,
                        )
                      }
                      placeholder="Search projects..."
                      className="w-full rounded-md border border-gray-200 px-2 py-2 text-[10px] outline-none dark:border-gray-600 dark:bg-[#303030]"
                    />
                  </div>
                )}
              </div>

              {/* FIELDS */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setFieldsOpen(
                      (value) => !value,
                    )
                  }
                  className="rounded-md border border-gray-200 px-2 py-1.5 text-[10px] hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  ▦ Fields
                </button>

                {fieldsOpen && (
                  <div className="absolute right-0 top-9 z-50 w-[150px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-[#252525]">

                    <p className="mb-1 px-2 py-1 text-[9px] text-gray-400">
                      Fields
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        toggleField(
                          "priority",
                        )
                      }
                      className="flex w-full items-center justify-between px-2 py-2 text-[9px] hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Priority
                      <span>
                        {showPriority
                          ? "✓"
                          : ""}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toggleField("lead")
                      }
                      className="flex w-full items-center justify-between px-2 py-2 text-[9px] hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Lead
                      <span>
                        {showLead ? "✓" : ""}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toggleField(
                          "dueDate",
                        )
                      }
                      className="flex w-full items-center justify-between px-2 py-2 text-[9px] hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Due Date
                      <span>
                        {showDueDate
                          ? "✓"
                          : ""}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* FILTER */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setFilterOpen(
                      (value) => !value,
                    )
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-xs hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  title="Filter"
                >
                  ⚱
                </button>

                {filterOpen && (
                  <div className="absolute right-0 top-9 z-50 w-[140px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-[#252525]">

                    <p className="px-2 py-1 text-[9px] text-gray-400">
                      Priority
                    </p>

                    {[
                      "All",
                      "High",
                      "Medium",
                      "Low",
                    ].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setFilterPriority(
                            value as
                              | "All"
                              | "High"
                              | "Medium"
                              | "Low",
                          );
                          setFilterOpen(
                            false,
                          );
                        }}
                        className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[9px] hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {value}

                        {filterPriority ===
                          value && (
                          <span>✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ADD TASK */}
              <button
                type="button"
                onClick={() =>
                  setShowAddTask(true)
                }
                className={`${accentClass} rounded-md px-3 py-2 text-[10px] font-medium text-white hover:opacity-90`}
              >
                + Add Task
              </button>
            </div>
          </header>

          {/* CONTENT */}
          <div className="p-5">

            <div className="mb-3 flex items-center justify-between">
              <h1 className="text-sm font-semibold">
                Projects
              </h1>

              <button
                type="button"
                onClick={() =>
                  setShowAddProject(true)
                }
                className={`${accentClass} rounded-md px-3 py-2 text-[10px] font-medium text-white hover:opacity-90`}
              >
                + Add Project
              </button>
            </div>

            {/* PROJECT TABLE */}
            <div
              className={
                isDark
                  ? "overflow-hidden rounded-lg border border-gray-700 bg-[#202020]"
                  : "overflow-hidden rounded-lg border border-gray-200 bg-white"
              }
            >
              {/* TABLE HEADER */}
              <div
                className={
                  isDark
                    ? "grid grid-cols-[1fr_100px_100px_120px_50px] bg-[#292929]"
                    : "grid grid-cols-[1fr_100px_100px_120px_50px] bg-[#f7f7f7]"
                }
              >
                <div className="px-3 py-2 text-[10px] font-medium">
                  Projects
                </div>

                {showPriority && (
                  <div className="px-3 py-2 text-[10px] font-medium">
                    Priority
                  </div>
                )}

                {showLead && (
                  <div className="px-3 py-2 text-[10px] font-medium">
                    Lead
                  </div>
                )}

                {showDueDate && (
                  <div className="px-3 py-2 text-[10px] font-medium">
                    Due Date
                  </div>
                )}

                <div className="px-3 py-2 text-[10px] font-medium">
                  Actions
                </div>
              </div>

              {/* ROWS */}
              {filteredProjects.map(
                (project) => (
                  <div
                    key={project.id}
                    className={
                      isDark
                        ? "grid grid-cols-[1fr_100px_100px_120px_50px] items-center border-t border-gray-700"
                        : "grid grid-cols-[1fr_100px_100px_120px_50px] items-center border-t border-gray-100"
                    }
                  >
                    <div className="px-3 py-3 text-[10px]">
                      <button
                        type="button"
                        className={`text-left hover:underline ${accentTextClass}`}
                        onClick={() =>
                          alert(
                            `Opening ${project.name}`,
                          )
                        }
                      >
                        {project.name}
                      </button>
                    </div>

                    {showPriority && (
                      <div
                        className={`px-3 text-[10px] ${
                          project.priority ===
                          "High"
                            ? "text-red-500"
                            : project.priority ===
                                "Medium"
                              ? "text-orange-500"
                              : "text-gray-400"
                        }`}
                      >
                        ↗{" "}
                        {project.priority}
                      </div>
                    )}

                    {showLead && (
                      <div className="px-3">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${
                            project.lead ===
                            "+"
                              ? "border border-gray-300 text-gray-500"
                              : `${accentClass} text-white`
                          } text-[8px]`}
                        >
                          {project.lead}
                        </span>
                      </div>
                    )}

                    {showDueDate && (
                      <div className="px-3 text-[10px]">
                        {project.dueDate}
                      </div>
                    )}

                    <div className="px-3">
                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            `Actions for ${project.name}`,
                          )
                        }
                        className="text-gray-400 hover:text-black dark:hover:text-white"
                      >
                        •••
                      </button>
                    </div>
                  </div>
                ),
              )}

              {/* ADD PROJECT ROW */}
              <button
                type="button"
                onClick={() =>
                  setShowAddProject(true)
                }
                className="flex w-full items-center gap-2 border-t border-gray-100 px-3 py-3 text-left text-[10px] text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                + Add Projects
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ADD PROJECT MODAL */}
      {showAddProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30">

          <div
            className={
              isDark
                ? "w-[350px] rounded-xl bg-[#252525] p-5 shadow-2xl"
                : "w-[350px] rounded-xl bg-white p-5 shadow-2xl"
            }
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                Add Project
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowAddProject(false)
                }
                className="text-gray-400"
              >
                ✕
              </button>
            </div>

            <input
              autoFocus
              value={newProjectName}
              onChange={(event) =>
                setNewProjectName(
                  event.target.value,
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addProject();
                }
              }}
              placeholder="Project name"
              className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none dark:border-gray-600 dark:bg-[#303030]"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setShowAddProject(false)
                }
                className="rounded-md border border-gray-200 px-3 py-2 text-[10px]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={addProject}
                className={`${accentClass} rounded-md px-3 py-2 text-[10px] text-white`}
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD TASK MODAL */}
      {showAddTask && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30">

          <div
            className={
              isDark
                ? "w-[350px] rounded-xl bg-[#252525] p-5 shadow-2xl"
                : "w-[350px] rounded-xl bg-white p-5 shadow-2xl"
            }
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                Add Task
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowAddTask(false)
                }
                className="text-gray-400"
              >
                ✕
              </button>
            </div>

            <input
              autoFocus
              value={taskMessage}
              onChange={(event) =>
                setTaskMessage(
                  event.target.value,
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addTask();
                }
              }}
              placeholder="Task name"
              className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none dark:border-gray-600 dark:bg-[#303030]"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setShowAddTask(false)
                }
                className="rounded-md border border-gray-200 px-3 py-2 text-[10px]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={addTask}
                className={`${accentClass} rounded-md px-3 py-2 text-[10px] text-white`}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}