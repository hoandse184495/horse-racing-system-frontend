import type { UserRole } from "../features/auth/authTypes";

export const getDashboardPathByRole = (role: UserRole) => {
  switch (role) {
    case "Admin":
      return "/admin/dashboard";

    case "HorseOwner":
      return "/owner/dashboard";

    case "Jockey":
      return "/jockey/dashboard";

    case "RaceReferee":
      return "/referee/dashboard";

    case "Spectator":
      return "/spectator/home";

    default:
      return "/login";
  }
};