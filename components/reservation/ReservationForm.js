import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ReservationForm({
  selectedDate,
  selectedTime,
  selectedTable,
  onConfirmReservation,
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    occasion: "None",
    specialRequests: "",
  });

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTable) {
      setErrorMessage("Please select a table from the floor plan above!");
      return;
    }
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage("Please fill in your name, phone number, and email address.");
      return;
    }

    setErrorMessage("");
    onConfirmReservation({
      ...formData,
      date: selectedDate,
      time: selectedTime,
      table: selectedTable,
    });
  };

  return (
    <div className="bg-[#f1cacf] border border-[#e5b3b9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-[#e8b3b8] pb-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-pixelify-sans text-gray-900 flex items-center gap-2">
          <span>📝</span> Guest Details & Confirmation
        </h2>
        <span className="text-sm font-pixelify-sans text-gray-800 bg-white px-3 py-1 rounded-full border border-pink-200 shadow-2xs">
          Step 2 of 2
        </span>
      </div>

      {/* Reservation Summary Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-[#e5b3b9] space-y-3">
        <h3 className="text-lg font-bold font-pixelify-sans text-gray-900 border-b border-gray-100 pb-2">
          Reservation Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-pixelify-sans">
          <div>
            <span className="text-gray-500 block text-xs">Date</span>
            <span className="font-bold font-mono text-gray-900">{selectedDate}</span>
          </div>
          <div>
            <span className="text-gray-500 block text-xs">Time</span>
            <span className="font-bold font-mono text-gray-900">{selectedTime}</span>
          </div>
          <div>
            <span className="text-gray-500 block text-xs">Table</span>
            <span
              className={`font-bold ${
                selectedTable ? "text-emerald-700" : "text-red-500"
              }`}
            >
              {selectedTable ? `${selectedTable.number} (${selectedTable.name})` : "Not Selected"}
            </span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl font-pixelify-sans text-sm font-bold animate-shake">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold font-pixelify-sans text-gray-900 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Jane Doe"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white font-pixelify-sans text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold font-pixelify-sans text-gray-900 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +92 300 1234567"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white font-mono text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold font-pixelify-sans text-gray-900 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. jane@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white font-pixelify-sans text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold font-pixelify-sans text-gray-900 mb-1">
              Special Occasion
            </label>
            <select
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white font-pixelify-sans text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            >
              <option value="None">Casual Dining</option>
              <option value="Birthday">Birthday Celebration 🎂</option>
              <option value="Anniversary">Anniversary 🥂</option>
              <option value="Business Breakfast">Business Breakfast 💼</option>
              <option value="Family Gathering">Family Gathering 👨‍👩‍👧</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold font-pixelify-sans text-gray-900 mb-1">
              Dietary or Seating Requests
            </label>
            <input
              type="text"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="e.g., High chair needed, vegan preference..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white font-pixelify-sans text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button - without sparkling icon */}
        <button
          type="submit"
          style={{ backgroundColor: "rgb(178, 90, 104)" }}
          className="w-full py-4 text-white font-bold font-pixelify-sans text-xl rounded-xl transition-all duration-200 hover:brightness-105 active:scale-98 shadow-md flex items-center justify-center cursor-pointer mt-4"
        >
          Complete Table Booking
        </button>
      </form>
    </div>
  );
}
