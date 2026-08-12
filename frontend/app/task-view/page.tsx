
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Plus,
  ChevronDown,
  MoreHorizontal,
  LayoutGrid,
  CheckSquare,
  FolderKanban,
  X,
  Trash2,
  ArrowRight,
  User,
  CalendarDays,
} from "lucide-react";

type Status = "To Do" | "Doing" | "Completed";
type Priority = "High" | "Medium" | "Low";

type Task = {
  id: number;
  title: string;
  priority: Priority;
  member: string;
  dueDate: string;
  status: Status;
  labels: string;
  reporter: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design Homepage",
    priority: "High",
    member: "D",
    dueDate: "12 Sep 2026",
    status: "To Do",
    labels: "Design",
    reporter: "Dexter",
  },
  {
    id: 2,
    title: "Develop Login Feature",
    priority: "Low",
    member: "CN",
    dueDate: "15 Sep 2026",
    status: "To Do",
    labels: "Development",
    reporter: "Dexter",
  },
  {
    id: 3,
    title: "Test Payment Gateway",
    priority: "Medium",
    member: "+",
    dueDate: "18 Sep 2026",
    status: "To Do",
    labels: "Testing",
    reporter: "Dexter",
  },
  {
    id: 4,
    title: "Design Homepage",
    priority: "High",
    member: "D",
    dueDate: "12 Sep 2026",
    status: "Doing",
    labels: "Design",
    reporter: "Dexter",
  },
  {
    id: 5,
    title: "Develop Login Feature",
    priority: "Low",
    member: "CN",
    dueDate: "15 Sep 2026",
    status: "Doing",
    labels: "Development",
    reporter: "Dexter",
  },
  {
    id: 6,
    title: "Test Payment Gateway",
    priority: "Medium",
    member: "+",
    dueDate: "18 Sep 2026",
    status: "Doing",
    labels: "Testing",
    reporter: "Dexter",
  },
  {
    id: 7,
    title: "Design Homepage",
    priority: "High",
    member: "D",
    dueDate: "12 Sep 2026",
    status: "Completed",
    labels: "Design",
    reporter: "Dexter",
  },
  {
    id: 8,
    title: "Develop Login Feature",
    priority: "Low",
    member: "CN",
    dueDate: "15 Sep 2026",
    status: "Completed",
    labels: "Development",
    reporter: "Dexter",
  },
  {
    id: 9,
    title: "Test Payment Gateway",
    priority: "Medium",
    member: "+",
    dueDate: "18 Sep 2026",
    status: "Completed",
    labels: "Testing",
    reporter: "Dexter",
  },
];

const statuses: Status[] = ["To Do", "Doing", "Completed"];

