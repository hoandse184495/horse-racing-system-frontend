import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../../../components/common/DashboardHeader";
import { tournamentService } from "../../../features/tournament/tournamentService";
import type { Tournament } from "../../../features/tournament/tournamentTypes";

function TournamentListPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await tournamentService.getAllTournaments();
      setTournaments(result.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Cannot load tournaments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div>
      <DashboardHeader title="Tournament Management" />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Tournament Management
            </h2>
            <p className="text-sm text-gray-500">
              Create and manage horse racing tournaments
            </p>
          </div>

          <Link
            to="/admin/tournaments/create"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Create Tournament
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <p>Loading tournaments...</p>
        ) : tournaments.length === 0 ? (
          <div className="rounded bg-white p-6 text-center shadow">
            <p className="text-gray-500">No tournaments found.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded bg-white shadow">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-3 text-left">ID</th>
                  <th className="border px-4 py-3 text-left">Name</th>
                  <th className="border px-4 py-3 text-left">Location</th>
                  <th className="border px-4 py-3 text-left">Start Date</th>
                  <th className="border px-4 py-3 text-left">End Date</th>
                  <th className="border px-4 py-3 text-left">Status</th>
                  <th className="border px-4 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {tournaments.map((item) => (
                  <tr key={item.TournamentID} className="hover:bg-gray-50">
                    <td className="border px-4 py-3">{item.TournamentID}</td>
                    <td className="border px-4 py-3 font-medium">
                      {item.TournamentName}
                    </td>
                    <td className="border px-4 py-3">
                      {item.Location || "N/A"}
                    </td>
                    <td className="border px-4 py-3">
                      {new Date(item.StartDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-3">
                      {new Date(item.EndDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-3">
                      <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-700">
                        {item.Status}
                      </span>
                    </td>
                    <td className="border px-4 py-3">
                      <Link
                        to={`/admin/tournaments/${item.TournamentID}`}
                        className="text-blue-600 hover:underline"
                      >
                        Detail
                      </Link>
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

export default TournamentListPage;