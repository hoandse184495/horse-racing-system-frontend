import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authService } from "../../features/auth/authService";
import { getDashboardPathByRole } from "../../utils/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("owner@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const result = await authService.login({
        email,
        password,
      });

      const dashboardPath = getDashboardPathByRole(result.user.role);

      navigate(dashboardPath);
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-4xl">
            🐎
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-800">
            Horse Racing System
          </h1>

          <p className="text-slate-500 mt-1">Login to your account</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-amber-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}