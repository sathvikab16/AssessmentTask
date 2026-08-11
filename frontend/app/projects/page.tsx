export default function ProjectsPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Projects</h1>

        <button className="bg-black text-white px-5 py-2 rounded-lg">
          + Add Project
        </button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Project</th>
              <th className="text-left p-4">Priority</th>
              <th className="text-left p-4">Lead</th>
              <th className="text-left p-4">Due Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">Website Redesign</td>
              <td className="p-4 text-red-500">High</td>
              <td className="p-4">John Doe</td>
              <td className="p-4">15 Sep 2026</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Mobile App Launch</td>
              <td className="p-4 text-orange-500">Medium</td>
              <td className="p-4">Jane Smith</td>
              <td className="p-4">20 Sep 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}