import Sidebar from "../../components/Sidebar/Sidebar";

export default function BoardPage() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Task Board
          </h1>

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            + Add Task
          </button>
        </div>

        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-3 border rounded mb-8"
        />

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-4 text-blue-600">
              Todo
            </h2>

            <div className="bg-gray-100 p-3 rounded mb-3">
              Design Login Page
            </div>

            <div className="bg-gray-100 p-3 rounded mb-3">
              Build Dashboard
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-4 text-yellow-600">
              In Progress
            </h2>

            <div className="bg-gray-100 p-3 rounded">
              Connect API
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-4 text-green-600">
              Done
            </h2>

            <div className="bg-gray-100 p-3 rounded">
              Setup Project
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}