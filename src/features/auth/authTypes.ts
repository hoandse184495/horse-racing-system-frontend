export type UserRole =
  | "Admin"
  | "HorseOwner"
  | "Jockey"
  | "RaceReferee"
  | "Spectator";

export interface User {
  userId: number;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  role: UserRole;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  roleName: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
}