export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">
        AbleSpace
      </h2>

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