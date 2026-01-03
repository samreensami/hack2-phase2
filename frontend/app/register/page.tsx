"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      await authAPI.register(username, password);
      // Auto login after registration
      const loginResponse = await authAPI.login(username, password);
      localStorage.setItem("token", loginResponse.data.access_token);
      localStorage.setItem("username", username);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Username might already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-vanilla px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-olive">
          <h1 className="text-4xl font-bold text-olive mb-2 text-center">
            Create Account
          </h1>
          <p className="text-olive/70 text-center mb-8">
            Join us to start managing tasks
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-olive font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-olive/30 focus:border-orange focus:outline-none transition-colors"
                placeholder="Choose a username"
                required
                minLength={3}
              />
            </div>

            <div>
              <label className="block text-olive font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-olive/30 focus:border-orange focus:outline-none transition-colors"
                placeholder="Create a password"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-olive font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-olive/30 focus:border-orange focus:outline-none transition-colors"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-orange text-white font-bold text-lg rounded-lg shadow-lg hover:bg-orange/90 disabled:bg-orange/50 transition-all duration-200 hover:scale-105"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-olive/70 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-orange font-semibold hover:underline">
              Login here
            </Link>
          </p>

          <div className="mt-6 text-center">
            <Link href="/" className="text-olive hover:text-orange transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
