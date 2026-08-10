export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white p-6 rounded shadow max-w-md">
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Dark Mode
          </label>
          <input type="checkbox" />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Notifications
          </label>
          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
}