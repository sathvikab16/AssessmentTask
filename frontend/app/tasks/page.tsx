"use client";

import { useState } from "react";

type Priority = "No Priority" | "Urgent" | "High" | "Medium" | "Low";

type Member = {
  id: string;
  name: string;
  initials: string;
};

type Subtask = {
  id: number;
  title: string;
  priority: Priority;
  member: string;
  date: string;
};

const priorityOptions: Priority[] = [
  "No Priority",
  "Urgent",
  "High",
  "Medium",
  "Low",
];

const members: Member[] = [
  { id: "A", name: "Ankit Dutta", initials: "A" },
  { id: "CN", name: "CN", initials: "CN" },
];

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

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();

  const days: {
    day: number;
    currentMonth: boolean;
    date: Date;
  }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = previousMonthDays - i;

    days.push({
      day,
      currentMonth: false,
      date: new Date(year, month - 1, day),
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      currentMonth: true,
      date: new Date(year, month, day),
    });
  }

  let nextDay = 1;

  while (days.length < 42) {
    days.push({
      day: nextDay,
      currentMonth: false,
      date: new Date(year, month + 1, nextDay),
    });

    nextDay++;
  }

  return days;
}

export default function TaskDetailsPage() {
  const [priority, setPriority] = useState<Priority>("Urgent");

  const [showPriority, setShowPriority] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  const [selectedMember, setSelectedMember] = useState<Member>(members[0]);

  const [selectedDate, setSelectedDate] = useState(
    new Date(2026, 8, 12),
  );

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(2026, 8, 1),
  );

  const [showSubtasks, setShowSubtasks] = useState(true);

  const [subtasks, setSubtasks] =
    useState<Subtask[]>(initialSubtasks);

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState<string[]>(["dsds"]);

  const calendarDays = getCalendarDays(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
  );

  function closeAllPopups() {
    setShowPriority(false);
    setShowCalendar(false);
    setShowMembers(false);
  }

  function addComment() {
    if (!comment.trim()) return;

    setComments((current) => [
      ...current,
      comment.trim(),
    ]);

    setComment("");
  }

  function addSubtask() {
    const newId =
      subtasks.length > 0
        ? Math.max(...subtasks.map((item) => item.id)) + 1
        : 1;

    setSubtasks((current) => [
      ...current,
      {
        id: newId,
        title: `Subtask ${newId}`,
        priority: "Medium",
        member: "",
        date: "20 Sep 2026",
      },
    ]);
  }

  function previousMonth() {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() - 1,
        1,
      ),
    );
  }

  function nextMonth() {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + 1,
        1,
      ),
    );
  }

  function chooseDate(date: Date) {
    setSelectedDate(date);
    setCalendarMonth(
      new Date(date.getFullYear(), date.getMonth(), 1),
    );
    setShowCalendar(false);
  }

  function isSelectedDate(date: Date) {
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-[184px] shrink-0 border-r border-gray-200 bg-[#fafafa] md:block">
          <div className="flex h-[70px] items-center gap-2 px-7">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-bold text-white">
              D
            </div>

            <span className="text-xs font-semibold">
              Dexter
            </span>

            <span className="ml-auto">⌃</span>
          </div>

          <div className="px-7 pt-4">
            <div className="mb-2 flex items-center justify-between text-[11px] text-gray-600">
              <span>Workspace</span>
              <span>⌄</span>
            </div>

            <a
              href="/board"
              className="flex items-center gap-2 rounded-lg bg-[#eeeeee] px-2 py-2 text-xs font-medium"
            >
              <span>▦</span>
              Tasks
            </a>

            <a
              href="/projects"
              className="mt-1 flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-gray-700 hover:bg-gray-100"
            >
              <span>▱</span>
              Projects
            </a>
          </div>
        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">

          {/* TOP BAR */}
          <header className="flex h-[70px] items-center justify-between border-b border-gray-200 px-5">
            <button
              type="button"
              className="text-gray-500"
            >
              ◧
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-100"
              >
                ♧
              </button>

              <button
                type="button"
                className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-100"
              >
                ◉
              </button>

              <button
                type="button"
                className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-100"
              >
                ↗
              </button>

              <button
                type="button"
                className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-100"
              >
                •••
              </button>
            </div>
          </header>

          {/* CONTENT */}
          <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-7">

            {/* LEFT */}
            <div>

              <div className="mb-5">
                <h1 className="text-xl font-semibold">
                  Write API Documentation
                </h1>

                <p className="mt-1 max-w-[650px] text-xs leading-5 text-gray-500">
                  Create clear and comprehensive API documentation
                  to guide developers in using the inventory and sales
                  metrics effectively.
                </p>
              </div>

              {/* PROPERTIES */}
              <div className="mb-4 space-y-3 text-xs">

                <div className="flex items-center gap-5">
                  <span className="w-[55px] text-gray-500">
                    Properties
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-gray-100 px-2 py-1">
                      A
                    </span>

                    <span>Designer</span>

                    <span className="rounded-full bg-red-50 px-2 py-1 text-red-500">
                      📅 31 Jul
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <span className="w-[55px] text-gray-500">
                    Labels
                  </span>

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
                        className="rounded-full bg-gray-100 px-2 py-1 text-[10px]"
                      >
                        ◇ {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <span className="w-[55px] text-gray-500">
                    Resources
                  </span>

                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    ⛓ Add document or link...
                  </button>
                </div>
              </div>

              {/* SUBTASKS */}
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() =>
                    setShowSubtasks((value) => !value)
                  }
                  className="mb-2 flex items-center gap-2 text-xs font-medium"
                >
                  <span>
                    {showSubtasks ? "⌄" : "›"}
                  </span>
                  Subtasks
                </button>

                {showSubtasks && (
                  <div className="overflow-hidden rounded-lg border border-gray-200">

                    <div className="grid grid-cols-[1fr_80px_100px_110px_45px] bg-[#f7f7f7]">
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

                    {subtasks.map((task) => (
                      <div
                        key={task.id}
                        className="grid min-h-[38px] grid-cols-[1fr_80px_100px_110px_45px] items-center border-t border-gray-100"
                      >
                        <div className="px-2 text-[10px]">
                          {task.title}
                        </div>

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
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[8px]">
                              {task.member}
                            </span>
                          ) : (
                            <button
                              type="button"
                              className="flex h-6 w-6 items-center justify-center rounded-full border text-gray-400 hover:bg-gray-100"
                            >
                              +
                            </button>
                          )}
                        </div>

                        <div className="px-2 text-[10px]">
                          {task.date}
                        </div>

                        <button
                          type="button"
                          className="text-center text-gray-400 hover:text-gray-800"
                        >
                          •••
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addSubtask}
                      className="flex w-full items-center gap-2 border-t border-gray-100 px-3 py-2 text-[10px] text-gray-600 hover:bg-gray-50"
                    >
                      +
                      Add Subtasks
                    </button>
                  </div>
                )}
              </div>

              {/* COMMENTS */}
              <div className="mt-5">
                <h3 className="mb-3 text-xs font-medium">
                  Subtasks
                </h3>

                {comments.map((item, index) => (
                  <div
                    key={index}
                    className="mb-2 rounded-lg border border-gray-200 p-3"
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

                    <p className="text-xs">
                      {item}
                    </p>
                  </div>
                ))}

                <div className="mb-2 flex items-center gap-2 rounded-lg border border-gray-200 px-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[8px] text-white">
                    A
                  </div>

                  <input
                    value={comment}
                    onChange={(event) =>
                      setComment(event.target.value)
                    }
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
                    className="text-gray-500 hover:text-black"
                  >
                    ➤
                  </button>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3">
                  <input
                    placeholder="Add a comment..."
                    className="h-10 flex-1 bg-transparent text-xs outline-none"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        const value =
                          event.currentTarget.value.trim();

                        if (!value) return;

                        setComments((current) => [
                          ...current,
                          value,
                        ]);

                        event.currentTarget.value = "";
                      }
                    }}
                  />

                  <span className="text-gray-400">
                    ◉
                  </span>

                  <span className="text-gray-400">
                    ➤
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <aside>

              {/* DETAILS */}
              <div className="rounded-xl border border-gray-200">

                <div className="flex items-center justify-between border-b border-gray-100 px-3 py-3">
                  <button
                    type="button"
                    className="text-xs font-medium"
                  >
                    ⌄ Details
                  </button>

                  <div className="flex gap-2 text-gray-500">
                    <button type="button">+</button>
                    <button type="button">⚙</button>
                  </div>
                </div>

                <div className="space-y-4 p-3 text-xs">

                  {/* STATUS */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      Status
                    </span>

                    <button
                      type="button"
                      className="text-orange-500"
                    >
                      🟠 Backlog
                    </button>
                  </div>

                  {/* PRIORITY */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      Priority
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setShowPriority((value) => !value);
                        setShowCalendar(false);
                        setShowMembers(false);
                      }}
                      className="text-red-500"
                    >
                      ↗ {priority}
                    </button>
                  </div>

                  {/* MEMBERS */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      Members
                    </span>

                    <div className="flex items-center gap-1">

                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[8px] text-white">
                        {selectedMember.initials}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setShowMembers((value) => !value);
                          setShowPriority(false);
                          setShowCalendar(false);
                        }}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* DATES */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      Dates
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setShowCalendar((value) => !value);
                        setShowPriority(false);
                        setShowMembers(false);
                      }}
                      className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <span>📅</span>
                      <span>
                        {formatDate(selectedDate)}
                      </span>
                    </button>
                  </div>

                  {/* LABELS */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      Labels
                    </span>

                    <button
                      type="button"
                      className="text-xs hover:text-black"
                    >
                      + Add
                    </button>
                  </div>

                  {/* TEAMS */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      Teams
                    </span>

                    <button
                      type="button"
                      className="text-xs hover:text-black"
                    >
                      +
                    </button>
                  </div>

                  {/* REPORTER */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      Reporter
                    </span>

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[8px]">
                      N
                    </span>
                  </div>
                </div>
              </div>

              {/* PRIORITY POPUP */}
              {showPriority && (
                <div className="fixed right-[330px] top-[300px] z-[9999] w-[180px] rounded-xl border border-gray-200 bg-white p-2 shadow-2xl">

                  <div className="px-2 py-2 text-[10px] font-semibold text-gray-400">
                    Priority
                  </div>

                  {priorityOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setPriority(option);
                        setShowPriority(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[11px] hover:bg-gray-100"
                    >
                      <span
                        className={
                          option === "Urgent"
                            ? "text-red-500"
                            : option === "High"
                              ? "text-orange-500"
                              : option === "Medium"
                                ? "text-orange-400"
                                : "text-gray-500"
                        }
                      >
                        {option}
                      </span>

                      {priority === option && (
                        <span>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* MEMBER POPUP */}
              {showMembers && (
                <div className="fixed right-[330px] top-[340px] z-[9999] w-[220px] rounded-xl border border-gray-200 bg-white p-3 shadow-2xl">

                  <div className="mb-2 px-2 text-[11px] font-semibold text-gray-500">
                    Select Member
                  </div>

                  {members.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => {
                        setSelectedMember(member);
                        setShowMembers(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-100"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[9px] text-white">
                        {member.initials}
                      </span>

                      <span className="text-[11px]">
                        {member.name}
                      </span>

                      {selectedMember.id === member.id && (
                        <span className="ml-auto text-green-600">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* CALENDAR POPUP */}
              {showCalendar && (
                <div className="fixed right-[330px] top-[390px] z-[9999] w-[310px] rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">

                  {/* HEADER */}
                  <div className="mb-4 flex items-center justify-between">

                    <button
                      type="button"
                      onClick={previousMonth}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-100"
                    >
                      ‹
                    </button>

                    <span className="text-sm font-semibold">
                      {calendarMonth.toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={nextMonth}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-100"
                    >
                      ›
                    </button>
                  </div>

                  {/* WEEKDAYS */}
                  <div className="mb-2 grid grid-cols-7">
                    {[
                      "Su",
                      "Mo",
                      "Tu",
                      "We",
                      "Th",
                      "Fr",
                      "Sa",
                    ].map((day) => (
                      <div
                        key={day}
                        className="py-1 text-center text-[10px] font-medium text-gray-400"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* DAYS */}
                  <div className="grid grid-cols-7 gap-y-1">
                    {calendarDays.map((item, index) => (
                      <button
                        key={`${item.date.getTime()}-${index}`}
                        type="button"
                        onClick={() =>
                          chooseDate(item.date)
                        }
                        className={`mx-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[11px] ${
                          isSelectedDate(item.date)
                            ? "bg-black text-white"
                            : item.currentMonth
                              ? "text-gray-700 hover:bg-gray-100"
                              : "text-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {item.day}
                      </button>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">
                        Selected date
                      </span>

                      <span className="text-[11px] font-semibold">
                        {formatDate(selectedDate)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const today = new Date();
                        chooseDate(today);
                      }}
                      className="mt-3 w-full rounded-lg border border-gray-200 py-2 text-[10px] hover:bg-gray-100"
                    >
                      Today
                    </button>
                  </div>
                </div>
              )}

              {/* UPDATES */}
              <div className="mt-3 rounded-xl border border-gray-200">

                <div className="border-b border-gray-100 px-3 py-3 text-xs font-medium">
                  ⌄ Updates
                </div>

                <div className="space-y-4 p-3">

                  <div className="flex gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-[9px] text-red-500">
                      ↗
                    </div>

                    <div>
                      <p className="text-[10px] font-medium">
                        You
                      </p>

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
                      <p className="text-[10px] font-medium">
                        You
                      </p>

                      <p className="text-[9px] text-gray-500">
                        posted an update · Aug 2026
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}