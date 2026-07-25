"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import UserProfileCard from "@/components/auth/UserProfileCard";
import { useAuth } from "@/context/AuthContext";

function AuthFormContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState(initialMode);
  const { user, logout } = useAuth();
  const [toastMessage, setToastMessage] = useState("");

  // Sync mode query parameter with active tab state
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "signup") {
      setActiveTab("signup");
    } else if (mode === "login") {
      setActiveTab("login");
    }
  }, [searchParams]);

  const handleAuthSuccess = (userData) => {
    const actionText =
      activeTab === "signup"
        ? "Account created & 500 bonus points added!"
        : "Logged in successfully!";
    setToastMessage(`🎉 Welcome, ${userData?.name || "Member"}! ${actionText}`);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const handleLogout = async () => {
    await logout();
    setToastMessage("👋 You have logged out. See you next breakfast!");
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  return (
    <main className="bg-white min-h-screen pb-16 text-gray-800 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl font-bold font-pixelify-sans text-sm flex items-center gap-3 border border-amber-400 animate-bounce">
          <span className="text-amber-400 text-xl">🌟</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <AuthHeader />

      <div className="w-11/12 max-w-7xl mx-auto">
        {user ? (
          /* Logged In View */
          <div className="max-w-4xl mx-auto">
            <UserProfileCard user={user} onLogout={handleLogout} />
          </div>
        ) : (
          /* Authentication Forms Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Perks & Brand Showcase (5 cols) */}
            <div className="lg:col-span-5 bg-linear-to-b from-amber-500/10 to-amber-100/40 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <div className="inline-block bg-amber-400 text-gray-900 px-3 py-1 rounded-xl text-xs font-bold font-mono uppercase mb-3">
                  Breakfast Rewards
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-pixelify-sans text-gray-900 leading-tight">
                  Why join The Breakfast Club?
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-mono mt-2">
                  Enjoy exclusive foodie perks, food discounts, fast reservation booking, and free treats.
                </p>
              </div>

              {/* Perks List */}
              <div className="space-y-4 font-pixelify-sans">
                <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-amber-100">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg shrink-0">
                    <img width={25} src="/coin.png" alt="" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm font-mono">
                      500 Free Bonus Points
                    </h4>
                    <p className="text-xs text-gray-500 font-mono">
                      Claim 500 points immediately upon signing up today.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-amber-100">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg shrink-0">
                    <img width={25} src="/table.png" alt="" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm font-mono">
                      1-Click Table Booking
                    </h4>
                    <p className="text-xs text-gray-500 font-mono">
                      Pre-save your party size and instant reservation preferences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-amber-100">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg shrink-0">
                    <img width={25} src="/coffee2.png" alt="" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm font-mono">
                      Free Artisanal Coffee & Discounts
                    </h4>
                    <p className="text-xs text-gray-500 font-mono">
                      Redeem points at checkout for instant cash discounts on your food orders!
                    </p>
                  </div>
                </div>
              </div>

              {/* Brand Illustration Banner */}
              <div className="pt-2 text-center">
                <div className="bg-amber-400/80 border-2 border-dashed border-amber-300 rounded-2xl p-4 flex flex-col items-center justify-center">
                  <Image
                    src="/breakfast_club_logo.png"
                    alt="Breakfast Club Logo"
                    width={160}
                    height={50}
                    className="h-12 w-auto object-contain mb-2"
                  />
                  <p className="text-[11px] font-mono font-bold text-white">
                    Fresh ingredients, cozy vibes & great mornings every day.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Tabbed Auth Card (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              {/* Tab Selector featuring graphic buttons */}
              <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all cursor-pointer ${
                    activeTab === "login"
                      ? "bg-amber-400 text-gray-900 shadow-sm font-bold font-pixelify-sans scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600 font-pixelify-sans"
                  }`}
                >
                  <Image
                    src="/buttons/Login.png"
                    alt="Login"
                    width={80}
                    height={30}
                    className="h-6 w-auto object-contain"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all cursor-pointer ${
                    activeTab === "signup"
                      ? "bg-amber-400 text-gray-900 shadow-sm font-bold font-pixelify-sans scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600 font-pixelify-sans"
                  }`}
                >
                  <Image
                    src="/buttons/Signup.png"
                    alt="Sign Up"
                    width={90}
                    height={30}
                    className="h-6 w-auto object-contain"
                  />
                </button>
              </div>

              {/* Render Active Form */}
              {activeTab === "login" ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold font-pixelify-sans text-gray-900">
                      Sign In to Your Account
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-mono">
                      Enter your email and password to access your member portal.
                    </p>
                  </div>
                  <LoginForm onSuccess={handleAuthSuccess} />
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold font-pixelify-sans text-gray-900">
                      Create Your Club Account
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-mono">
                      Fill in your details below to start earning breakfast rewards!
                    </p>
                  </div>
                  <SignupForm onSuccess={handleAuthSuccess} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AuthFormContent />
    </Suspense>
  );
}