export default function TaskViewPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [showFields, setShowFields] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [view, setView] = useState<"list" | "board">("list");

  const [filterStatus, setFilterStatus] = useState<"All" | Status>("All");
  const [filterPriority, setFilterPriority] =
    useState<"All" | Priority>("All");

  const [collapsed, setCollapsed] = useState<Record<Status, boolean>>({
    "To Do": false,
    Doing: false,
    Completed: false,
  });

  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("Medium");
  const [newStatus, setNewStatus] = useState<Status>("To Do");
  const [newDueDate, setNewDueDate] = useState("");
  const [newMember, setNewMember] = useState("D");

  const [columns, setColumns] = useState({
    priority: true,
    members: true,
    dueDate: true,
    labels: false,
    status: false,
    reporter: false,
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.member.toLowerCase().includes(search.toLowerCase()) ||
        task.labels.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || task.status === filterStatus;

      const matchesPriority =
        filterPriority === "All" || task.priority === filterPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, filterStatus, filterPriority]);

  const addTask = () => {
    if (!newTitle.trim()) {
      alert("Please enter a task name.");
      return;
    }

    const task: Task = {
      id: Date.now(),
      title: newTitle.trim(),
      priority: newPriority,
      member: newMember || "+",
      dueDate: newDueDate
        ? new Date(newDueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "No date",
      status: newStatus,
      labels: "New",
      reporter: "Dexter",
    };

    setTasks((current) => [...current, task]);

    setNewTitle("");
    setNewPriority("Medium");
    setNewStatus("To Do");
    setNewDueDate("");
    setNewMember("D");
    setShowAddTask(false);
  };

  const deleteTask = (id: number) => {
    setTasks((current) => current.filter((task) => task.id !== id));
    setOpenMenu(null);
  };

  const moveTask = (id: number, status: Status) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status } : task,
      ),
    );

    setOpenMenu(null);
  };

  const toggleColumn = (column: keyof typeof columns) => {
    setColumns((current) => ({
      ...current,
      [column]: !current[column],
    }));
  };

  const resetFilters = () => {
    setFilterStatus("All");
    setFilterPriority("All");
    setSearch("");
  };

  return (
    <main
      className="min-h-screen bg-[#f5f5f5] text-gray-900"
      onClick={() => setOpenMenu(null)}
    >
      <div className="mx-2 my-12 flex min-h-[560px] overflow-hidden bg-white shadow-sm">
        {/* SIDEBAR */}
        <aside className="w-[160px] shrink-0 border-r border-gray-200 bg-white">
          <div className="flex h-12 items-center justify-between border-b border-gray-100 px-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[10px] font-bold text-white">
                D
              </div>

              <span className="text-xs font-medium">Dexter</span>
            </div>

            <ChevronDown size={12} />
          </div>

          <div className="px-3 pt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-medium text-gray-700">
                Workspace
              </span>

              <ChevronDown size={12} />
            </div>

            <nav className="space-y-1">
              <Link
                href="/tasks"
                className="flex items-center gap-2 rounded-md bg-gray-100 px-2 py-2 text-[11px] font-medium text-gray-800"
              >
                <CheckSquare size={13} />
                Tasks
              </Link>

              <Link
                href="/projects"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-[11px] text-gray-700 hover:bg-gray-100"
              >
                <FolderKanban size={13} />
                Projects
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-[11px] text-gray-700 hover:bg-gray-100"
              >
                <User size={13} />
                Profile
              </Link>
            </nav>
          </div>
        </aside>

        {/* MAIN */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* TOP BAR */}
          <header className="flex h-10 items-center border-b border-gray-200 px-3">
            <button className="text-gray-600 hover:text-black">
              <LayoutGrid size={14} />
            </button>

            <div className="ml-3 h-4 w-px bg-gray-200" />
          </header>

          <div className="flex-1 overflow-auto px-3 py-4">
            {/* HEADER */}
            <div className="mb-3 flex items-center justify-between">
              <h1 className="text-sm font-semibold">Tasks</h1>

              <div className="flex items-center gap-1">
                {/* SEARCH */}
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowSearch(!showSearch);
                    setShowFields(false);
                    setShowFilter(false);
                  }}
                  title="Search"
                  className={`flex h-7 w-7 items-center justify-center rounded border ${
                    showSearch
                      ? "border-black bg-gray-100"
                      : "border-gray-200 bg-white"
                  } hover:bg-gray-50`}
                >
                  <Search size={13} />
                </button>

                {/* FIELDS */}
                <div className="relative">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setShowFields(!showFields);
                      setShowFilter(false);
                      setShowSearch(false);
                    }}
                    className={`flex h-7 items-center gap-1 rounded border px-2 text-[10px] ${
                      showFields
                        ? "border-black bg-gray-100"
                        : "border-gray-200 bg-white"
                    } hover:bg-gray-50`}
                  >
                    <LayoutGrid size={12} />
                    Fields
                  </button>

                  {showFields && (
                    <div
                      onClick={(event) => event.stopPropagation()}
                      className="absolute right-0 top-9 z-30 w-[190px] rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
                    >
                      <div className="mb-2 grid grid-cols-2 gap-1 rounded-md bg-gray-50 p-1">
                        <button
                          onClick={() => setView("list")}
                          className={`rounded px-2 py-1.5 text-[10px] ${
                            view === "list"
                              ? "bg-white shadow-sm"
                              : "text-gray-500"
                          }`}
                        >
                          ☰ List
                        </button>

                        <button
                          onClick={() => setView("board")}
                          className={`rounded px-2 py-1.5 text-[10px] ${
                            view === "board"
                              ? "bg-white shadow-sm"
                              : "text-gray-500"
                          }`}
                        >
                          ▦ Board
                        </button>
                      </div>

                      {[
                        ["priority", "Priority"],
                        ["members", "Members"],
                        ["dueDate", "Due Date"],
                        ["labels", "Labels"],
                        ["status", "Status"],
                        ["reporter", "Reporter"],
                      ].map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() =>
                            toggleColumn(key as keyof typeof columns)
                          }
                          className="flex w-full items-center justify-between px-2 py-2 text-left text-[10px] hover:bg-gray-50"
                        >
                          <span>{label}</span>

                          <span
                            className={`flex h-3 w-3 items-center justify-center rounded ${
                              columns[key as keyof typeof columns]
                                ? "bg-black text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            {columns[key as keyof typeof columns] ? "✓" : ""}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* FILTER */}
                <div className="relative">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setShowFilter(!showFilter);
                      setShowFields(false);
                      setShowSearch(false);
                    }}
                    title="Filter"
                    className={`flex h-7 w-7 items-center justify-center rounded border ${
                      showFilter
                        ? "border-black bg-gray-100"
                        : "border-gray-200 bg-white"
                    } hover:bg-gray-50`}
                  >
                    <SlidersHorizontal size={13} />
                  </button>

                  {showFilter && (
                    <div
                      onClick={(event) => event.stopPropagation()}
                      className="absolute right-0 top-9 z-30 w-[210px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-semibold">
                          Filter tasks
                        </span>

                        <button
                          onClick={resetFilters}
                          className="text-[10px] text-blue-600 hover:underline"
                        >
                          Clear
                        </button>
                      </div>

                      <label className="mb-1 block text-[10px] text-gray-500">
                        Status
                      </label>

                      <select
                        value={filterStatus}
                        onChange={(event) =>
                          setFilterStatus(
                            event.target.value as "All" | Status,
                          )
                        }
                        className="mb-3 w-full rounded border border-gray-200 p-2 text-xs outline-none"
                      >
                        <option value="All">All statuses</option>
                        <option value="To Do">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Completed">Completed</option>
                      </select>

                      <label className="mb-1 block text-[10px] text-gray-500">
                        Priority
                      </label>

                      <select
                        value={filterPriority}
                        onChange={(event) =>
                          setFilterPriority(
                            event.target.value as "All" | Priority,
                          )
                        }
                        className="w-full rounded border border-gray-200 p-2 text-xs outline-none"
                      >
                        <option value="All">All priorities</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* ADD */}
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowAddTask(true);
                  }}
                  className="ml-1 flex h-7 items-center gap-1 rounded-md bg-black px-3 text-[10px] font-medium text-white hover:bg-gray-800"
                >
                  <Plus size={12} />
                  Add Task
                </button>
              </div>
            </div>

            {/* SEARCH BOX */}
            {showSearch && (
              <div className="mb-3 flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2">
                <Search size={14} className="text-gray-400" />

                <input
                  autoFocus
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search tasks..."
                  className="flex-1 text-xs outline-none"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-gray-400 hover:text-black"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            )}

            {/* BOARD VIEW */}
            {view === "board" ? (
              <div className="grid gap-3 md:grid-cols-3">
                {statuses.map((status) => {
                  const statusTasks = filteredTasks.filter(
                    (task) => task.status === status,
                  );

                  return (
                    <div
                      key={status}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-2"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold">
                          {status}
                        </span>

                        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[9px]">
                          {statusTasks.length}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {statusTasks.map((task) => (
                          <div
                            key={task.id}
                            className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
                          >
                            <div className="mb-2 flex items-start justify-between">
                              <span className="text-xs font-medium">
                                {task.title}
                              </span>

                              <Priority priority={task.priority} />
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-gray-500">
                              <span className="flex items-center gap-1">
                                <CalendarDays size={11} />
                                {task.dueDate}
                              </span>

                              <Member value={task.member} />
                            </div>

                            <div className="mt-3 flex gap-1">
                              {status !== "To Do" && (
                                <button
                                  onClick={() =>
                                    moveTask(
                                      task.id,
                                      status === "Doing"
                                        ? "To Do"
                                        : "Doing",
                                    )
                                  }
                                  className="rounded border px-2 py-1 text-[9px] hover:bg-gray-50"
                                >
                                  Move back
                                </button>
                              )}

                              {status !== "Completed" && (
                                <button
                                  onClick={() =>
                                    moveTask(
                                      task.id,
                                      status === "To Do"
                                        ? "Doing"
                                        : "Completed",
                                    )
                                  }
                                  className="rounded bg-black px-2 py-1 text-[9px] text-white"
                                >
                                  Move forward
                                </button>
                              )}

                              <button
                                onClick={() => deleteTask(task.id)}
                                className="ml-auto rounded p-1 text-red-500 hover:bg-red-50"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={() => {
                            setNewStatus(status);
                            setShowAddTask(true);
                          }}
                          className="flex w-full items-center gap-1 rounded-md p-2 text-[10px] text-gray-600 hover:bg-white"
                        >
                          <Plus size={12} />
                          Add Task
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW */
              <div>
                {statuses.map((status) => {
                  const statusTasks = filteredTasks.filter(
                    (task) => task.status === status,
                  );

                  return (
                    <section key={status} className="mb-3">
                      <button
                        onClick={() =>
                          setCollapsed((current) => ({
                            ...current,
                            [status]: !current[status],
                          }))
                        }
                        className="mb-2 flex items-center gap-1"
                      >
                        <ChevronDown
                          size={13}
                          className={`text-gray-600 transition ${
                            collapsed[status] ? "-rotate-90" : ""
                          }`}
                        />

                        <h2 className="text-xs font-medium text-gray-700">
                          {status}
                        </h2>

                        <span className="ml-1 text-[9px] text-gray-400">
                          {statusTasks.length}
                        </span>
                      </button>

                      {!collapsed[status] && (
                        <div className="overflow-visible rounded-lg border border-gray-200 bg-white">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="h-9 border-b border-gray-200 bg-gray-50">
                                  <th className="min-w-[210px] px-2 text-left text-[10px] font-medium text-gray-700">
                                    Task
                                  </th>

                                  {columns.priority && (
                                    <th className="w-[90px] px-2 text-left text-[10px] font-medium text-gray-700">
                                      Priority
                                    </th>
                                  )}

                                  {columns.members && (
                                    <th className="w-[85px] px-2 text-left text-[10px] font-medium text-gray-700">
                                      Members
                                    </th>
                                  )}

                                  {columns.dueDate && (
                                    <th className="w-[105px] px-2 text-left text-[10px] font-medium text-gray-700">
                                      Due Date
                                    </th>
                                  )}

                                  {columns.labels && (
                                    <th className="w-[90px] px-2 text-left text-[10px] font-medium text-gray-700">
                                      Labels
                                    </th>
                                  )}

                                  {columns.status && (
                                    <th className="w-[80px] px-2 text-left text-[10px] font-medium text-gray-700">
                                      Status
                                    </th>
                                  )}

                                  {columns.reporter && (
                                    <th className="w-[90px] px-2 text-left text-[10px] font-medium text-gray-700">
                                      Reporter
                                    </th>
                                  )}

                                  <th className="w-10 px-2 text-right text-[10px] font-medium text-gray-700">
                                    Actions
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {statusTasks.map((task) => (
                                  <tr
                                    key={task.id}
                                    className="h-10 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                  >
                                    <td className="px-2 text-xs text-gray-800">
                                      {task.title}
                                    </td>

                                    {columns.priority && (
                                      <td className="px-2">
                                        <Priority
                                          priority={task.priority}
                                        />
                                      </td>
                                    )}

                                    {columns.members && (
                                      <td className="px-2">
                                        <Member value={task.member} />
                                      </td>
                                    )}

                                    {columns.dueDate && (
                                      <td className="px-2 text-[10px] text-gray-600">
                                        {task.dueDate}
                                      </td>
                                    )}

                                    {columns.labels && (
                                      <td className="px-2">
                                        <span className="rounded bg-gray-100 px-2 py-1 text-[9px] text-gray-600">
                                          {task.labels}
                                        </span>
                                      </td>
                                    )}

                                    {columns.status && (
                                      <td className="px-2 text-[10px]">
                                        {task.status}
                                      </td>
                                    )}

                                    {columns.reporter && (
                                      <td className="px-2 text-[10px]">
                                        {task.reporter}
                                      </td>
                                    )}

                                    <td className="relative px-2 text-right">
                                      <button
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          setOpenMenu(
                                            openMenu === task.id
                                              ? null
                                              : task.id,
                                          );
                                        }}
                                        className="rounded p-1 text-gray-500 hover:bg-gray-100"
                                      >
                                        <MoreHorizontal size={15} />
                                      </button>

                                      {openMenu === task.id && (
                                        <div
                                          onClick={(event) =>
                                            event.stopPropagation()
                                          }
                                          className="absolute right-2 top-8 z-40 w-40 rounded-lg border border-gray-200 bg-white p-1 text-left shadow-lg"
                                        >
                                          {task.status !== "To Do" && (
                                            <button
                                              onClick={() =>
                                                moveTask(task.id, "To Do")
                                              }
                                              className="flex w-full items-center gap-2 rounded px-2 py-2 text-[10px] hover:bg-gray-50"
                                            >
                                              <ArrowRight size={12} />
                                              Move to To Do
                                            </button>
                                          )}

                                          {task.status !== "Doing" && (
                                            <button
                                              onClick={() =>
                                                moveTask(task.id, "Doing")
                                              }
                                              className="flex w-full items-center gap-2 rounded px-2 py-2 text-[10px] hover:bg-gray-50"
                                            >
                                              <ArrowRight size={12} />
                                              Move to Doing
                                            </button>
                                          )}

                                          {task.status !== "Completed" && (
                                            <button
                                              onClick={() =>
                                                moveTask(
                                                  task.id,
                                                  "Completed",
                                                )
                                              }
                                              className="flex w-full items-center gap-2 rounded px-2 py-2 text-[10px] hover:bg-gray-50"
                                            >
                                              <ArrowRight size={12} />
                                              Complete
                                            </button>
                                          )}

                                          <button
                                            onClick={() =>
                                              deleteTask(task.id)
                                            }
                                            className="flex w-full items-center gap-2 rounded px-2 py-2 text-[10px] text-red-600 hover:bg-red-50"
                                          >
                                            <Trash2 size={12} />
                                            Delete task
                                          </button>
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                ))}

                                {statusTasks.length === 0 && (
                                  <tr>
                                    <td
                                      colSpan={10}
                                      className="px-3 py-5 text-center text-[10px] text-gray-400"
                                    >
                                      No tasks found.
                                    </td>
                                  </tr>
                                )}

                                <tr className="h-9">
                                  <td
                                    colSpan={10}
                                    className="px-2"
                                  >
                                    <button
                                      onClick={() => {
                                        setNewStatus(status);
                                        setShowAddTask(true);
                                      }}
                                      className="flex items-center gap-2 text-xs text-gray-700 hover:text-black"
                                    >
                                      <Plus size={13} />
                                      Add Task
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ADD TASK MODAL */}
      {showAddTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
          onClick={() => setShowAddTask(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Add Task
              </h2>

              <button
                onClick={() => setShowAddTask(false)}
                className="rounded p-1 text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <label className="mb-1 block text-xs font-medium">
              Task name
            </label>

            <input
              autoFocus
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="Enter task name"
              className="mb-4 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-black"
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Priority
                </label>

                <select
                  value={newPriority}
                  onChange={(event) =>
                    setNewPriority(
                      event.target.value as Priority,
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium">
                  Status
                </label>

                <select
                  value={newStatus}
                  onChange={(event) =>
                    setNewStatus(event.target.value as Status)
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                >
                  <option value="To Do">To Do</option>
                  <option value="Doing">Doing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Due date
                </label>

                <input
                  type="date"
                  value={newDueDate}
                  onChange={(event) =>
                    setNewDueDate(event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium">
                  Member
                </label>

                <select
                  value={newMember}
                  onChange={(event) =>
                    setNewMember(event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                >
                  <option value="D">Dexter</option>
                  <option value="CN">CN</option>
                  <option value="+">No member</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowAddTask(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={addTask}
                className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
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

function Priority({ priority }: { priority: Priority }) {
  const styles = {
    High: "text-red-500",
    Medium: "text-orange-500",
    Low: "text-gray-400",
  };

  return (
    <span className={`text-[10px] font-medium ${styles[priority]}`}>
      ↗ {priority}
    </span>
  );
}

function Member({ value }: { value: string }) {
  if (value === "+") {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-500">
        +
      </div>
    );
  }

  if (value === "CN") {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-[9px] font-medium text-gray-600">
        CN
      </div>
    );
  }

  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[9px] font-bold text-white">
      {value}
    </div>
  );
}