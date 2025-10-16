import React from "react";

export default function LoginPage() {
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
        <form className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 font-medium transition cursor-pointer"
          >
            Login
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
