"use client";

import React from "react";

export default function ConfirmationModal({ reservation, onClose }) {
  if (!reservation) return null;

  const bookingCode = `BC-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 my-8">
        {/* Modal Header Bar */}
        <div style={{ backgroundColor: "rgb(178, 90, 104)" }} className="p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
          
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="text-3xl">🎉</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-pixelify-sans">
            Reservation Confirmed!
          </h3>
          <p className="text-white/80 font-pixelify-sans text-sm mt-1">
            We can't wait to welcome you to The Breakfast Club!
          </p>
        </div>

        {/* Yellow Decorative Bar */}
        <div className="w-full border-b-4 border-yellow-400" />

        {/* Ticket Details */}
        <div className="p-6 space-y-6">
          {/* Ticket Header & Code */}
          <div className="flex items-center justify-between bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
            <div>
              <span className="text-xs text-gray-500 font-pixelify-sans uppercase tracking-wider block">
                Booking Reference
              </span>
              <span className="text-2xl font-bold font-pixelify-sans text-gray-900">
                #{bookingCode}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold font-pixelify-sans text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                ✓ Confirmed
              </span>
            </div>
          </div>

          {/* Reservation Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm font-pixelify-sans">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-gray-500 text-xs block">Guest Name</span>
              <span className="font-bold text-gray-900">{reservation.fullName}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-gray-500 text-xs block">Contact Phone</span>
              <span className="font-bold text-gray-900">{reservation.phone}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 col-span-2">
              <span className="text-gray-500 text-xs block">Date & Time</span>
              <span className="font-bold text-gray-900">
                {reservation.date} at {reservation.time}
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 col-span-2 flex items-center justify-between">
              <div>
                <span className="text-gray-500 text-xs block">Reserved Table</span>
                <span className="font-bold text-emerald-800 text-base">
                  {reservation.table.number} — {reservation.table.name}
                </span>
              </div>
              <span className="text-xs bg-gray-200 px-2.5 py-1 rounded-md text-gray-700 uppercase font-bold">
                {reservation.table.zone} zone
              </span>
            </div>
          </div>

          {reservation.specialRequests && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs font-pixelify-sans">
              <span className="font-bold text-rose-800 block">Special Request:</span>
              <span className="text-rose-900">{reservation.specialRequests}</span>
            </div>
          )}

          {/* QR Code / Barcode Decorative Area */}
          <div className="border-t border-dashed border-gray-300 pt-4 flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-xl p-2 flex items-center justify-center border border-gray-200 mb-2">
              <div className="grid grid-cols-5 gap-1.5 w-full h-full p-2 bg-white rounded">
                {[...Array(25)].map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      (i * 7) % 3 === 0 ? "bg-black" : "bg-gray-200"
                    } rounded-xs`}
                  />
                ))}
              </div>
            </div>
            <span className="text-[11px] text-gray-400 font-pixelify-sans">
              Show this digital pass upon arrival at reception
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2">
            <button
              onClick={onClose}
              style={{ backgroundColor: "rgb(178, 90, 104)" }}
              className="w-full py-3.5 text-white font-bold font-pixelify-sans text-lg rounded-xl hover:brightness-105 transition-all cursor-pointer shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
