import { horseApi } from "./horseApi";
import type { UpdateHorseStatusPayload } from "./horseTypes";

const getAllHorses = async () => {
  return await horseApi.getAll();
};

const updateHorseStatus = async (
  horseId: number,
  data: UpdateHorseStatusPayload
) => {
  return await horseApi.updateStatus(horseId, data);
};

export const horseService = {
  getAllHorses,
  updateHorseStatus,
};