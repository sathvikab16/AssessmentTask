export default function BoardPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Tasks</h1>

        <button className="bg-black text-white px-5 py-2 rounded-lg">
          + Add Task
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border p-4">
          <h2 className="font-semibold mb-4">To Do</h2>

          <div className="bg-gray-50 border rounded-xl p-4 mb-4">
            <h3 className="font-medium">Write API Documentation</h3>
            <p className="text-sm text-gray-500 mt-2">Deployment</p>
          </div>

          <div className="bg-gray-50 border rounded-xl p-4">
            <h3 className="font-medium">Implement Search Function</h3>
            <p className="text-sm text-gray-500 mt-2">Development</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <h2 className="font-semibold mb-4">Doing</h2>

          <div className="bg-gray-50 border rounded-xl p-4">
            <h3 className="font-medium">Code Review Completed</h3>
            <p className="text-sm text-gray-500 mt-2">Testing</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <h2 className="font-semibold mb-4">Completed</h2>

          <div className="bg-gray-50 border rounded-xl p-4">
            <h3 className="font-medium">Feature Testing Passed</h3>
            <p className="text-sm text-gray-500 mt-2">QA Team</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <h2 className="font-semibold mb-4">On Hold</h2>

          <div className="bg-gray-50 border rounded-xl p-4">
            <h3 className="font-medium">UI Review</h3>
            <p className="text-sm text-gray-500 mt-2">Design Team</p>
          </div>
        </div>
      </div>
    </div>
  );
}