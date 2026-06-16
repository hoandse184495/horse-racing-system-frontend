import axiosClient from "../../services/axiosClient";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "./authTypes";

export const authApi = {
  register: async (data: RegisterPayload) => {
    const response = await axiosClient.post<RegisterResponse>(
      "/auth/register",
      data
    );

    return response.data;
  },

  login: async (data: LoginPayload) => {
    const response = await axiosClient.post<LoginResponse>("/auth/login", data);

    return response.data;
  },

  getMe: async () => {
    const response = await axiosClient.get("/auth/me");

    return response.data;
  },
};