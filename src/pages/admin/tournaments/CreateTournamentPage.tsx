import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../../../components/common/DashboardHeader";
import { tournamentService } from "../../../features/tournament/tournamentService";

function CreateTournamentPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tournamentName: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    prizePool: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await tournamentService.createTournament({
        tournamentName: formData.tournamentName,
        description: formData.description,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        prizePool: Number(formData.prizePool || 0),
      });

      alert("Create tournament successfully");
      navigate("/admin/tournaments");
    } catch (err: any) {
      setError(err.response?.data?.message || "Create tournament failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardHeader title="Create Tournament" />

      <div className="mx-auto max-w-3xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Tournament
          </h2>
          <p className="text-sm text-gray-500">
            Fill in tournament information
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="rounded bg-white p-6 shadow">
          <div className="mb-4">
            <label className="mb-1 block font-medium text-gray-700">
              Tournament Name
            </label>
            <input
              name="tournamentName"
              value={formData.tournamentName}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Spring Horse Racing Championship"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
              rows={4}
              placeholder="Tournament description"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-medium text-gray-700">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Ho Chi Minh City"
            />
          </div>

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium text-gray-700">
                Start Date
              </label>
              <input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium text-gray-700">
                End Date
              </label>
              <input
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-1 block font-medium text-gray-700">
              Prize Pool
            </label>
            <input
              name="prizePool"
              type="number"
              value={formData.prizePool}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
              placeholder="100000000"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Creating..." : "Create"}
            </button>

            <Link
              to="/admin/tournaments"
              className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTournamentPage;