```tsx
import Link from "next/link";
import {
  LayoutGrid,
  CheckSquare,
  FolderKanban,
  Users,
  Settings,
  User,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        Assessment Task
      </h1>

      <p className="text-xs text-gray-400 uppercase mb-4">
        Workspace
      </p>

      <nav className="space-y-2">
        <Link
          href="/tasks"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <CheckSquare size={18} />
          Tasks
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <LayoutGrid size={18} />
          Dashboard
        </Link>

        <Link
          href="/projects"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <FolderKanban size={18} />
          Projects
        </Link>

        <Link
          href="/users"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <Users size={18} />
          Users
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <User size={18} />
          Profile
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <Settings size={18} />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
```
