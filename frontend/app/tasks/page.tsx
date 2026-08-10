export default function TasksPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Task</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Priority</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border p-2">Design Login Page</td>
            <td className="border p-2">Todo</td>
            <td className="border p-2">High</td>
          </tr>

          <tr>
            <td className="border p-2">Build Dashboard</td>
            <td className="border p-2">Todo</td>
            <td className="border p-2">Medium</td>
          </tr>

          <tr>
            <td className="border p-2">Connect API</td>
            <td className="border p-2">In Progress</td>
            <td className="border p-2">High</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}