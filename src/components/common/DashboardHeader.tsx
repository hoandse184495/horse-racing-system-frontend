import { useNavigate } from "react-router-dom";
import { authService } from "../../features/auth/authService";

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

export default function DashboardHeader({
  title,
  description,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>

        {description && (
          <p className="mt-2 text-slate-600">{description}</p>
        )}

        {currentUser && (
          <p className="mt-2 text-sm text-slate-500">
            Logged in as{" "}
            <span className="font-semibold text-amber-600">
              {currentUser.fullName}
            </span>{" "}
            - {currentUser.role}
          </p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-3 transition"
      >
        Logout
      </button>
    </div>
  );
}