export default function TasksPage() {
  return (
    <div className="p-8 w-full bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Tasks</h1>

        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-lg bg-white">
            🔍
          </button>

          <button className="border px-4 py-2 rounded-lg bg-white">
            Fields
          </button>

          <button className="border px-4 py-2 rounded-lg bg-white">
            Filter
          </button>

          <button className="bg-black text-white px-5 py-2 rounded-lg">
            + Add Task
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Task</th>
              <th className="text-left p-4">Priority</th>
              <th className="text-left p-4">Members</th>
              <th className="text-left p-4">Due Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">Design Homepage</td>
              <td className="p-4 text-red-500 font-medium">High</td>
              <td className="p-4">👤</td>
              <td className="p-4">12 Sep 2026</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Develop Login Feature</td>
              <td className="p-4 text-gray-500">Low</td>
              <td className="p-4">👤</td>
              <td className="p-4">15 Sep 2026</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Test Payment Gateway</td>
              <td className="p-4 text-orange-500">Medium</td>
              <td className="p-4">👤</td>
              <td className="p-4">18 Sep 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}