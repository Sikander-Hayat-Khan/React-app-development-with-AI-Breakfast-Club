"use client";

import { useState } from "react";
import Image from "next/image";
import BookingControls from "@/components/reservation/BookingControls";
import TableMap from "@/components/reservation/TableMap";
import ReservationForm from "@/components/reservation/ReservationForm";
import ConfirmationModal from "@/components/reservation/ConfirmationModal";

import { submitReservation } from "@/lib/firebaseService";

export default function Reservation() {
  const [selectedDate, setSelectedDate] = useState("2026-07-23");
  const [selectedTime, setSelectedTime] = useState("09:00 AM");
  const [selectedZone, setSelectedZone] = useState("all");
  const [selectedTable, setSelectedTable] = useState(null);
  const [completedReservation, setCompletedReservation] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleTableSelect = (table) => {
    if (selectedTable?.id === table.id) {
      setSelectedTable(null);
      setToastMessage(`Deselected ${table.number}`);
      setTimeout(() => {
        setToastMessage("");
      }, 2500);
    } else {
      setSelectedTable(table);
      setToastMessage(`Selected ${table.number} (${table.name})`);
      setTimeout(() => {
        setToastMessage("");
      }, 2500);
    }
  };

  const handleConfirmReservation = async (reservationData) => {
    const savedRes = await submitReservation(reservationData);
    setCompletedReservation(savedRes || reservationData);
  };

  const handleCloseModal = () => {
    setCompletedReservation(null);
    setSelectedTable(null);
  };

  return (
    <main className="bg-white min-h-screen pb-16 text-gray-800 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl font-bold font-pixelify-sans text-lg flex items-center gap-3 border border-gray-700 animate-bounce">
          <span className="text-xl">🪑</span>
          {toastMessage}
        </div>
      )}

      {/* Reservation Heading Section */}
      <div className="w-11/12 max-w-7xl mx-auto pt-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 font-pixelify-sans text-left">
          Reservations
        </h1>
        {/* Horizontal Yellow Bar */}
        <div className="w-full border-b-2 border-yellow-400 mt-3 mb-6" />
      </div>

      {/* Hero Banner Section */}
      <div className="w-11/12 max-w-7xl mx-auto mb-10">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-md bg-linear-to-r from-[#b25a68] to-[#8d3e4a] text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider">
              Reserve Your Experience
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-pixelify-sans leading-tight">
              Book a Table at The Breakfast Club
            </h2>
            <p className="text-white/90 text-sm sm:text-base font-mono">
              Enjoy fresh artisanal morning dishes, handcrafted coffees, and a warm atmosphere. Pick your date, time, and table from our live interactive floor plan below.
            </p>
          </div>

          <div className="relative w-36 sm:w-48 h-36 sm:h-48 shrink-0">
            <Image
              src="/coffee.png"
              alt="Breakfast Club Coffee"
              fill
              className="object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Main Reservation Flow */}
      <div className="w-11/12 max-w-7xl mx-auto space-y-10">
        {/* Step 1: Controls (Date & Time input fields, Zone preference) */}
        <BookingControls
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedZone={selectedZone}
          setSelectedZone={setSelectedZone}
        />

        {/* Step 2: Interactive Table Map */}
        <TableMap
          selectedTable={selectedTable}
          setSelectedTable={handleTableSelect}
          selectedZone={selectedZone}
        />

        {/* Step 3: Guest Info Form & Confirmation */}
        <ReservationForm
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedTable={selectedTable}
          onConfirmReservation={handleConfirmReservation}
        />

        {/* Dining Policies & Guidelines */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-2xl font-bold font-pixelify-sans text-gray-900 mb-6">
            Reservation Guidelines & Policies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
              <div className="text-2xl">⏰</div>
              <h4 className="font-bold font-pixelify-sans text-gray-900 text-lg">
                15-Min Grace Period
              </h4>
              <p className="text-xs text-gray-600 font-pixelify-sans">
                Tables are held for 15 minutes past your reserved time before being released to walk-in guests.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
              <div className="text-2xl">☕</div>
              <h4 className="font-bold font-pixelify-sans text-gray-900 text-lg">
                Breakfast & Brunch
              </h4>
              <p className="text-xs text-gray-600 font-pixelify-sans">
                Our kitchen serves full breakfast, desserts, and handcrafted beverages daily from 08:00 AM to 04:00 PM.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
              <div className="text-2xl">🚗</div>
              <h4 className="font-bold font-pixelify-sans text-gray-900 text-lg">
                Valet & Parking
              </h4>
              <p className="text-xs text-gray-600 font-pixelify-sans">
                Complimentary guest parking is available right in front of the café entrance.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
              <div className="text-2xl">🎉</div>
              <h4 className="font-bold font-pixelify-sans text-gray-900 text-lg">
                Special Events
              </h4>
              <p className="text-xs text-gray-600 font-pixelify-sans">
                For large gatherings or private venue booking, please feel free to reach us via our Contact Us page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {completedReservation && (
        <ConfirmationModal
          reservation={completedReservation}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
