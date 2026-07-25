"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  IconUser,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconPhone,
  IconCheck,
} from "./AuthIcons";

const BREAKFAST_PREFERENCES = [
  { id: "pancakes", label: "Pancakes & Waffles 🥞" },
  { id: "benedict", label: "Eggs Benedict 🍳" },
  { id: "coffee", label: "Artisanal Coffee ☕" },
  { id: "vegan", label: "Vegan Delights 🥗" },
];

export default function SignupForm({ onSuccess }) {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPref, setSelectedPref] = useState("pancakes");
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Calculate password strength
  const getPasswordStrength = () => {
    if (!password) return { label: "", score: 0, color: "bg-gray-200" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: "Weak ⚠️", score: 1, color: "bg-red-500" };
    if (score === 2 || score === 3)
      return { label: "Medium 👍", score: 2, color: "bg-amber-500" };
    return { label: "Strong! 💪", score: 3, color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength();
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (!agreedTerms) {
      setErrorMessage("You must agree to the Terms of Service to join.");
      return;
    }

    setIsLoading(true);

    try {
      const prefItem =
        BREAKFAST_PREFERENCES.find((p) => p.id === selectedPref)?.label ||
        "Special Brunch 🍳";

      const res = await signup({
        fullName,
        email,
        password,
        phone,
        favoriteItem: prefItem,
      });

      setIsLoading(false);

      if (res && res.success) {
        if (onSuccess) {
          onSuccess(res.user);
        }
      } else {
        setErrorMessage(res?.error || "Failed to create account in Firebase. Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-5">
      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold font-pixelify-sans flex items-center gap-2 animate-shake">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-2">
          Full Name <span className="text-amber-600">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <IconUser className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Alex Morgan"
            className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
            required
          />
        </div>
      </div>

      {/* Email */}
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
            className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
            required
          />
        </div>
      </div>

      {/* Phone Number (Optional) */}
      <div>
        <label className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-2">
          Phone Number <span className="text-gray-400 font-normal lowercase">(optional for SMS table alerts)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <IconPhone className="w-5 h-5" />
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
          />
        </div>
      </div>

      {/* Password & Strength Meter */}
      <div>
        <label className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-2">
          Password <span className="text-amber-600">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <IconLock className="w-5 h-5" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full pl-11 pr-11 py-3 bg-white border rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showPassword ? (
              <IconEyeOff className="w-5 h-5" />
            ) : (
              <IconEye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Strength Indicator */}
        {password && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-pixelify-sans font-bold text-gray-600">
              <span>Password Strength:</span>
              <span className="capitalize">{strength.label}</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex gap-1">
              <div
                className={`h-full flex-1 transition-all duration-300 ${
                  strength.score >= 1 ? strength.color : "bg-gray-200"
                }`}
              />
              <div
                className={`h-full flex-1 transition-all duration-300 ${
                  strength.score >= 2 ? strength.color : "bg-gray-200"
                }`}
              />
              <div
                className={`h-full flex-1 transition-all duration-300 ${
                  strength.score >= 3 ? strength.color : "bg-gray-200"
                }`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-2">
          Confirm Password <span className="text-amber-600">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <IconLock className="w-5 h-5" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className={`w-full pl-11 pr-10 py-3 bg-white border ${
              confirmPassword && !passwordsMatch
                ? "border-red-400 bg-red-50/50"
                : confirmPassword && passwordsMatch
                ? "border-emerald-400 bg-emerald-50/30"
                : "border-gray-200"
            } rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
            required
          />
          {confirmPassword && passwordsMatch && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-500">
              <IconCheck className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>

      {/* Favorite Breakfast Category Preference */}
      <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4">
        <label className="block text-xs font-bold font-mono uppercase tracking-wider text-amber-900 mb-1">
          Favorite Breakfast Delight 🥞
        </label>
        <p className="text-xs text-gray-500 font-mono mb-2.5">
          Select your favorite so we can customize your welcome gift!
        </p>

        <div className="grid grid-cols-2 gap-2">
          {BREAKFAST_PREFERENCES.map((pref) => (
            <button
              key={pref.id}
              type="button"
              onClick={() => setSelectedPref(pref.id)}
              className={`py-2 px-3 rounded-xl text-xs font-bold font-pixelify-sans border text-left transition-all cursor-pointer ${
                selectedPref === pref.id
                  ? "bg-amber-400 border-amber-500 text-gray-900 shadow-xs scale-[1.02]"
                  : "bg-white border-amber-200 text-gray-700 hover:bg-amber-100/50"
              }`}
            >
              {pref.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          type="checkbox"
          id="terms"
          checked={agreedTerms}
          onChange={(e) => setAgreedTerms(e.target.checked)}
          className="mt-0.5 w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-400 cursor-pointer"
        />
        <label htmlFor="terms" className="text-xs font-mono text-gray-600 leading-tight cursor-pointer">
          I agree to the{" "}
          <span className="text-amber-700 font-bold font-pixelify-sans underline">
            Breakfast Club Terms & Rewards Policy
          </span>{" "}
          and want to receive 500 bonus points.
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
            <span>Creating Your Account...</span>
          </>
        ) : (
          <>
            <span>Create Account & Claim 500 Points 🎉</span>
          </>
        )}
      </button>
    </form>
  );
}
