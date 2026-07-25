"use client";

import React, { useState, useRef, useEffect } from "react";

export default function BookingControls({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedZone,
  setSelectedZone,
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  // Date parsing helper
  const dateObj = new Date(selectedDate + "T00:00:00");
  const [currentYear, setCurrentYear] = useState(dateObj.getFullYear() || 2026);
  const [currentMonth, setCurrentMonth] = useState(dateObj.getMonth() || 6); // 0-indexed (6 = July)

  // Time parsing helper
  const parseTime = (tStr) => {
    if (!tStr) return { hour: 9, minute: 0, period: "AM" };
    const parts = tStr.split(" ");
    const period = parts[1] || "AM";
    const [h, m] = parts[0].split(":").map(Number);
    return { hour: h || 9, minute: m || 0, period };
  };

  const initialTime = parseTime(selectedTime);
  const [hour, setHour] = useState(initialTime.hour);
  const [minute, setMinute] = useState(initialTime.minute);
  const [period, setPeriod] = useState(initialTime.period);

  const calendarRef = useRef(null);
  const timePickerRef = useRef(null);

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
      if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
        setIsTimePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calendar math
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day) => {
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const formatted = `${currentYear}-${monthStr}-${dayStr}`;
    setSelectedDate(formatted);
    setIsCalendarOpen(false);
  };

  // Time counter math
  const handleHourChange = (delta) => {
    setHour((prev) => {
      let next = prev + delta;
      if (next > 12) return 1;
      if (next < 1) return 12;
      return next;
    });
  };

  const handleMinuteChange = (delta) => {
    setMinute((prev) => {
      let next = prev + delta;
      if (next >= 60) return 0;
      if (next < 0) return 45;
      return next;
    });
  };

  const applyTimeChange = () => {
    const formattedHour = String(hour).padStart(2, "0");
    const formattedMinute = String(minute).padStart(2, "0");
    const formattedTime = `${formattedHour}:${formattedMinute} ${period}`;
    setSelectedTime(formattedTime);
    setIsTimePickerOpen(false);
  };

  const seatingZones = [
    { id: "all", label: "All Areas" },
    { id: "main", label: "Main Dining" },
    { id: "window", label: "Window Side" },
    { id: "bar", label: "Bar Lounge" },
  ];

  const quickTimes = [
    "08:00 AM",
    "09:00 AM",
    "10:15 AM",
    "11:30 AM",
    "01:00 PM",
    "02:30 PM",
  ];

  return (
    <div className="bg-[#fff9f9] border border-[#f3d2d7] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#f0c3c9] pb-4">
        {/* Golden Title without calendar icon */}
        <h2 className="text-2xl sm:text-3xl font-bold font-pixelify-sans text-[#d4af37]">
          Select Details
        </h2>
        <span className="text-sm font-pixelify-sans text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
          Step 1 of 2
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Date Input Field with Café-Themed Calendar Popup */}
        <div className="space-y-2 relative" ref={calendarRef}>
          <label className="block text-base font-bold font-pixelify-sans text-gray-800">
            Select Date
          </label>

          <button
            type="button"
            onClick={() => {
              setIsCalendarOpen(!isCalendarOpen);
              setIsTimePickerOpen(false);
            }}
            className="w-full flex items-center justify-between bg-white border-2 border-yellow-400/80 hover:border-yellow-500 rounded-xl px-4 py-3 font-mono text-lg font-bold text-gray-900 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <span>{selectedDate}</span>
            <span className="text-sm text-yellow-600 font-bold">▼</span>
          </button>

          {/* Custom Café-Themed Calendar Modal */}
          {isCalendarOpen && (
            <div className="font-mono absolute top-full left-0 mt-2 z-50 w-72 sm:w-80 bg-white border-2 border-[#b25a68] rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in-95">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <button
                  onClick={handlePrevMonth}
                  style={{ backgroundColor: "rgb(178, 90, 104)" }}
                  className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center hover:brightness-110 cursor-pointer"
                >
                  ‹
                </button>
                <span className="font-bold text-lg text-gray-900">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button
                  onClick={handleNextMonth}
                  style={{ backgroundColor: "rgb(178, 90, 104)" }}
                  className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center hover:brightness-110 cursor-pointer"
                >
                  ›
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 text-center font-bold font-pixelify-sans text-xs text-gray-500 mb-2">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-center font-pixelify-sans text-sm">
                {/* Blank offset days */}
                {[...Array(firstDayOfWeek)].map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {/* Days of current month */}
                {[...Array(daysInMonth)].map((_, i) => {
                  const dayNum = i + 1;
                  const monthStr = String(currentMonth + 1).padStart(2, "0");
                  const dayStr = String(dayNum).padStart(2, "0");
                  const dateFormatted = `${currentYear}-${monthStr}-${dayStr}`;
                  const isSelected = selectedDate === dateFormatted;

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => handleSelectDay(dayNum)}
                      style={
                        isSelected
                          ? { backgroundColor: "rgb(178, 90, 104)" }
                          : undefined
                      }
                      className={`h-9 w-full rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? "text-white shadow-md ring-2 ring-yellow-400"
                          : "text-gray-800 hover:bg-[#f1cacf]"
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 2. Time Input Field with Café-Themed Counter Popup */}
        <div className="space-y-2 relative" ref={timePickerRef}>
          <label className="block text-base font-bold font-pixelify-sans text-gray-800">
            Select Time
          </label>

          <button
            type="button"
            onClick={() => {
              setIsTimePickerOpen(!isTimePickerOpen);
              setIsCalendarOpen(false);
            }}
            className="w-full flex items-center justify-between bg-white border-2 border-yellow-400/80 hover:border-yellow-500 rounded-xl px-4 py-3 font-mono text-lg font-bold text-gray-900 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <span>{selectedTime}</span>
            <span className="text-sm text-yellow-600 font-bold">▼</span>
          </button>

          {/* Custom Café-Themed Time Counter Window */}
          {isTimePickerOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 w-72 sm:w-80 bg-white border-2 border-[#b25a68] rounded-2xl shadow-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="font-bold font-pixelify-sans text-gray-900 text-lg">
                  Set Reservation Time
                </span>
                <button
                  type="button"
                  onClick={() => setIsTimePickerOpen(false)}
                  className="text-xs font-pixelify-sans text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              {/* Hour & Minute Counter */}
              <div className="flex items-center justify-center gap-4 bg-[#fff9f9] p-4 rounded-xl border border-[#f3d2d7]">
                {/* Hours Counter */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold font-pixelify-sans text-gray-500">
                    HOUR
                  </span>
                  <button
                    type="button"
                    onClick={() => handleHourChange(1)}
                    style={{ backgroundColor: "rgb(178, 90, 104)" }}
                    className="w-8 h-8 rounded-lg text-white font-bold flex items-center justify-center hover:brightness-110 cursor-pointer"
                  >
                    +
                  </button>
                  <span className="text-2xl font-bold font-pixelify-sans text-gray-900 my-1">
                    {String(hour).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleHourChange(-1)}
                    style={{ backgroundColor: "rgb(178, 90, 104)" }}
                    className="w-8 h-8 rounded-lg text-white font-bold flex items-center justify-center hover:brightness-110 cursor-pointer"
                  >
                    -
                  </button>
                </div>

                <span className="text-3xl font-bold font-pixelify-sans text-gray-400 mt-4">
                  :
                </span>

                {/* Minutes Counter */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold font-pixelify-sans text-gray-500">
                    MIN
                  </span>
                  <button
                    type="button"
                    onClick={() => handleMinuteChange(15)}
                    style={{ backgroundColor: "rgb(178, 90, 104)" }}
                    className="w-8 h-8 rounded-lg text-white font-bold flex items-center justify-center hover:brightness-110 cursor-pointer"
                  >
                    +
                  </button>
                  <span className="text-2xl font-bold font-pixelify-sans text-gray-900 my-1">
                    {String(minute).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleMinuteChange(-15)}
                    style={{ backgroundColor: "rgb(178, 90, 104)" }}
                    className="w-8 h-8 rounded-lg text-white font-bold flex items-center justify-center hover:brightness-110 cursor-pointer"
                  >
                    -
                  </button>
                </div>

                {/* AM / PM Selector */}
                <div className="flex flex-col items-center gap-2 ml-2">
                  <button
                    type="button"
                    onClick={() => setPeriod("AM")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-pixelify-sans transition-all cursor-pointer ${
                      period === "AM"
                        ? "bg-yellow-400 text-black shadow-xs"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriod("PM")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-pixelify-sans transition-all cursor-pointer ${
                      period === "PM"
                        ? "bg-yellow-400 text-black shadow-xs"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>

              {/* Quick Time Chips */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold font-pixelify-sans text-gray-500">
                  Quick Select:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {quickTimes.map((qt) => (
                    <button
                      key={qt}
                      type="button"
                      onClick={() => {
                        setSelectedTime(qt);
                        const p = parseTime(qt);
                        setHour(p.hour);
                        setMinute(p.minute);
                        setPeriod(p.period);
                        setIsTimePickerOpen(false);
                      }}
                      className="py-1 px-2 bg-gray-100 hover:bg-yellow-300 text-gray-800 text-xs font-bold font-pixelify-sans rounded-lg transition-colors cursor-pointer text-center"
                    >
                      {qt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <button
                type="button"
                onClick={applyTimeChange}
                style={{ backgroundColor: "rgb(178, 90, 104)" }}
                className="w-full py-2.5 text-white font-bold font-pixelify-sans text-base rounded-xl transition-all hover:brightness-105 shadow-xs cursor-pointer"
              >
                Apply Time
              </button>
            </div>
          )}
        </div>

        {/* 3. Zone Preference */}
        <div className="space-y-2">
          <label className="block text-base font-bold font-pixelify-sans text-gray-800">
            Zone Preference
          </label>
          <div className="grid grid-cols-2 gap-2">
            {seatingZones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() => setSelectedZone(zone.id)}
                style={
                  selectedZone === zone.id
                    ? { backgroundColor: "rgb(178, 90, 104)" }
                    : undefined
                }
                className={`py-3 px-3 rounded-xl text-sm sm:text-base font-bold font-pixelify-sans transition-all cursor-pointer border text-center ${
                  selectedZone === zone.id
                    ? "text-white border-[rgb(178,90,104)] shadow-xs scale-102"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {zone.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
