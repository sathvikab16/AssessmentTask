"use client";

import { useEffect, useRef, useState } from "react";

type Priority =
  | "No Priority"
  | "Urgent"
  | "High"
  | "Medium"
  | "Low";

type Status =
  | "To Do"
  | "Doing"
  | "Completed"
  | "On Hold";

type Task = {
  id: number;
  title: string;
  priority: Priority;
  member: string;
  dueDate: string;
  status: Status;
  team: string;
  label: string;
  reporter: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design Homepage",
    priority: "High",
    member: "A",
    dueDate: "12 Sep 2026",
    status: "To Do",
    team: "Design",
    label: "Design",
    reporter: "N",
  },
  {
    id: 2,
    title: "Develop Login Feature",
    priority: "Low",
    member: "CN",
    dueDate: "15 Sep 2026",
    status: "Doing",
    team: "Development",
    label: "Development",
    reporter: "N",
  },
  {
    id: 3,
    title: "Test Payment Gateway",
    priority: "Medium",
    member: "",
    dueDate: "18 Sep 2026",
    status: "Completed",
    team: "Development",
    label: "Testing",
    reporter: "N",
  },
];

const statuses: Status[] = [
  "To Do",
  "Doing",
  "Completed",
  "On Hold",
];

const priorities: Priority[] = [
  "No Priority",
  "Urgent",
  "High",
  "Medium",
  "Low",
];

const members = ["A", "CN"];

const teams = [
  "Design",
  "Development",
];

const labels = [
  "Research",
  "Design",
  "Development",
  "Testing",
  "Deployment",
];

const reporters = ["N"];

function priorityClass(priority: Priority) {
  switch (priority) {
    case "Urgent":
      return "text-red-500";

    case "High":
      return "text-red-400";

    case "Medium":
      return "text-orange-400";

    case "Low":
      return "text-gray-400";

    default:
      return "text-gray-400";
  }
}

function priorityIcon(priority: Priority) {
  if (priority === "No Priority") {
    return "·";
  }

  return "↗";
}

