export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen p-6 border-r">
      <h1 className="text-2xl font-bold mb-8">AbleSpace</h1>

      <nav className="flex flex-col gap-4">
        <a href="/dashboard">Dashboard</a>
        <a href="/board">Board</a>
        <a href="/tasks">Tasks</a>
        <a href="/users">Users</a>
        <a href="/settings">Settings</a>
      </nav>
    </aside>
  );
}