"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://iwoihtzagjtmrsihfwfv.supabase.co/auth/v1/token?grant_type=password",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, // anon/public key here
          },
        }
      );

      console.log("Login success:", response.data);

      // You can also store session if needed:
      // localStorage.setItem("access_token", response.data.access_token);

      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.error_description ||
          err.response?.data?.msg ||
          "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#130a03] to-[#ff5e00]/10 text-white relative">
      {/* Orange glow */}
      <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/20 via-transparent to-transparent blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md px-8 py-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        {/* Logo */}
        <h1 className="text-2xl font-semibold mb-6 text-center">
          <span className="text-orange-500 font-bold">Fyuze</span> Login
        </h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <a
            href="/auth/register"
            className="text-orange-400 hover:text-orange-300 transition"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
