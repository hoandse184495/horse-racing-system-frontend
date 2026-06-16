import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../../../components/common/DashboardHeader";
import { horseService } from "../../../features/horse/horseService";
import type {
  Horse,
  UpdateHorseStatusPayload,
} from "../../../features/horse/horseTypes";

function AdminHorseListPage() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const fetchHorses = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await horseService.getAllHorses();
      setHorses(result.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Cannot load horses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHorses();
  }, []);

  const handleUpdateStatus = async (
    horseId: number,
    status: UpdateHorseStatusPayload["status"]
  ) => {
    try {
      setUpdatingId(horseId);
      setError("");

      await horseService.updateHorseStatus(horseId, { status });
      await fetchHorses();
    } catch (err: any) {
      setError(err.response?.data?.message || "Update horse status failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusClass = (status: Horse["Status"]) => {
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    if (status === "Inactive") return "bg-gray-100 text-gray-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div>
      <DashboardHeader title="Horse Management" />

      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Horse Management
          </h2>
          <p className="text-sm text-gray-500">
            View and approve horse profiles
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <p>Loading horses...</p>
        ) : horses.length === 0 ? (
          <div className="rounded bg-white p-6 text-center shadow">
            <p className="text-gray-500">No horses found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded bg-white shadow">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-3 text-left">ID</th>
                  <th className="border px-4 py-3 text-left">Horse</th>
                  <th className="border px-4 py-3 text-left">Owner</th>
                  <th className="border px-4 py-3 text-left">Age</th>
                  <th className="border px-4 py-3 text-left">Breed</th>
                  <th className="border px-4 py-3 text-left">Gender</th>
                  <th className="border px-4 py-3 text-left">Health</th>
                  <th className="border px-4 py-3 text-left">Status</th>
                  <th className="border px-4 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {horses.map((horse) => (
                  <tr key={horse.HorseID} className="hover:bg-gray-50">
                    <td className="border px-4 py-3">{horse.HorseID}</td>

                    <td className="border px-4 py-3">
                      <p className="font-medium text-gray-800">
                        {horse.HorseName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {horse.Description || "No description"}
                      </p>
                    </td>

                    <td className="border px-4 py-3">
                      <p className="font-medium">
                        {horse.OwnerName || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {horse.OwnerEmail || ""}
                      </p>
                    </td>

                    <td className="border px-4 py-3">{horse.Age}</td>
                    <td className="border px-4 py-3">
                      {horse.Breed || "N/A"}
                    </td>
                    <td className="border px-4 py-3">{horse.Gender}</td>
                    <td className="border px-4 py-3">
                      {horse.HealthStatus || "N/A"}
                    </td>

                    <td className="border px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-sm ${getStatusClass(
                          horse.Status
                        )}`}
                      >
                        {horse.Status}
                      </span>
                    </td>

                    <td className="border px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          disabled={updatingId === horse.HorseID}
                          onClick={() =>
                            handleUpdateStatus(horse.HorseID, "Approved")
                          }
                          className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 disabled:bg-green-300"
                        >
                          Approve
                        </button>

                        <button
                          disabled={updatingId === horse.HorseID}
                          onClick={() =>
                            handleUpdateStatus(horse.HorseID, "Rejected")
                          }
                          className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:bg-red-300"
                        >
                          Reject
                        </button>

                        <button
                          disabled={updatingId === horse.HorseID}
                          onClick={() =>
                            handleUpdateStatus(horse.HorseID, "Inactive")
                          }
                          className="rounded bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700 disabled:bg-gray-300"
                        >
                          Inactive
                        </button>
                      </div>

                      {updatingId === horse.HorseID && (
                        <p className="mt-2 text-sm text-gray-500">
                          Updating...
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Link
          to="/admin/dashboard"
          className="mt-6 inline-block text-sm text-blue-600 hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

export default AdminHorseListPage;