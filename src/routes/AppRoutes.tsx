import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import JockeyDashboard from "../pages/jockey/JockeyDashboard";
import RefereeDashboard from "../pages/referee/RefereeDashboard";
import SpectatorHome from "../pages/spectator/SpectatorHome";

import TournamentListPage from "../pages/admin/tournaments/TournamentListPage";
import CreateTournamentPage from "../pages/admin/tournaments/CreateTournamentPage";
import TournamentDetailPage from "../pages/admin/tournaments/TournamentDetailPage";

import AdminHorseListPage from "../pages/admin/horses/AdminHorseListPage";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tournaments"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <TournamentListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tournaments/create"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <CreateTournamentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tournaments/:id"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <TournamentDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/horses"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminHorseListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute allowedRoles={["HorseOwner"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jockey/dashboard"
        element={
          <ProtectedRoute allowedRoles={["Jockey"]}>
            <JockeyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/referee/dashboard"
        element={
          <ProtectedRoute allowedRoles={["RaceReferee"]}>
            <RefereeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/spectator/home"
        element={
          <ProtectedRoute allowedRoles={["Spectator"]}>
            <SpectatorHome />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}