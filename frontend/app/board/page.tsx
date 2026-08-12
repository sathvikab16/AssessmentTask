"use client";

import {
  CalendarDays,
  Check,
  ChevronDown,
  Ellipsis,
  Filter,
  Moon,
  Plus,
  Search,
  SlidersHorizontal,
  Sun,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";

type Status = "To Do" | "Doing" | "Completed" | "On Hold";

type Task = {
  id: string;
  title: string;
  assignee: string;
  date: string;
  tags: string[];
  status: Status;
  priority?: string;
  reporter?: string;
};

const statuses: Status[] = [
  "To Do",
  "Doing",
  "Completed",
  "On Hold",
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Write API Documentation",
    assignee: "Admin",
    date: "2026-07-29",
    tags: ["Deployment", "Documentation"],
    status: "To Do",
    priority: "High",
    reporter: "Admin",
  },
  {
    id: "2",
    title: "Implement Search Function",
    assignee: "Admin",
    date: "2026-07-29",
    tags: ["Development", "Search"],
    status: "To Do",
    priority: "Medium",
    reporter: "Admin",
  },
  {
    id: "3",
    title: "Deploy to Production",
    assignee: "Admin",
    date: "2026-07-29",
    tags: ["Deployment"],
    status: "To Do",
    priority: "High",
    reporter: "Admin",
  },
  {
    id: "4",
    title: "Code Review Completed",
    assignee: "Admin",
    date: "2026-07-29",
    tags: ["Development", "Review"],
    status: "Doing",
    priority: "Medium",
    reporter: "Admin",
  },
  {
    id: "5",
    title: "Design Mockups Finalized",
    assignee: "Admin",
    date: "2026-07-29",
    tags: ["Design", "Review"],
    status: "Doing",
    priority: "Medium",
    reporter: "Designer",
  },
  {
    id: "6",
    title: "Feature Testing Passed",
    assignee: "QA Team",
    date: "2026-07-30",
    tags: ["Testing", "Passed"],
    status: "Completed",
    priority: "Low",
    reporter: "QA Team",
  },
  {
    id: "7",
    title: "UI Design Updated",
    assignee: "Designer",
    date: "2026-07-31",
    tags: ["Design", "Updated"],
    status: "Completed",
    priority: "Medium",
    reporter: "Designer",
  },
  {
    id: "8",
    title: "Security Audit Scheduled",
    assignee: "Security",
    date: "2026-08-01",
    tags: ["Audit", "Scheduled"],
    status: "Completed",
    priority: "High",
    reporter: "Security",
  },
  {
    id: "9",
    title: "UI Review",
    assignee: "Design",
    date: "",
    tags: ["Review"],
    status: "On Hold",
    priority: "Medium",
    reporter: "Design",
  },
  {
    id: "10",
    title: "Backend Integration",
    assignee: "Dev Team",
    date: "",
    tags: ["Development"],
    status: "On Hold",
    priority: "High",
    reporter: "Dev Team",
  },
  {
    id: "11",
    title: "User Feedback",
    assignee: "Product",
    date: "",
    tags: ["Research"],
    status: "On Hold",
    priority: "Low",
    reporter: "Product",
  },
  {
    id: "12",
    title: "Performance Review",
    assignee: "Engineering",
    date: "",
    tags: ["Optimization"],
    status: "On Hold",
    priority: "Medium",
    reporter: "Engineering",
  },
];

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-600 text-[10px] font-semibold text-white">
      {initials}
    </div>
  );
}

function TaskCard({
  task,
  fields,
  onDelete,
}: {
  task: Task;
  fields: {
    priority: boolean;
    members: boolean;
    dueDate: boolean;
    labels: boolean;
    status: boolean;
    reporter: boolean;
  };
  onDelete: (id: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-medium leading-5 text-gray-900 dark:text-white">
          {task.title}
        </h3>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Ellipsis size={17} />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-3 top-10 z-20 w-32 rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => {
              onDelete(task.id);
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      )}

      {fields.members && (
        <div className="mb-3 flex items-center gap-2">
          <Avatar name={task.assignee} />

          <span className="text-sm text-gray-700 dark:text-gray-300">
            {task.assignee}
          </span>
        </div>
      )}

      {fields.dueDate && task.date && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
            <CalendarDays size={12} />

            {new Date(task.date).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {fields.labels &&
          task.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              <Tag size={11} />
              {tag}
            </span>
          ))}

        {fields.status && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            {task.status}
          </span>
        )}

        {fields.priority && task.priority && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            Priority: {task.priority}
          </span>
        )}

        {fields.reporter && task.reporter && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            Reporter: {task.reporter}
          </span>
        )}
      </div>
    </div>
  );
}

