import axiosClient from "../../services/axiosClient";
import type {
  HorseListResponse,
  HorseResponse,
  UpdateHorseStatusPayload,
} from "./horseTypes";

export const horseApi = {
  getAll: async () => {
    const response = await axiosClient.get<HorseListResponse>("/horses");
    return response.data;
  },

  updateStatus: async (horseId: number, data: UpdateHorseStatusPayload) => {
    const response = await axiosClient.patch<HorseResponse>(
      `/horses/${horseId}/status`,
      data
    );
    return response.data;
  },
};