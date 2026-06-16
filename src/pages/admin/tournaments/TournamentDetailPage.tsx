import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardHeader from "../../../components/common/DashboardHeader";
import { tournamentService } from "../../../features/tournament/tournamentService";
import type {
  Race,
  Round,
  Tournament,
} from "../../../features/tournament/tournamentTypes";

function TournamentDetailPage() {
  const { id } = useParams();
  const tournamentId = Number(id);

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [racesByRound, setRacesByRound] = useState<Record<number, Race[]>>({});
  const [openedRoundId, setOpenedRoundId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [roundLoading, setRoundLoading] = useState(false);
  const [raceLoading, setRaceLoading] = useState(false);

  const [error, setError] = useState("");
  const [roundError, setRoundError] = useState("");
  const [raceError, setRaceError] = useState("");

  const [roundForm, setRoundForm] = useState({
    roundName: "",
    roundOrder: "",
  });

  const [raceForm, setRaceForm] = useState({
    raceName: "",
    raceDate: "",
    distance: "",
    maxParticipants: "8",
  });

  const fetchTournament = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await tournamentService.getTournamentById(tournamentId);
      setTournament(result.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Cannot load tournament detail");
    } finally {
      setLoading(false);
    }
  };

  const fetchRounds = async () => {
    try {
      setRoundError("");

      const result = await tournamentService.getRoundsByTournamentId(
        tournamentId
      );
      setRounds(result.data);
    } catch (err: any) {
      setRoundError(err.response?.data?.message || "Cannot load rounds");
    }
  };

  const fetchRacesByRound = async (roundId: number) => {
    try {
      setRaceError("");

      const result = await tournamentService.getRacesByRoundId(roundId);

      setRacesByRound((prev) => ({
        ...prev,
        [roundId]: result.data,
      }));
    } catch (err: any) {
      setRaceError(err.response?.data?.message || "Cannot load races");
    }
  };

  useEffect(() => {
    if (tournamentId) {
      fetchTournament();
      fetchRounds();
    }
  }, [tournamentId]);

  const handleRoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoundForm({
      ...roundForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateRound = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setRoundLoading(true);
      setRoundError("");

      await tournamentService.createRound(tournamentId, {
        roundName: roundForm.roundName,
        roundOrder: Number(roundForm.roundOrder),
      });

      setRoundForm({
        roundName: "",
        roundOrder: "",
      });

      await fetchRounds();
    } catch (err: any) {
      setRoundError(err.response?.data?.message || "Create round failed");
    } finally {
      setRoundLoading(false);
    }
  };

  const handleToggleRaces = async (roundId: number) => {
    if (openedRoundId === roundId) {
      setOpenedRoundId(null);
      return;
    }

    setOpenedRoundId(roundId);
    setRaceForm({
      raceName: "",
      raceDate: "",
      distance: "",
      maxParticipants: "8",
    });

    await fetchRacesByRound(roundId);
  };

  const handleRaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaceForm({
      ...raceForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateRace = async (e: React.FormEvent, roundId: number) => {
    e.preventDefault();

    try {
      setRaceLoading(true);
      setRaceError("");

      await tournamentService.createRace(roundId, {
        raceName: raceForm.raceName,
        raceDate: raceForm.raceDate,
        distance: Number(raceForm.distance),
        maxParticipants: Number(raceForm.maxParticipants),
      });

      setRaceForm({
        raceName: "",
        raceDate: "",
        distance: "",
        maxParticipants: "8",
      });

      await fetchRacesByRound(roundId);
    } catch (err: any) {
      setRaceError(err.response?.data?.message || "Create race failed");
    } finally {
      setRaceLoading(false);
    }
  };

  return (
    <div>
      <DashboardHeader title="Tournament Detail" />

      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Tournament Detail
          </h2>
          <p className="text-sm text-gray-500">
            View tournament information and manage rounds/races
          </p>
        </div>

        {loading ? (
          <p>Loading tournament...</p>
        ) : error ? (
          <div className="rounded bg-red-100 px-4 py-2 text-red-600">
            {error}
          </div>
        ) : tournament ? (
          <>
            <div className="rounded bg-white p-6 shadow">
              <h3 className="mb-4 text-xl font-bold text-gray-800">
                {tournament.TournamentName}
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Tournament ID</p>
                  <p className="font-medium">{tournament.TournamentID}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">{tournament.Status}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{tournament.Location || "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Prize Pool</p>
                  <p className="font-medium">
                    {Number(tournament.PrizePool).toLocaleString()} VND
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">
                    {new Date(tournament.StartDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">
                    {new Date(tournament.EndDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium">
                  {tournament.Description || "No description"}
                </p>
              </div>

              <div className="mt-6">
                <Link
                  to="/admin/tournaments"
                  className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                >
                  Back
                </Link>
              </div>
            </div>

            <div className="mt-6 rounded bg-white p-6 shadow">
              <h3 className="mb-4 text-xl font-bold text-gray-800">
                Create Round
              </h3>

              {roundError && (
                <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-600">
                  {roundError}
                </div>
              )}

              <form
                onSubmit={handleCreateRound}
                className="grid gap-4 md:grid-cols-3"
              >
                <div className="md:col-span-2">
                  <label className="mb-1 block font-medium text-gray-700">
                    Round Name
                  </label>
                  <input
                    name="roundName"
                    value={roundForm.roundName}
                    onChange={handleRoundChange}
                    className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
                    placeholder="Vòng loại"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-medium text-gray-700">
                    Round Order
                  </label>
                  <input
                    name="roundOrder"
                    type="number"
                    value={roundForm.roundOrder}
                    onChange={handleRoundChange}
                    className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
                    placeholder="1"
                  />
                </div>

                <div className="md:col-span-3">
                  <button
                    type="submit"
                    disabled={roundLoading}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {roundLoading ? "Creating..." : "Create Round"}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 rounded bg-white p-6 shadow">
              <h3 className="mb-4 text-xl font-bold text-gray-800">Rounds</h3>

              {rounds.length === 0 ? (
                <p className="text-gray-500">No rounds found.</p>
              ) : (
                <div className="space-y-4">
                  {rounds.map((round) => (
                    <div
                      key={round.RoundID}
                      className="rounded border bg-gray-50 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-800">
                            {round.RoundName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Round ID: {round.RoundID} | Order:{" "}
                            {round.RoundOrder} | Status: {round.Status}
                          </p>
                        </div>

                        <button
                          onClick={() => handleToggleRaces(round.RoundID)}
                          className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                        >
                          {openedRoundId === round.RoundID
                            ? "Hide Races"
                            : "Manage Races"}
                        </button>
                      </div>

                      {openedRoundId === round.RoundID && (
                        <div className="mt-4 rounded bg-white p-4 shadow-sm">
                          <h4 className="mb-3 font-bold text-gray-800">
                            Create Race
                          </h4>

                          {raceError && (
                            <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-600">
                              {raceError}
                            </div>
                          )}

                          <form
                            onSubmit={(e) =>
                              handleCreateRace(e, round.RoundID)
                            }
                            className="grid gap-4 md:grid-cols-4"
                          >
                            <div className="md:col-span-2">
                              <label className="mb-1 block text-sm font-medium text-gray-700">
                                Race Name
                              </label>
                              <input
                                name="raceName"
                                value={raceForm.raceName}
                                onChange={handleRaceChange}
                                className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
                                placeholder="Race 1 - 1000m"
                              />
                            </div>

                            <div>
                              <label className="mb-1 block text-sm font-medium text-gray-700">
                                Race Date
                              </label>
                              <input
                                name="raceDate"
                                type="datetime-local"
                                value={raceForm.raceDate}
                                onChange={handleRaceChange}
                                className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="mb-1 block text-sm font-medium text-gray-700">
                                Distance
                              </label>
                              <input
                                name="distance"
                                type="number"
                                value={raceForm.distance}
                                onChange={handleRaceChange}
                                className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
                                placeholder="1000"
                              />
                            </div>

                            <div>
                              <label className="mb-1 block text-sm font-medium text-gray-700">
                                Max Participants
                              </label>
                              <input
                                name="maxParticipants"
                                type="number"
                                value={raceForm.maxParticipants}
                                onChange={handleRaceChange}
                                className="w-full rounded border px-3 py-2 outline-none focus:border-blue-500"
                                placeholder="8"
                              />
                            </div>

                            <div className="md:col-span-4">
                              <button
                                type="submit"
                                disabled={raceLoading}
                                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-green-300"
                              >
                                {raceLoading ? "Creating..." : "Create Race"}
                              </button>
                            </div>
                          </form>

                          <div className="mt-6">
                            <h4 className="mb-3 font-bold text-gray-800">
                              Races
                            </h4>

                            {!racesByRound[round.RoundID] ||
                            racesByRound[round.RoundID].length === 0 ? (
                              <p className="text-gray-500">
                                No races found in this round.
                              </p>
                            ) : (
                              <div className="overflow-hidden rounded border">
                                <table className="w-full border-collapse bg-white">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th className="border px-4 py-3 text-left">
                                        ID
                                      </th>
                                      <th className="border px-4 py-3 text-left">
                                        Race Name
                                      </th>
                                      <th className="border px-4 py-3 text-left">
                                        Date
                                      </th>
                                      <th className="border px-4 py-3 text-left">
                                        Distance
                                      </th>
                                      <th className="border px-4 py-3 text-left">
                                        Max
                                      </th>
                                      <th className="border px-4 py-3 text-left">
                                        Status
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {racesByRound[round.RoundID].map((race) => (
                                      <tr
                                        key={race.RaceID}
                                        className="hover:bg-gray-50"
                                      >
                                        <td className="border px-4 py-3">
                                          {race.RaceID}
                                        </td>
                                        <td className="border px-4 py-3 font-medium">
                                          {race.RaceName}
                                        </td>
                                        <td className="border px-4 py-3">
                                          {new Date(
                                            race.RaceDate
                                          ).toLocaleString()}
                                        </td>
                                        <td className="border px-4 py-3">
                                          {race.Distance} m
                                        </td>
                                        <td className="border px-4 py-3">
                                          {race.MaxParticipants}
                                        </td>
                                        <td className="border px-4 py-3">
                                          <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-700">
                                            {race.Status}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default TournamentDetailPage;