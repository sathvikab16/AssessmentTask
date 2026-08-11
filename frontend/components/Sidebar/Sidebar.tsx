import Link from "next/link";


export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r bg-white p-4">
      <h1 className="text-xl font-bold mb-8">Assessment Task</h1>


      <nav className="space-y-3">
        <Link href="/tasks" className="block p-2 rounded hover:bg-gray-100">
          Tasks
        </Link>


        <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100">
          Dashboard
        </Link>


        <Link href="/users" className="block p-2 rounded hover:bg-gray-100">
          Users
        </Link>


        <Link href="/settings" className="block p-2 rounded hover:bg-gray-100">
          Settings
        </Link>
      </nav>
    </aside>
  );
}