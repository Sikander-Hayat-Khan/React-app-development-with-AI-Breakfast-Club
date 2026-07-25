"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconAward, IconLogOut } from "./AuthIcons";
import { useAuth } from "@/context/AuthContext";

export default function UserProfileCard({ user, onLogout }) {
  const { points, favorites, orders, toggleFavorite } = useAuth();
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "favorites" | "orders"
  const [addedToast, setAddedToast] = useState("");

  if (!user) return null;

  const displayPoints = points !== undefined ? points : user.points || 0;
  const activeUserFavorites = favorites || user.favorites || [];

  const handleAddToCart = (item) => {
    try {
      const existing = localStorage.getItem("breakfast_club_cart");
      let cart = existing ? JSON.parse(existing) : [];
      const foundIndex = cart.findIndex((c) => c.id === item.id);
      if (foundIndex >= 0) {
        cart[foundIndex].quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("breakfast_club_cart", JSON.stringify(cart));

      setAddedToast(`Added ${item.name} to your basket! 🛒`);
      setTimeout(() => setAddedToast(""), 3000);
    } catch (e) {
      console.error("Failed adding to cart from profile", e);
    }
  };

  return (
    <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fade-in relative overflow-hidden">
      {/* Toast popup */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-amber-400 px-5 py-3 rounded-2xl shadow-2xl font-bold font-pixelify-sans text-sm flex items-center gap-2 border border-amber-400 animate-bounce">
          <span>{addedToast}</span>
        </div>
      )}

      {/* Background Graphic Accent */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />

      {/* Top Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-100 pb-5 gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 ${user.avatarColor || "bg-amber-400"
              } text-white rounded-2xl flex items-center justify-center font-bold text-2xl sm:text-3xl font-pixelify-sans shadow-md border-2 border-amber-300 shrink-0`}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : "🍳"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-pixelify-sans text-gray-900">
                Welcome back, {user.name}!
              </h2>
            </div>
            <p className="text-xs font-mono text-gray-500 mt-0.5">
              {user.email} {user.phone ? `• ${user.phone}` : ""}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-md text-[11px] font-pixelify-sans font-bold">
                <IconAward className="w-3.5 h-3.5 text-amber-600" />
                {user.role || "VIP Club Member"}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-200 px-4 py-2 rounded-xl text-xs font-bold font-pixelify-sans transition-all cursor-pointer self-start sm:self-auto"
          title="Sign Out"
        >
          <IconLogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-pixelify-sans transition-all cursor-pointer ${activeTab === "overview"
              ? "bg-amber-400 text-gray-900 shadow-xs"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          Overview & Points
        </button>

        <button
          onClick={() => setActiveTab("favorites")}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-pixelify-sans transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "favorites"
              ? "bg-amber-400 text-gray-900 shadow-xs"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          <span>My Favorites</span>
          {activeUserFavorites.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {activeUserFavorites.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-pixelify-sans transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "orders"
              ? "bg-amber-400 text-gray-900 shadow-xs"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          <span>Order History</span>
          {orders.length > 0 && (
            <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {orders.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: OVERVIEW & POINTS */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Points Card */}
            <div className="bg-linear-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-amber-100 text-xs font-pixelify-sans">
                <span>REWARDS POINTS BALANCE</span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-extrabold font-mono flex items-baseline gap-1">
                  <span>{displayPoints}</span>
                  <span className="text-base font-normal">PTS</span>
                </div>
                <p className="text-[11px] text-amber-100 font-mono mt-1">
                  Redeem points at checkout for instant cash discounts!
                </p>
              </div>
            </div>

            {/* Member Status */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 flex flex-col justify-between">
              <div className="text-xs font-pixelify-sans font-bold text-amber-800">
                MEMBER PERKS
              </div>
              <div className="mt-2">
                <div className="text-sm font-bold font-mono text-gray-900">
                  Active Member ({user.memberSince || "2026"})
                </div>
                <p className="text-[11px] text-emerald-700 font-mono mt-1">
                  ✓ 500 Bonus Sign-up Points
                  <br />
                  ✓ 100 Points = Rs. 50 Discount
                  <br />✓ Earn 1 Pt per Rs. 10 Spent
                </p>
              </div>
            </div>

            {/* Account Quick Stats */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col justify-between">
              <div className="text-xs font-pixelify-sans font-bold text-gray-600">
                ACTIVITY SUMMARY
              </div>
              <div className="mt-2 space-y-1 font-mono text-xs text-gray-700">
                <div className="flex gap-1">
                  <img width={20} src="/bookmark.png" alt="" />
                  <span>Favorites Saved: <strong>{activeUserFavorites.length}</strong></span>
                </div>
                <div className="flex gap-1">
                  <img width={20} src="/shopping-cart.png" alt="" />
                  <span>Orders Placed: <strong>{orders.length}</strong></span>
                </div>
                <div className="flex gap-1">
                  <img width={20} src="/restaurant.png" alt="" />
                  <span>Preference: <strong>{user.favoriteItem || "Eggs & Coffee"}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold font-pixelify-sans text-gray-800 uppercase tracking-wider">
              Quick Breakfast Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/reservation"
                className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold font-pixelify-sans py-3 px-4 rounded-xl text-sm shadow-xs hover:shadow-md transition-all text-center"
              >
                <img width={25} src="/Reservation.png" alt="" />
                <span>Book a Table</span>
              </Link>
              <Link
                href="/menu"
                className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold font-pixelify-sans py-3 px-4 rounded-xl text-sm shadow-xs hover:shadow-md transition-all text-center"
              >
                <img width={25} src="/Book.png" alt="" />
                <span>Order Breakfast Menu</span>
              </Link>
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-pixelify-sans py-3 px-4 rounded-xl text-sm shadow-xs hover:shadow-md transition-all text-center"
              >
                <img width={22} src="/Cart.png" alt="" />
                <span>View Cart & Checkout</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY FAVORITES */}
      {activeTab === "favorites" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-pixelify-sans text-gray-900">
              Your Saved Favorite Dishes
            </h3>
            <Link href="/menu" className="text-xs font-mono font-bold text-amber-700 hover:underline">
              + Browse Full Menu
            </Link>
          </div>

          {activeUserFavorites.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-2xl p-6">
              <span className="text-4xl">❤️</span>
              <h4 className="font-pixelify-sans font-bold text-gray-800 mt-2">
                No favorites saved yet
              </h4>
              <p className="text-xs font-mono text-gray-500 mt-1 max-w-sm mx-auto">
                Click the heart icon on any dish card in the Menu to save it here for fast 1-click ordering!
              </p>
              <Link
                href="/menu"
                className="inline-block mt-4 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold font-pixelify-sans px-5 py-2 rounded-xl text-xs"
              >
                Go to Menu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeUserFavorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs hover:border-amber-400 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white rounded-xl border border-amber-200 flex items-center justify-center p-1 overflow-hidden shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="object-contain max-h-12"
                        />
                      ) : (
                        <span className="text-2xl">🥞</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold font-pixelify-sans text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs font-mono font-bold text-amber-700">
                        Rs. {item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-amber-400 hover:bg-amber-500 text-gray-900 px-3 py-1.5 rounded-xl font-bold font-pixelify-sans text-xs transition-all shadow-xs cursor-pointer"
                    >
                      + Add
                    </button>
                    <button
                      onClick={() => toggleFavorite(item)}
                      className="text-red-500 hover:scale-110 transition-transform p-1 cursor-pointer"
                      title="Remove from favorites"
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ORDER HISTORY */}
      {activeTab === "orders" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-pixelify-sans text-gray-900">
              Your Past Orders & Status
            </h3>
            <span className="text-xs font-mono text-gray-500">
              Saved in Firestore DB
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-2xl p-6">
              <span className="text-4xl">📦</span>
              <h4 className="font-pixelify-sans font-bold text-gray-800 mt-2">
                No orders found
              </h4>
              <p className="text-xs font-mono text-gray-500 mt-1 max-w-sm mx-auto">
                Place your first breakfast order from the checkout page to view order receipts and status updates here!
              </p>
              <Link
                href="/menu"
                className="inline-block mt-4 bg-gray-900 hover:bg-gray-800 text-white font-bold font-pixelify-sans px-5 py-2 rounded-xl text-xs"
              >
                Browse Menu & Order
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id || ord.orderId}
                  className="bg-white border-2 border-gray-200 hover:border-amber-300 rounded-2xl p-4 sm:p-5 transition-all shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-sm text-gray-900">
                          #{ord.orderId || ord.id}
                        </span>
                        <span className="bg-amber-100 text-amber-900 text-[11px] font-bold font-pixelify-sans px-2.5 py-0.5 rounded-md border border-amber-200">
                          {ord.orderType ? ord.orderType.toUpperCase() : "DINE-IN"}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-gray-500 mt-0.5">
                        Placed: {ord.placedAt || "Just now"} • Customer: {ord.fullName || user.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-xl text-xs font-bold font-pixelify-sans flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {ord.status || "Preparing"}
                      </span>
                      <span className="text-sm font-extrabold font-mono text-gray-900">
                        Rs. {ord.grandTotal}
                      </span>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="space-y-1.5">
                    {ord.items &&
                      ord.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs font-mono text-gray-700 bg-gray-50 p-2 rounded-xl"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-amber-700">
                              {it.quantity}x
                            </span>
                            <span>{it.name}</span>
                          </div>
                          <span>Rs. {it.price * it.quantity}</span>
                        </div>
                      ))}
                  </div>

                  {/* Order Footer summary details */}
                  <div className="flex flex-wrap items-center justify-between pt-1 text-[11px] font-mono text-gray-500 border-t border-gray-100">
                    <div>
                      {ord.address && <span>📍 Delivery: {ord.address}</span>}
                      {ord.tableNumber && <span>🍽️ Table: {ord.tableNumber}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      {ord.pointsRedeemed > 0 && (
                        <span className="text-red-600 font-bold">
                          -{ord.pointsRedeemed} pts used
                        </span>
                      )}
                      {ord.pointsEarned > 0 && (
                        <span className="text-emerald-700 font-bold">
                          +{ord.pointsEarned} pts earned
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
