"use client";

import { useState } from "react";

type Priority = "No Priority" | "Urgent" | "High" | "Medium" | "Low";
type Status = "Backlog" | "Todo" | "In Progress" | "Completed" | "On Hold";

type Subtask = {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  member: string;
  date: string;
};

const initialSubtasks: Subtask[] = [
  {
    id: 1,
    title: "Subtask 1",
    priority: "High",
    member: "A",
    date: "12 Sep 2026",
  },
  {
    id: 2,
    title: "Subtask 2",
    priority: "Low",
    member: "CN",
    date: "15 Sep 2026",
  },
  {
    id: 3,
    title: "Subtask 3",
    priority: "Medium",
    member: "",
    date: "18 Sep 2026",
  },
];

const priorityOptions: Priority[] = [
  "No Priority",
  "Urgent",
  "High",
  "Medium",
  "Low",
];

const statusOptions: Status[] = [
  "Backlog",
  "Todo",
  "In Progress",
  "Completed",
  "On Hold",
];

export default function TaskDetailsPage() {
  const [priority, setPriority] = useState<Priority>("Urgent");
  const [showPriority, setShowPriority] = useState(false);

  const [status, setStatus] = useState<Status>("Backlog");
  const [showStatus, setShowStatus] = useState(false);

  const [subtasks, setSubtasks] = useState<Subtask[]>(initialSubtasks);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>(["dsds"]);

  const [showSubtasks, setShowSubtasks] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [showUpdates, setShowUpdates] = useState(true);

  const [isWatching, setIsWatching] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const [notice, setNotice] = useState("");

  function showNotice(message: string) {
    setNotice(message);

    setTimeout(() => {
      setNotice("");
    }, 2000);
  }

  function addComment() {
    if (!comment.trim()) return;

    setComments((current) => [...current, comment.trim()]);
    setComment("");
    showNotice("Comment added");
  }

  function addSubtask() {
    const nextNumber = subtasks.length + 1;

    const newSubtask: Subtask = {
      id: Date.now(),
      title: `Subtask ${nextNumber}`,
      priority: "Medium",
      member: "",
      date: "20 Sep 2026",
    };

    setSubtasks((current) => [...current, newSubtask]);
    setShowSubtasks(true);
    showNotice("New subtask added");
  }

  function deleteSubtask(id: number) {
    setSubtasks((current) => current.filter((task) => task.id !== id));
    showNotice("Subtask deleted");
  }

  async function copyTaskLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showNotice("Task link copied");
    } catch {
      showNotice("Could not copy link");
    }
  }

  function getPriorityColor(currentPriority: Priority) {
    switch (currentPriority) {
      case "Urgent":
        return "text-red-500";
      case "High":
        return "text-orange-500";
      case "Medium":
        return "text-orange-400";
      case "Low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  }

  function getStatusColor(currentStatus: Status) {
    switch (currentStatus) {
      case "Backlog":
        return "text-orange-500";
      case "Todo":
        return "text-blue-500";
      case "In Progress":
        return "text-purple-500";
      case "Completed":
        return "text-green-500";
      case "On Hold":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#171717] dark:bg-[#111] dark:text-white">
      {/* SUCCESS / ACTION MESSAGE */}
      {notice && (
        <div className="fixed right-5 top-5 z-[100] rounded-lg bg-black px-4 py-3 text-xs text-white shadow-lg">
          {notice}
        </div>
      )}

      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-[184px] shrink-0 border-r border-gray-200 bg-[#fafafa] md:block dark:border-gray-800 dark:bg-[#151515]">
          <div className="flex h-[70px] items-center gap-2 px-7">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-bold text-white">
              D
            </div>

            <span className="text-xs font-semibold">Dexter</span>

            <button
              type="button"
              className="ml-auto text-gray-500"
              onClick={() => showNotice("Workspace menu")}
            >
              ⌃
            </button>
          </div>

          <div className="px-7 pt-4">
            <div className="mb-2 flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-300">
              <span>Workspace</span>

              <button
                type="button"
                onClick={() => showNotice("Workspace options")}
              >
                ⌄
              </button>
            </div>

            <a
              href="/board"
              className="flex items-center gap-2 rounded-lg bg-[#eeeeee] px-2 py-2 text-xs font-medium dark:bg-[#282828]"
            >
              <span>▦</span>
              Tasks
            </a>

            <a
              href="/projects"
              className="mt-1 flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <span>▱</span>
              Projects
            </a>
          </div>
        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">
          {/* TOP BAR */}
          <header className="flex h-[70px] items-center justify-between border-b border-gray-200 px-5 dark:border-gray-800">
            <button
              type="button"
              className="text-gray-500 hover:text-black dark:hover:text-white"
              onClick={() => window.history.back()}
              title="Go back"
            >
              ◧
            </button>

            <div className="flex items-center gap-2">
              {/* ADD SUBTASK */}
              <button
                type="button"
                onClick={addSubtask}
                title="Add subtask"
                className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                ♧
              </button>

              {/* WATCH */}
              <button
                type="button"
                onClick={() => {
                  setIsWatching((current) => !current);

                  showNotice(
                    isWatching
                      ? "Stopped watching task"
                      : "Now watching task",
                  );
                }}
                title={isWatching ? "Stop watching" : "Watch task"}
                className={`rounded-md border px-2 py-1 text-xs hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 ${
                  isWatching
                    ? "border-purple-400 bg-purple-50 text-purple-600 dark:bg-purple-950"
                    : "border-gray-200"
                }`}
              >
                ◉
              </button>

              {/* COPY LINK */}
              <button
                type="button"
                onClick={copyTaskLink}
                title="Copy task link"
                className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                ↗
              </button>

              {/* MORE */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMoreMenu((current) => !current)}
                  title="More options"
                  className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  •••
                </button>

                {showMoreMenu && (
                  <div className="absolute right-0 top-9 z-50 w-[170px] rounded-lg border border-gray-200 bg-white p-1 shadow-xl dark:border-gray-700 dark:bg-[#202020]">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMoreMenu(false);
                        addSubtask();
                      }}
                      className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Add subtask
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowMoreMenu(false);
                        setIsWatching((current) => !current);
                        showNotice(
                          isWatching
                            ? "Stopped watching task"
                            : "Now watching task",
                        );
                      }}
                      className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {isWatching ? "Stop watching" : "Watch task"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowMoreMenu(false);
                        copyTaskLink();
                      }}
                      className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Copy task link
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowMoreMenu(false);
                        showNotice("Task archived");
                      }}
                      className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Archive task
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-7">
            {/* LEFT */}
            <div>
              {/* TITLE */}
              <div className="mb-5">
                <h1 className="text-xl font-semibold">
                  Write API Documentation
                </h1>

                <p className="mt-1 max-w-[650px] text-xs leading-5 text-gray-500">
                  Create clear and comprehensive API documentation to guide
                  developers in using the inventory and sales metrics
                  effectively.
                </p>
              </div>

              {/* PROPERTIES */}
              <div className="mb-4 space-y-3 text-xs">
                <div className="flex items-center gap-5">
                  <span className="w-[55px] text-gray-500">Properties</span>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-800">
                      A
                    </span>

                    <span>Designer</span>

                    <span className="rounded-full bg-red-50 px-2 py-1 text-red-500 dark:bg-red-950">
                      📅 31 Jul
                    </span>
                  </div>
                </div>

                {/* LABELS */}
                <div className="flex items-center gap-5">
                  <span className="w-[55px] text-gray-500">Labels</span>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "Research",
                      "Design",
                      "Development",
                      "Testing",
                      "Deployment",
                    ].map((label) => (
                      <span
                        key={label}
                        className="rounded-full bg-gray-100 px-2 py-1 text-[10px] dark:bg-gray-800"
                      >
                        ◇ {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* RESOURCES */}
                <div className="flex items-center gap-5">
                  <span className="w-[55px] text-gray-500">Resources</span>

                  <button
                    type="button"
                    onClick={() => showNotice("Resource attachment")}
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                  >
                    ⛓ Add document or link...
                  </button>
                </div>
              </div>

              {/* SUBTASKS */}
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => setShowSubtasks((value) => !value)}
                  className="mb-2 flex items-center gap-2 text-xs font-medium"
                >
                  <span>{showSubtasks ? "⌄" : "›"}</span>
                  Subtasks
                </button>

                {showSubtasks && (
                  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    {/* HEADER */}
                    <div className="grid grid-cols-[1fr_80px_100px_110px_45px] bg-[#f7f7f7] dark:bg-[#1b1b1b]">
                      <div className="px-2 py-2 text-[10px] font-medium">
                        Task
                      </div>

                      <div className="px-2 py-2 text-[10px] font-medium">
                        Priority
                      </div>

                      <div className="px-2 py-2 text-[10px] font-medium">
                        Members
                      </div>

                      <div className="px-2 py-2 text-[10px] font-medium">
                        Due Date
                      </div>

                      <div className="px-2 py-2 text-[10px] font-medium">
                        Actions
                      </div>
                    </div>

                    {/* ROWS */}
                    {subtasks.map((task) => (
                      <div
                        key={task.id}
                        className="grid min-h-[38px] grid-cols-[1fr_80px_100px_110px_45px] items-center border-t border-gray-100 dark:border-gray-800"
                      >
                        <div className="px-2 text-[10px]">{task.title}</div>

                        <div
                          className={
                            task.priority === "High"
                              ? "px-2 text-[10px] text-red-500"
                              : task.priority === "Medium"
                                ? "px-2 text-[10px] text-orange-500"
                                : "px-2 text-[10px] text-gray-400"
                          }
                        >
                          ↗ {task.priority}
                        </div>

                        <div className="px-2">
                          {task.member ? (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[8px] dark:bg-gray-700">
                              {task.member}
                            </span>
                          ) : (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full border text-gray-400">
                              +
                            </span>
                          )}
                        </div>

                        <div className="px-2 text-[10px]">{task.date}</div>

                        <button
                          type="button"
                          onClick={() => deleteSubtask(task.id)}
                          title="Delete subtask"
                          className="text-center text-gray-400 hover:text-red-500"
                        >
                          •••
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addSubtask}
                      className="flex w-full items-center gap-2 border-t border-gray-100 px-3 py-2 text-[10px] text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                    >
                      + Add Subtasks
                    </button>
                  </div>
                )}
              </div>

              {/* COMMENTS */}
              <div className="mt-5">
                <h3 className="mb-3 text-xs font-medium">Subtasks</h3>

                {comments.map((item, index) => (
                  <div
                    key={index}
                    className="mb-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[8px] text-white">
                        A
                      </div>

                      <span className="text-[10px] font-medium">
                        Ankit Dutta
                      </span>

                      <span className="text-[9px] text-gray-400">
                        just now
                      </span>
                    </div>

                    <p className="text-xs">{item}</p>
                  </div>
                ))}

                {/* REPLY */}
                <div className="mb-2 flex items-center gap-2 rounded-lg border border-gray-200 px-3 dark:border-gray-700">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[8px] text-white">
                    A
                  </div>

                  <input
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        addComment();
                      }
                    }}
                    placeholder="Leave a reply..."
                    className="h-10 flex-1 bg-transparent text-xs outline-none"
                  />

                  <button
                    type="button"
                    onClick={addComment}
                    className="text-gray-500 hover:text-black dark:hover:text-white"
                  >
                    ➤
                  </button>
                </div>

                {/* COMMENT */}
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 dark:border-gray-700">
                  <input
                    placeholder="Add a comment..."
                    className="h-10 flex-1 bg-transparent text-xs outline-none"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        const value = event.currentTarget.value.trim();

                        if (!value) return;

                        setComments((current) => [...current, value]);

                        event.currentTarget.value = "";

                        showNotice("Comment added");
                      }
                    }}
                  />

                  <span className="text-gray-400">◉</span>

                  <button
                    type="button"
                    onClick={() => showNotice("Comment attachment")}
                    className="text-gray-400"
                  >
                    ➤
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <aside>
              {/* DETAILS */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between border-b border-gray-100 px-3 py-3 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowDetails((value) => !value)}
                    className="text-xs font-medium"
                  >
                    {showDetails ? "⌄" : "›"} Details
                  </button>

                  <div className="flex gap-2 text-gray-500">
                    <button
                      type="button"
                      onClick={addSubtask}
                      title="Add subtask"
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() => showNotice("Task settings")}
                      title="Settings"
                    >
                      ⚙
                    </button>
                  </div>
                </div>

                {showDetails && (
                  <div className="space-y-4 p-3 text-xs">
                    {/* STATUS */}
                    <div className="relative flex items-center justify-between">
                      <span className="text-gray-500">Status</span>

                      <button
                        type="button"
                        onClick={() =>
                          setShowStatus((value) => !value)
                        }
                        className={getStatusColor(status)}
                      >
                        🟠 {status}
                      </button>

                      {showStatus && (
                        <div className="absolute right-0 top-7 z-40 w-[150px] rounded-lg border border-gray-200 bg-white p-1 shadow-xl dark:border-gray-700 dark:bg-[#202020]">
                          <p className="px-3 py-2 text-[10px] font-medium text-gray-400">
                            Status
                          </p>

                          {statusOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setStatus(option);
                                setShowStatus(false);
                                showNotice(`Status changed to ${option}`);
                              }}
                              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-[10px] hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <span className={getStatusColor(option)}>
                                {option}
                              </span>

                              {status === option && <span>✓</span>}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* PRIORITY */}
                    <div className="relative flex items-center justify-between">
                      <span className="text-gray-500">Priority</span>

                      <button
                        type="button"
                        onClick={() =>
                          setShowPriority((value) => !value)
                        }
                        className={getPriorityColor(priority)}
                      >
                        ↗ {priority}
                      </button>

                      {showPriority && (
                        <div className="absolute right-0 top-7 z-30 w-[145px] rounded-lg border border-gray-200 bg-white p-1 shadow-xl dark:border-gray-700 dark:bg-[#202020]">
                          <p className="px-3 py-2 text-[10px] font-medium text-gray-400">
                            Priority
                          </p>

                          {priorityOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setPriority(option);
                                setShowPriority(false);
                                showNotice(
                                  `Priority changed to ${option}`,
                                );
                              }}
                              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-[10px] hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <span className={getPriorityColor(option)}>
                                {option}
                              </span>

                              {priority === option && <span>✓</span>}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* MEMBERS */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Members</span>

                      <div className="flex items-center gap-1">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[8px] text-white">
                          A
                        </span>

                        <button
                          type="button"
                          onClick={() => showNotice("Add member")}
                          className="flex h-6 w-6 items-center justify-center rounded-full border text-gray-400"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* DATES */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Dates</span>

                      <button
                        type="button"
                        onClick={() => showNotice("Date picker")}
                        className="text-xs"
                      >
                        📅
                      </button>
                    </div>

                    {/* LABELS */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Labels</span>

                      <button
                        type="button"
                        onClick={() => showNotice("Add label")}
                        className="text-xs"
                      >
                        + Add
                      </button>
                    </div>

                    {/* TEAMS */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Teams</span>

                      <button
                        type="button"
                        onClick={() => showNotice("Add team")}
                        className="text-xs"
                      >
                        +
                      </button>
                    </div>

                    {/* REPORTER */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Reporter</span>

                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[8px] dark:bg-gray-700">
                        N
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* UPDATES */}
              <div className="mt-3 rounded-xl border border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowUpdates((value) => !value)}
                  className="w-full border-b border-gray-100 px-3 py-3 text-left text-xs font-medium dark:border-gray-800"
                >
                  {showUpdates ? "⌄" : "›"} Updates
                </button>

                {showUpdates && (
                  <div className="space-y-4 p-3">
                    <div className="flex gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-[9px] text-red-500">
                        ↗
                      </div>

                      <div>
                        <p className="text-[10px] font-medium">You</p>

                        <p className="text-[9px] text-gray-500">
                          changed priority from No priority to Urgent
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[8px] text-white">
                        A
                      </div>

                      <div>
                        <p className="text-[10px] font-medium">You</p>

                        <p className="text-[9px] text-gray-500">
                          posted an update · Aug 2026
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}