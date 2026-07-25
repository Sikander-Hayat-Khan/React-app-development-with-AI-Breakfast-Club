"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconGoogle,
  IconApple,
  IconSparkles,
} from "./AuthIcons";

export default function LoginForm({ onSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage("Password must be at least 4 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(email, password);
      setIsLoading(false);

      if (res && res.success) {
        if (onSuccess) {
          onSuccess(res.user);
        }
      } else {
        setErrorMessage(res?.error || "Invalid email or password. Please check your credentials.");
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || "Login failed. Please try again.");
    }
  };

  const handleQuickGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const guestSession = {
        name: "Morning Foodie",
        email: "foodie@breakfastclub.com",
        role: "Guest Enthusiast",
        points: 100,
        memberSince: "2026",
        favoriteItem: "Berry French Toast 🥞",
        avatarColor: "bg-orange-500",
      };
      if (onSuccess) {
        onSuccess(guestSession);
      }
    }, 500);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.includes("@")) return;
    setForgotSuccess(true);
  };

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold font-pixelify-sans flex items-center gap-2 animate-shake">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-2">
            Email Address <span className="text-amber-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <IconMail className="w-5 h-5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3 bg-white border ocus:border-amber-400 rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700">
              Password <span className="text-amber-600">*</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setForgotModalOpen(true);
                setForgotSuccess(false);
                setForgotEmail(email);
              }}
              className="text-xs font-bold font-pixelify-sans text-amber-600 hover:text-amber-700 hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <IconLock className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3 bg-white border focus:border-amber-400 rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <IconEyeOff className="w-5 h-5" />
              ) : (
                <IconEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-mono text-gray-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-400 cursor-pointer"
            />
            <span>Remember me on this browser</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-400 hover:bg-amber-500 active:scale-[0.98] text-gray-900 font-bold font-pixelify-sans text-base py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <span>Log In to Breakfast Club</span>
              <span className="text-lg">➔</span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-gray-200 w-full" />
        <span className="bg-white px-3 text-xs font-mono text-gray-400 uppercase absolute">
          Or continue with
        </span>
      </div>

      {/* Social Logins */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleQuickGuestLogin}
          className="flex items-center justify-center gap-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 py-2.5 px-4 rounded-xl text-xs font-bold font-pixelify-sans text-gray-700 hover:border-gray-300 transition-all cursor-pointer"
        >
          <IconGoogle className="w-4 h-4" />
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={handleQuickGuestLogin}
          className="flex items-center justify-center gap-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 py-2.5 px-4 rounded-xl text-xs font-bold font-pixelify-sans text-gray-700 hover:border-gray-300 transition-all cursor-pointer"
        >
          <IconApple className="w-4 h-4" />
          <span>Apple</span>
        </button>
      </div>

      {/* Guest Sign in Option */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={handleQuickGuestLogin}
          className="inline-flex items-center gap-1.5 text-xs font-bold font-pixelify-sans text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
        >
          <IconSparkles className="w-4 h-4 text-amber-500" />
          <span>Quick 1-Click Guest Sign-In</span>
        </button>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-gray-200 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-xl font-bold font-pixelify-sans text-gray-900 flex items-center gap-2">
                🔑 Reset Password
              </h3>
              <button
                onClick={() => setForgotModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {forgotSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
                <div className="text-2xl">📬</div>
                <h4 className="font-bold text-emerald-900 font-pixelify-sans">
                  Reset Link Sent!
                </h4>
                <p className="text-xs text-emerald-700 font-mono">
                  We've dispatched password reset instructions to{" "}
                  <strong>{forgotEmail}</strong>.
                </p>
                <button
                  onClick={() => setForgotModalOpen(false)}
                  className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold font-pixelify-sans text-xs hover:bg-emerald-700"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-gray-600 font-mono">
                  Enter your account email address and we'll send you a link to reset your password.
                </p>
                <div>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white border rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                    required
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold font-pixelify-sans text-gray-600 hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold font-pixelify-sans text-xs rounded-xl shadow-sm"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
