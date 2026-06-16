import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authService } from "../../features/auth/authService";
import type { UserRole } from "../../features/auth/authTypes";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [roleName, setRoleName] = useState<UserRole>("HorseOwner");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await authService.register({
        fullName,
        email,
        password,
        phone,
        address,
        roleName,
      });

      setSuccess("Register successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-4xl">
            🐎
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 mt-1">Join Horse Racing System</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-green-50 text-green-600 px-4 py-3 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full name
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Nguyen Van A"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@gmail.com"
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
              placeholder="Minimum 6 characters"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone
              </label>

              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="090..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Role
              </label>

              <select
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                value={roleName}
                onChange={(event) => setRoleName(event.target.value as UserRole)}
              >
                <option value="HorseOwner">Horse Owner</option>
                <option value="Jockey">Jockey</option>
                <option value="Spectator">Spectator</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Address
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Ho Chi Minh"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}