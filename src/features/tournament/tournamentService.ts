import { tournamentApi } from "./tournamentApi";
import type {
  CreateRacePayload,
  CreateRoundPayload,
  CreateTournamentPayload,
} from "./tournamentTypes";

const getAllTournaments = async () => {
  return await tournamentApi.getAll();
};

const getTournamentById = async (id: number) => {
  return await tournamentApi.getById(id);
};

const createTournament = async (data: CreateTournamentPayload) => {
  return await tournamentApi.create(data);
};

const getRoundsByTournamentId = async (tournamentId: number) => {
  return await tournamentApi.getRoundsByTournamentId(tournamentId);
};

const createRound = async (
  tournamentId: number,
  data: CreateRoundPayload
) => {
  return await tournamentApi.createRound(tournamentId, data);
};

const getRacesByRoundId = async (roundId: number) => {
  return await tournamentApi.getRacesByRoundId(roundId);
};

const createRace = async (roundId: number, data: CreateRacePayload) => {
  return await tournamentApi.createRace(roundId, data);
};

export const tournamentService = {
  getAllTournaments,
  getTournamentById,
  createTournament,
  getRoundsByTournamentId,
  createRound,
  getRacesByRoundId,
  createRace,
};