export default function TasksPage() {
  const [tasks, setTasks] =
    useState<Task[]>(initialTasks);

  const [search, setSearch] =
    useState("");

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [showFields, setShowFields] =
    useState(false);

  const [showFilter, setShowFilter] =
    useState(false);

  const [activeFilter, setActiveFilter] =
    useState<string | null>(null);

  const [selectedStatus, setSelectedStatus] =
    useState<Status | null>(null);

  const [selectedPriority, setSelectedPriority] =
    useState<Priority | null>(null);

  const [selectedMember, setSelectedMember] =
    useState<string | null>(null);

  const [selectedDueDate, setSelectedDueDate] =
    useState<string | null>(null);

  const [selectedTeam, setSelectedTeam] =
    useState<string | null>(null);

  const [selectedLabel, setSelectedLabel] =
    useState<string | null>(null);

  const [selectedReporter, setSelectedReporter] =
    useState<string | null>(null);

  const [showPriorityColumn, setShowPriorityColumn] =
    useState(true);

  const [showMembersColumn, setShowMembersColumn] =
    useState(true);

  const [showDueDateColumn, setShowDueDateColumn] =
    useState(true);

  const [showStatusColumn, setShowStatusColumn] =
    useState(false);

  const [showReporterColumn, setShowReporterColumn] =
    useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(
          event.target as Node
        )
      ) {
        setShowFilter(false);
        setActiveFilter(null);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  function addTask(status: Status) {
    const newTask: Task = {
      id: Date.now(),
      title: `New Task ${tasks.length + 1}`,
      priority: "Medium",
      member: "",
      dueDate: "20 Sep 2026",
      status,
      team: "Design",
      label: "Research",
      reporter: "N",
    };

    setTasks((current) => [
      ...current,
      newTask,
    ]);
  }

  function toggleFilterMenu() {
    setShowFilter((value) => !value);

    if (showFilter) {
      setActiveFilter(null);
    }
  }

  function chooseFilter(name: string) {
    setActiveFilter((current) =>
      current === name ? null : name
    );
  }

  function clearAllFilters() {
    setSelectedStatus(null);
    setSelectedPriority(null);
    setSelectedMember(null);
    setSelectedDueDate(null);
    setSelectedTeam(null);
    setSelectedLabel(null);
    setSelectedReporter(null);
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      !selectedStatus ||
      task.status === selectedStatus;

    const matchesPriority =
      !selectedPriority ||
      task.priority === selectedPriority;

    const matchesMember =
      !selectedMember ||
      task.member === selectedMember;

    const matchesDueDate =
      !selectedDueDate ||
      task.dueDate === selectedDueDate;

    const matchesTeam =
      !selectedTeam ||
      task.team === selectedTeam;

    const matchesLabel =
      !selectedLabel ||
      task.label === selectedLabel;

    const matchesReporter =
      !selectedReporter ||
      task.reporter === selectedReporter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesMember &&
      matchesDueDate &&
      matchesTeam &&
      matchesLabel &&
      matchesReporter
    );
  });

  const hasFilters =
    selectedStatus ||
    selectedPriority ||
    selectedMember ||
    selectedDueDate ||
    selectedTeam ||
    selectedLabel ||
    selectedReporter;

  const gridColumns = [
    "1fr",
    showPriorityColumn ? "90px" : "",
    showMembersColumn ? "90px" : "",
    showDueDateColumn ? "110px" : "",
    showStatusColumn ? "90px" : "",
    showReporterColumn ? "90px" : "",
    "45px",
  ]
    .filter(Boolean)
    .join(" ");

  function renderFilterSubmenu() {
    if (!activeFilter) {
      return null;
    }

    if (activeFilter === "Priority") {
      return (
        <div className="absolute left-[124px] top-[38px] z-[300] w-[120px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl">
          <p className="mb-1 px-2 py-1 text-[9px] text-gray-400">
            Priority
          </p>

          {priorities.map((priority) => (
            <button
              key={priority}
              type="button"
              onClick={() => {
                setSelectedPriority(
                  selectedPriority === priority
                    ? null
                    : priority
                );
              }}
              className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100 ${priorityClass(
                priority
              )}`}
            >
              <span>
                {priorityIcon(priority)}{" "}
                {priority}
              </span>

              {selectedPriority === priority && (
                <span className="text-black">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      );
    }

    if (activeFilter === "Status") {
      return (
        <div className="absolute left-[124px] top-[0px] z-[300] w-[120px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl">
          <p className="mb-1 px-2 py-1 text-[9px] text-gray-400">
            Status
          </p>

          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() =>
                setSelectedStatus(
                  selectedStatus === status
                    ? null
                    : status
                )
              }
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100"
            >
              <span>{status}</span>

              {selectedStatus === status && (
                <span>✓</span>
              )}
            </button>
          ))}
        </div>
      );
    }

    if (activeFilter === "Members") {
      return (
        <div className="absolute left-[124px] top-[38px] z-[300] w-[120px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl">
          <p className="mb-1 px-2 py-1 text-[9px] text-gray-400">
            Members
          </p>

          {members.map((member) => (
            <button
              key={member}
              type="button"
              onClick={() =>
                setSelectedMember(
                  selectedMember === member
                    ? null
                    : member
                )
              }
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100"
            >
              <span>
                {member === "A"
                  ? "Ankit Dutta"
                  : "CN"}
              </span>

              {selectedMember === member && (
                <span>✓</span>
              )}
            </button>
          ))}
        </div>
      );
    }

    if (activeFilter === "Due Date") {
      return (
        <div className="absolute left-[124px] top-[76px] z-[300] w-[150px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl">
          <p className="mb-1 px-2 py-1 text-[9px] text-gray-400">
            Due Date
          </p>

          {[
            "12 Sep 2026",
            "15 Sep 2026",
            "18 Sep 2026",
            "20 Sep 2026",
          ].map((date) => (
            <button
              key={date}
              type="button"
              onClick={() =>
                setSelectedDueDate(
                  selectedDueDate === date
                    ? null
                    : date
                )
              }
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100"
            >
              <span>{date}</span>

              {selectedDueDate === date && (
                <span>✓</span>
              )}
            </button>
          ))}
        </div>
      );
    }

    if (activeFilter === "Teams") {
      return (
        <div className="absolute left-[124px] top-[114px] z-[300] w-[130px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl">
          <p className="mb-1 px-2 py-1 text-[9px] text-gray-400">
            Teams
          </p>

          {teams.map((team) => (
            <button
              key={team}
              type="button"
              onClick={() =>
                setSelectedTeam(
                  selectedTeam === team
                    ? null
                    : team
                )
              }
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100"
            >
              <span>{team}</span>

              {selectedTeam === team && (
                <span>✓</span>
              )}
            </button>
          ))}
        </div>
      );
    }

    if (activeFilter === "Labels") {
      return (
        <div className="absolute left-[124px] top-[152px] z-[300] w-[140px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl">
          <p className="mb-1 px-2 py-1 text-[9px] text-gray-400">
            Labels
          </p>

          {labels.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() =>
                setSelectedLabel(
                  selectedLabel === label
                    ? null
                    : label
                )
              }
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100"
            >
              <span>{label}</span>

              {selectedLabel === label && (
                <span>✓</span>
              )}
            </button>
          ))}
        </div>
      );
    }

    if (activeFilter === "Reporter") {
      return (
        <div className="absolute left-[124px] top-[190px] z-[300] w-[120px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl">
          <p className="mb-1 px-2 py-1 text-[9px] text-gray-400">
            Reporter
          </p>

          {reporters.map((reporter) => (
            <button
              key={reporter}
              type="button"
              onClick={() =>
                setSelectedReporter(
                  selectedReporter === reporter
                    ? null
                    : reporter
                )
              }
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100"
            >
              <span>{reporter}</span>

              {selectedReporter === reporter && (
                <span>✓</span>
              )}
            </button>
          ))}
        </div>
      );
    }

    return null;
  }

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-[170px] shrink-0 border-r border-gray-200 bg-[#fafafa] md:block">
          <div className="flex h-[58px] items-center gap-2 px-5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[10px] font-bold text-white">
              D
            </div>

            <span className="text-[11px] font-semibold">
              Dexter
            </span>

            <span className="ml-auto">
              ⌃
            </span>
          </div>

          <div className="px-5 pt-3">
            <div className="mb-2 flex items-center justify-between text-[10px] text-gray-600">
              <span>Workspace</span>
              <span>⌄</span>
            </div>

            <a
              href="/tasks"
              className="flex items-center gap-2 rounded-md bg-[#eeeeee] px-2 py-2 text-[11px] font-medium"
            >
              <span>▦</span>
              Tasks
            </a>

            <a
              href="/projects"
              className="mt-1 flex items-center gap-2 rounded-md px-2 py-2 text-[11px] text-gray-700 hover:bg-gray-100"
            >
              <span>▱</span>
              Projects
            </a>
          </div>
        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">

          <header className="flex h-[58px] items-center border-b border-gray-200 px-5">
            <button
              type="button"
              className="text-gray-500 hover:text-black"
            >
              ◧
            </button>
          </header>

          <div className="p-5">

            {/* HEADER */}
            <div className="mb-3 flex items-center justify-between">

              <h1 className="text-sm font-semibold">
                Tasks
              </h1>

              <div className="flex items-center gap-2">

                {/* SEARCH */}
                {searchOpen && (
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search..."
                    className="h-7 w-[150px] rounded-md border border-gray-200 px-2 text-[10px] outline-none"
                  />
                )}

                <button
                  type="button"
                  onClick={() =>
                    setSearchOpen(
                      (value) => !value
                    )
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100"
                >
                  ⌕
                </button>

                {/* FIELDS */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setShowFields(
                        (value) => !value
                      )
                    }
                    className="flex h-7 items-center gap-1 rounded-md border border-gray-200 px-2 text-[10px] hover:bg-gray-100"
                  >
                    ▥ Fields
                  </button>

                  {showFields && (
                    <div className="absolute right-0 top-8 z-[200] w-[160px] rounded-lg border border-gray-200 bg-white p-2 shadow-xl">

                      <p className="px-2 py-1 text-[9px] text-gray-400">
                        Fields
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setShowPriorityColumn(
                            (value) => !value
                          )
                        }
                        className="flex w-full justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100"
                      >
                        Priority
                        {showPriorityColumn
                          ? "✓"
                          : ""}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowMembersColumn(
                            (value) => !value
                          )
                        }
                        className="flex w-full justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100"
                      >
                        Members
                        {showMembersColumn
                          ? "✓"
                          : ""}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowDueDateColumn(
                            (value) => !value
                          )
                        }
                        className="flex w-full justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100"
                      >
                        Due Date
                        {showDueDateColumn
                          ? "✓"
                          : ""}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowStatusColumn(
                            (value) => !value
                          )
                        }
                        className="flex w-full justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100"
                      >
                        Status
                        {showStatusColumn
                          ? "✓"
                          : ""}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowReporterColumn(
                            (value) => !value
                          )
                        }
                        className="flex w-full justify-between rounded-md px-2 py-2 text-left text-[10px] hover:bg-gray-100"
                      >
                        Reporter
                        {showReporterColumn
                          ? "✓"
                          : ""}
                      </button>
                    </div>
                  )}
                </div>

                {/* FILTER */}
                <div
                  ref={filterRef}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={toggleFilterMenu}
                    className={`flex h-7 w-7 items-center justify-center rounded-md border hover:bg-gray-100 ${
                      showFilter
                        ? "bg-gray-100 border-gray-400"
                        : "border-gray-200"
                    }`}
                  >
                    ▽
                  </button>

                  {showFilter && (
                    <>
                      <div className="absolute right-0 top-8 z-[250] w-[124px] rounded-lg border border-gray-200 bg-white p-1 shadow-xl">

                        {[
                          "Status",
                          "Priority",
                          "Members",
                          "Due Date",
                          "Teams",
                          "Labels",
                          "Reporter",
                        ].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() =>
                              chooseFilter(item)
                            }
                            className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] ${
                              activeFilter === item
                                ? "bg-gray-100"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <span className="flex items-center gap-2">

                              {item === "Status" && "○"}
                              {item === "Priority" && "▥"}
                              {item === "Members" && "♧"}
                              {item === "Due Date" && "♧"}
                              {item === "Teams" && "♧"}
                              {item === "Labels" && "◇"}
                              {item === "Reporter" && "♙"}

                              {item}
                            </span>

                            <span>
                              ›
                            </span>
                          </button>
                        ))}

                        {hasFilters && (
                          <button
                            type="button"
                            onClick={clearAllFilters}
                            className="mt-1 w-full border-t border-gray-100 px-2 py-2 text-left text-[10px] text-red-500 hover:bg-gray-50"
                          >
                            Clear filters
                          </button>
                        )}
                      </div>

                      {renderFilterSubmenu()}
                    </>
                  )}
                </div>

                {/* ADD TASK */}
                <button
                  type="button"
                  onClick={() =>
                    addTask("To Do")
                  }
                  className="h-7 rounded-md bg-black px-3 text-[10px] text-white hover:bg-gray-800"
                >
                  + Add Task
                </button>
              </div>
            </div>

            {/* ACTIVE FILTERS */}
            {hasFilters && (
              <div className="mb-3 flex flex-wrap items-center gap-2">

                <span className="text-[10px] text-gray-400">
                  Filters
                </span>

                {selectedStatus && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedStatus(null)
                    }
                    className="rounded-full bg-gray-100 px-2 py-1 text-[9px]"
                  >
                    Status: {selectedStatus} ×
                  </button>
                )}

                {selectedPriority && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPriority(null)
                    }
                    className="rounded-full bg-gray-100 px-2 py-1 text-[9px]"
                  >
                    Priority: {selectedPriority} ×
                  </button>
                )}

                {selectedMember && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedMember(null)
                    }
                    className="rounded-full bg-gray-100 px-2 py-1 text-[9px]"
                  >
                    Member: {selectedMember} ×
                  </button>
                )}

                {selectedDueDate && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedDueDate(null)
                    }
                    className="rounded-full bg-gray-100 px-2 py-1 text-[9px]"
                  >
                    Date: {selectedDueDate} ×
                  </button>
                )}

                {selectedTeam && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedTeam(null)
                    }
                    className="rounded-full bg-gray-100 px-2 py-1 text-[9px]"
                  >
                    Team: {selectedTeam} ×
                  </button>
                )}

                {selectedLabel && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedLabel(null)
                    }
                    className="rounded-full bg-gray-100 px-2 py-1 text-[9px]"
                  >
                    Label: {selectedLabel} ×
                  </button>
                )}

                {selectedReporter && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedReporter(null)
                    }
                    className="rounded-full bg-gray-100 px-2 py-1 text-[9px]"
                  >
                    Reporter: {selectedReporter} ×
                  </button>
                )}
              </div>
            )}

            {/* TASK GROUPS */}
            <div className="space-y-4">

              {statuses.map((status) => {
                const statusTasks =
                  filteredTasks.filter(
                    (task) =>
                      task.status === status
                  );

                return (
                  <div key={status}>

                    <div className="mb-1 flex items-center gap-2 text-[10px] font-medium">
                      <span>⌄</span>
                      {status}
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200">

                      {/* TABLE HEADER */}
                      <div
                        style={{
                          gridTemplateColumns:
                            gridColumns,
                        }}
                        className="grid bg-[#f7f7f7]"
                      >
                        <div className="px-2 py-2 text-[9px] font-medium">
                          Task
                        </div>

                        {showPriorityColumn && (
                          <div className="px-2 py-2 text-[9px] font-medium">
                            Priority
                          </div>
                        )}

                        {showMembersColumn && (
                          <div className="px-2 py-2 text-[9px] font-medium">
                            Members
                          </div>
                        )}

                        {showDueDateColumn && (
                          <div className="px-2 py-2 text-[9px] font-medium">
                            Due Date
                          </div>
                        )}

                        {showStatusColumn && (
                          <div className="px-2 py-2 text-[9px] font-medium">
                            Status
                          </div>
                        )}

                        {showReporterColumn && (
                          <div className="px-2 py-2 text-[9px] font-medium">
                            Reporter
                          </div>
                        )}

                        <div className="px-2 py-2 text-[9px] font-medium">
                          Actions
                        </div>
                      </div>

                      {/* TASK ROWS */}
                      {statusTasks.map((task) => (
                        <div
                          key={task.id}
                          style={{
                            gridTemplateColumns:
                              gridColumns,
                          }}
                          className="grid min-h-[38px] items-center border-t border-gray-100"
                        >
                          <div className="px-2 text-[10px]">
                            {task.title}
                          </div>

                          {showPriorityColumn && (
                            <div
                              className={`px-2 text-[10px] ${priorityClass(
                                task.priority
                              )}`}
                            >
                              {priorityIcon(
                                task.priority
                              )}{" "}
                              {task.priority}
                            </div>
                          )}

                          {showMembersColumn && (
                            <div className="px-2">
                              {task.member ? (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[8px]">
                                  {task.member}
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedMember(
                                      "A"
                                    )
                                  }
                                  className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              )}
                            </div>
                          )}

                          {showDueDateColumn && (
                            <div className="px-2 text-[10px]">
                              {task.dueDate}
                            </div>
                          )}

                          {showStatusColumn && (
                            <div className="px-2 text-[10px]">
                              {task.status}
                            </div>
                          )}

                          {showReporterColumn && (
                            <div className="px-2 text-[10px]">
                              {task.reporter}
                            </div>
                          )}

                          <button
                            type="button"
                            className="text-gray-400 hover:text-black"
                          >
                            •••
                          </button>
                        </div>
                      ))}

                      {/* ADD TASK */}
                      <button
                        type="button"
                        onClick={() =>
                          addTask(status)
                        }
                        className="flex w-full items-center gap-2 border-t border-gray-100 px-3 py-2 text-[10px] text-gray-600 hover:bg-gray-50"
                      >
                        +
                        Add Task
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}