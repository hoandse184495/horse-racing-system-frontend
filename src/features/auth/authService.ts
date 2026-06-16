import { authApi } from "./authApi";
import type { LoginPayload, RegisterPayload, User } from "./authTypes";

const saveAuthData = (token: string, user: User) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem("user");

  if (!userJson) {
    return null;
  }

  return JSON.parse(userJson);
};

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const register = async (data: RegisterPayload) => {
  return await authApi.register(data);
};

const login = async (data: LoginPayload) => {
  const result = await authApi.login(data);

  saveAuthData(result.token, result.user);

  return result;
};

export const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getToken,
};