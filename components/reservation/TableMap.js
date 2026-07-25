"use client";

import React from "react";
import Image from "next/image";

const INITIAL_TABLES = [
  {
    id: "t1",
    number: "T-01",
    name: "Window Table 1",
    capacity: 2,
    zone: "window",
    status: "available",
    imgAvailable: "/table/table_2a.png",
    imgReserved: "/table/table_2a_reserved.png",
    imgSeated: "/table/table_2a_seated.png",
    description: "Cozy 2-seater right next to the sunlit front window.",
  },
  {
    id: "t2",
    number: "T-02",
    name: "Window Table 2",
    capacity: 2,
    zone: "window",
    status: "reserved",
    imgAvailable: "/table/table_2b.png",
    imgReserved: "/table/table_2b_reserved.png",
    imgSeated: "/table/table_2b_seated.png",
    description: "Sunlit table with a street view, perfect for morning coffee.",
  },
  {
    id: "t3",
    number: "T-03",
    name: "Center Table 3",
    capacity: 2,
    zone: "main",
    status: "available",
    imgAvailable: "/table/table_2c.png",
    imgReserved: "/table/table_2c_reserved.png",
    imgSeated: "/table/table_2c_seated.png",
    description: "Quiet 2-seater in the central dining room.",
  },
  {
    id: "t4",
    number: "T-04",
    name: "Family Booth 4",
    capacity: 4,
    zone: "main",
    status: "available",
    imgAvailable: "/table/table_4.png",
    imgReserved: "/table/table_4_reserved.png",
    imgSeated: "/table/table_4_seated.png",
    description: "Spacious 4-seater dining table near the main floor.",
  },
  {
    id: "t5",
    number: "T-05",
    name: "Family Booth 5",
    capacity: 4,
    zone: "main",
    status: "seated",
    imgAvailable: "/table/table_4.png",
    imgReserved: "/table/table_4_reserved.png",
    imgSeated: "/table/table_4_seated.png",
    description: "Spacious 4-seater near the warm kitchen pass.",
  },
  {
    id: "t6",
    number: "T-06",
    name: "Bar Counter Table 6",
    capacity: 2,
    zone: "bar",
    status: "available",
    imgAvailable: "/table/table_2a.png",
    imgReserved: "/table/table_2a_reserved.png",
    imgSeated: "/table/table_2a_seated.png",
    description: "High-top 2-seater near the coffee espresso bar.",
  },
];

export default function TableMap({
  selectedTable,
  setSelectedTable,
  selectedZone,
}) {
  // Filter tables by seating zone only
  const filteredTables = INITIAL_TABLES.filter((t) => {
    if (selectedZone !== "all" && t.zone !== selectedZone) return false;
    return true;
  });

  const getTableImage = (table) => {
    if (selectedTable?.id === table.id) {
      return table.imgAvailable;
    }
    if (table.status === "reserved") return table.imgReserved;
    if (table.status === "seated") return table.imgSeated;
    return table.imgAvailable;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          {/* Golden Title without map icon */}
          <h2 className="text-2xl sm:text-3xl font-bold font-pixelify-sans text-[#d4af37]">
            Interactive Floor Plan
          </h2>
          <p className="text-sm font-mono text-gray-500 mt-1">
            Click on an available table to reserve your preferred spot.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs sm:text-sm font-pixelify-sans bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            <span>Booked / Seated</span>
          </div>
        </div>
      </div>

      {/* Main Floor Plan Grid */}
      <div className="relative bg-[#faf7f4] rounded-2xl border-2 border-dashed border-gray-300 p-6 min-h-105 flex flex-col justify-between overflow-hidden">
        {/* Decorative Floor Layout Elements */}
        <div className="flex items-center justify-between border-b-2 border-amber-800/20 pb-3 mb-6">
          <div className="flex items-center gap-3">
            <Image
              src="/bar.png"
              alt="Bar Counter"
              width={160}
              height={50}
              className="h-10 w-auto object-contain opacity-90 rotate-0 transform-none"
            />
            <span className="text-xs font-pixelify-sans uppercase tracking-wider font-bold text-amber-900/60 bg-amber-100 px-2 py-0.5 rounded">
              Bar & Espresso Station
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/plant.png"
              alt="Plant Decor"
              width={40}
              height={40}
              className="h-8 w-auto object-contain opacity-80 rotate-0 transform-none"
            />
            <span className="text-xs font-pixelify-sans uppercase tracking-wider font-bold text-emerald-800/60 bg-emerald-100 px-2 py-0.5 rounded">
              Window Terrace
            </span>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
          {filteredTables.map((table) => {
            const isSelected = selectedTable?.id === table.id;
            const isAvailable = table.status === "available";

            return (
              <div
                key={table.id}
                onClick={() => {
                  if (isAvailable) setSelectedTable(table);
                }}
                className={`relative rounded-2xl p-4 transition-all duration-300 flex flex-col items-center justify-between border-2 ${
                  isSelected
                    ? "bg-yellow-50 border-yellow-500 shadow-xl ring-4 ring-yellow-400/30 cursor-pointer"
                    : isAvailable
                    ? "bg-white hover:bg-rose-50/50 border-gray-200 hover:border-[rgb(178,90,104)] shadow-xs hover:shadow-md cursor-pointer"
                    : "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
                }`}
              >
                {/* Table Top Badge */}
                <div className="w-full flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-bold font-mono px-2.5 py-1 rounded-full ${
                      isSelected
                        ? "bg-yellow-400 text-black"
                        : isAvailable
                        ? "bg-[rgb(178,90,104)] text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {table.number}
                  </span>

                  <span className="text-xs font-bold font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
                    {table.capacity} Seats
                  </span>
                </div>

                {/* Table Asset Image - Straightened with no transform or tilt */}
                <div className="relative w-full h-32 my-2 flex items-center justify-center">
                  <Image
                    src={getTableImage(table)}
                    alt={table.name}
                    width={180}
                    height={120}
                    className="max-h-28 w-auto object-contain rotate-0 transform-none"
                  />
                </div>

                {/* Name */}
                <div className="w-full text-center mt-2">
                  <h4 className="font-bold font-pixelify-sans text-base text-gray-900">
                    {table.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-mono line-clamp-1">
                    {table.description}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="mt-3 w-full">
                  {isSelected ? (
                    <div className="w-full py-1.5 bg-yellow-400 text-black font-bold font-pixelify-sans text-xs rounded-xl text-center shadow-xs">
                      ✓ Selected Table
                    </div>
                  ) : isAvailable ? (
                    <div className="w-full py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold font-pixelify-sans text-xs rounded-xl text-center">
                      Select Table
                    </div>
                  ) : (
                    <div className="w-full py-1.5 bg-gray-200 text-gray-600 font-bold font-pixelify-sans text-xs rounded-xl text-center">
                      {table.status === "reserved" ? "Reserved" : "Seated"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
