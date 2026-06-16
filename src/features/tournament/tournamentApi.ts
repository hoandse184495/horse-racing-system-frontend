import axiosClient from "../../services/axiosClient";
import type {
  CreateRacePayload,
  CreateRoundPayload,
  CreateTournamentPayload,
  RaceListResponse,
  RaceResponse,
  RoundListResponse,
  RoundResponse,
  TournamentListResponse,
  TournamentResponse,
} from "./tournamentTypes";

export const tournamentApi = {
  getAll: async () => {
    const response = await axiosClient.get<TournamentListResponse>(
      "/tournaments"
    );
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosClient.get<TournamentResponse>(
      `/tournaments/${id}`
    );
    return response.data;
  },

  create: async (data: CreateTournamentPayload) => {
    const response = await axiosClient.post<TournamentResponse>(
      "/tournaments",
      data
    );
    return response.data;
  },

  getRoundsByTournamentId: async (tournamentId: number) => {
    const response = await axiosClient.get<RoundListResponse>(
      `/tournaments/${tournamentId}/rounds`
    );
    return response.data;
  },

  createRound: async (tournamentId: number, data: CreateRoundPayload) => {
    const response = await axiosClient.post<RoundResponse>(
      `/tournaments/${tournamentId}/rounds`,
      data
    );
    return response.data;
  },

  getRacesByRoundId: async (roundId: number) => {
    const response = await axiosClient.get<RaceListResponse>(
      `/tournaments/rounds/${roundId}/races`
    );
    return response.data;
  },

  createRace: async (roundId: number, data: CreateRacePayload) => {
    const response = await axiosClient.post<RaceResponse>(
      `/tournaments/rounds/${roundId}/races`,
      data
    );
    return response.data;
  },
};