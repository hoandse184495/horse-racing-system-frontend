import { Link } from "react-router-dom";
import DashboardHeader from "../../components/common/DashboardHeader";

function AdminDashboard() {
  return (
    <div>
      <DashboardHeader title="Admin Dashboard" />

      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            to="/admin/tournaments"
            className="rounded bg-white p-6 shadow hover:bg-gray-50"
          >
            <h3 className="font-bold text-gray-800">Tournaments</h3>
            <p className="text-sm text-gray-500">
              Create and manage tournaments
            </p>
          </Link>

          <Link
            to="/admin/horses"
            className="rounded bg-white p-6 shadow hover:bg-gray-50"
          >
            <h3 className="font-bold text-gray-800">Horses</h3>
            <p className="text-sm text-gray-500">
              Approve or reject horse profiles
            </p>
          </Link>

          <div className="rounded bg-white p-6 shadow">
            <h3 className="font-bold text-gray-800">Race Results</h3>
            <p className="text-sm text-gray-500">
              Publish race results and rankings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;