function AddTaskModal({
  status,
  onClose,
  onAdd,
}: {
  status: Status;
  onClose: () => void;
  onAdd: (task: Omit<Task, "id">) => void;
}) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("Admin");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd({
      title: title.trim(),
      assignee,
      date,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status,
      priority,
      reporter: assignee,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold dark:text-white">
              Add Task
            </h2>

            <p className="text-sm text-gray-500">
              Create a task in {status}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium dark:text-gray-200">
              Task title
            </label>

            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title"
              autoFocus
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium dark:text-gray-200">
              Assignee
            </label>

            <input
              value={assignee}
              onChange={(event) => setAssignee(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium dark:text-gray-200">
              Due date
            </label>

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium dark:text-gray-200">
              Priority
            </label>

            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium dark:text-gray-200">
              Tags
            </label>

            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="Development, Testing"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium dark:border-gray-600 dark:text-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BoardPage() {
  const { theme, setTheme } = useTheme();

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<Status | "All">("All");

  const [showFilter, setShowFilter] = useState(false);
  const [showFields, setShowFields] = useState(false);

  const [fields, setFields] = useState({
    priority: false,
    members: true,
    dueDate: false,
    labels: false,
    status: false,
    reporter: false,
  });

  const [modalStatus, setModalStatus] =
    useState<Status | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("assessment-tasks");

    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch {
        localStorage.removeItem("assessment-tasks");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "assessment-tasks",
      JSON.stringify(tasks),
    );
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        task.assignee
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        task.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase()),
        );

      const matchesFilter =
        filter === "All" || task.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  function toggleField(
    field: keyof typeof fields,
  ) {
    setFields((current) => ({
      ...current,
      [field]: !current[field],
    }));
  }

  function addTask(task: Omit<Task, "id">) {
    setTasks((current) => [
      ...current,
      {
        ...task,
        id: crypto.randomUUID(),
      },
    ]);

    setModalStatus(null);
  }

  function deleteTask(id: string) {
    setTasks((current) =>
      current.filter((task) => task.id !== id),
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-[250px] shrink-0 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 lg:block">
          <div className="flex h-[72px] items-center border-b border-gray-200 px-6 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
                A
              </div>

              <span className="text-base font-semibold dark:text-white">
                Assessment Task
              </span>
            </div>
          </div>

          <div className="p-4">
            <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wide text-gray-400">
              Workspace
            </p>

            <nav className="space-y-1">
              <a
                href="/board"
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2.5 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
              >
                <SlidersHorizontal size={18} />
                Tasks
              </a>

              <a
                href="/projects"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <div className="h-[18px] w-[18px] rounded border-2 border-gray-400" />
                Projects
              </a>
            </nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex min-h-[72px] flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-5 py-4 dark:border-gray-700 lg:px-7">
            <h1 className="text-xl font-semibold">
              Tasks
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setTheme(
                    theme === "dark" ? "light" : "dark",
                  )
                }
                className="flex h-10 items-center justify-center rounded-lg border border-gray-200 px-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {theme === "dark" ? (
                  <Sun size={17} />
                ) : (
                  <Moon size={17} />
                )}
              </button>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search"
                  className="h-10 w-40 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* FIELDS BUTTON */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setShowFields((value) => !value)
                  }
                  className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <SlidersHorizontal size={17} />

                  <span>Fields</span>

                  <ChevronDown size={14} />
                </button>

                {showFields && (
                  <div className="absolute right-0 top-12 z-50 w-[305px] rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                    {/* LIST / BOARD */}
                    <div className="mb-3 grid grid-cols-2 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 bg-white px-4 py-2.5 text-sm font-medium dark:bg-gray-800"
                      >
                        ☰ List
                      </button>

                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 border-l border-gray-200 px-4 py-2.5 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300"
                      >
                        ▦ Board
                      </button>
                    </div>

                    {/* PRIORITY */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleField("priority")
                      }
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span>Priority</span>

                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          fields.priority
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {fields.priority && (
                          <Check size={12} />
                        )}
                      </span>
                    </button>

                    {/* MEMBERS */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleField("members")
                      }
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span>Members</span>

                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          fields.members
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {fields.members && (
                          <Check size={12} />
                        )}
                      </span>
                    </button>

                    {/* DUE DATE */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleField("dueDate")
                      }
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span>Due Date</span>

                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          fields.dueDate
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {fields.dueDate && (
                          <Check size={12} />
                        )}
                      </span>
                    </button>

                    {/* LABELS */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleField("labels")
                      }
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span>Labels</span>

                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          fields.labels
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {fields.labels && (
                          <Check size={12} />
                        )}
                      </span>
                    </button>

                    {/* STATUS */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleField("status")
                      }
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span>Status</span>

                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          fields.status
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {fields.status && (
                          <Check size={12} />
                        )}
                      </span>
                    </button>

                    {/* REPORTER */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleField("reporter")
                      }
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span>Reporter</span>

                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          fields.reporter
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {fields.reporter && (
                          <Check size={12} />
                        )}
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
                    setShowFilter((value) => !value)
                  }
                  className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-200"
                >
                  <Filter size={17} />
                  Filter
                </button>

                {showFilter && (
                  <div className="absolute right-0 top-12 z-50 w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    {(["All", ...statuses] as const).map(
                      (status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => {
                            setFilter(status);
                            setShowFilter(false);
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          {status}

                          {filter === status && (
                            <Check size={15} />
                          )}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>

              {/* ADD TASK */}
              <button
                type="button"
                onClick={() => setModalStatus("To Do")}
                className="flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white hover:bg-black"
              >
                <Plus size={17} />
                Add Task
              </button>
            </div>
          </header>

          <div className="overflow-x-auto p-5 lg:p-7">
            <div className="flex min-w-[1280px] gap-4">
              {statuses.map((status) => {
                const columnTasks =
                  filteredTasks.filter(
                    (task) => task.status === status,
                  );

                return (
                  <section
                    key={status}
                    className="min-h-[500px] min-w-[300px] flex-1 rounded-xl bg-gray-50 p-2 dark:bg-gray-900"
                  >
                    <div className="flex items-center justify-between px-2 py-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold">
                          {status}
                        </h2>

                        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {columnTasks.length}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setModalStatus(status)
                        }
                        className="rounded-md p-1.5 text-gray-500 hover:bg-white dark:hover:bg-gray-800"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {columnTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          fields={fields}
                          onDelete={deleteTask}
                        />
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          setModalStatus(status)
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-600 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <Plus size={16} />
                        Add Task
                      </button>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {modalStatus && (
        <AddTaskModal
          status={modalStatus}
          onClose={() => setModalStatus(null)}
          onAdd={addTask}
        />
      )}
    </main>
  );
}