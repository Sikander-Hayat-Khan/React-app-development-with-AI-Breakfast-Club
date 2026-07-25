"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const DISHES = [
  {
    id: 1,
    name: "Fluffy Berry Pancakes",
    description: "Stacked high with fresh berries, whipped butter, and pure organic maple syrup.",
    image: "/menu-items/breakfast/hot-breakfast/pancake.png",
  },
  {
    id: 2,
    name: "Belgian Waffles",
    description: "Crispy golden waffles served with powdered sugar and rich caramel drizzle.",
    image: "/menu-items/breakfast/hot-breakfast/waffle.png",
  },
  {
    id: 3,
    name: "Golden French Toast",
    description: "Brioche bread dipped in vanilla cinnamon batter, grilled to golden perfection.",
    image: "/menu-items/breakfast/hot-breakfast/frenchtoast.png",
  },
  {
    id: 4,
    name: "Savory Breakfast Burrito",
    description: "Scrambled eggs, cheddar cheese, crisp bacon, and avocado wrapped in a warm tortilla.",
    image: "/menu-items/breakfast/savory/breakfast_burrito.png",
  },
  {
    id: 5,
    name: "Egg & Avocado Toast",
    description: "Poached eggs over smashed avocado on toasted sourdough with red pepper flakes.",
    image: "/menu-items/breakfast/savory/egg_and_toast.png",
  },
  {
    id: 6,
    name: "Artisan Panini",
    description: "Pressed ciabatta filled with roasted turkey, smoked provolone, and pesto spread.",
    image: "/menu-items/breakfast/savory/panini.png",
  },
];

const AUTO_SWAP_INTERVAL = 3500; // 3.5 seconds per slide

export default function TopDishesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % DISHES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + DISHES.length) % DISHES.length);
  }, []);

  const handleSelect = (index) => {
    setCurrentIndex(index);
  };

  // Auto-carousel timer (resets automatically whenever currentIndex changes)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, AUTO_SWAP_INTERVAL);

    return () => clearInterval(timer);
  }, [currentIndex, handleNext]);

  // Compute circular distance between slide index and active slide
  const getDiff = (index) => {
    const total = DISHES.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full select-none">
      {/* Carousel Main Stage */}
      <div className="relative w-full h-95 sm:h-105 flex items-center justify-center overflow-hidden">
        {/* Navigation Button - Left */}
        <button
          onClick={handlePrev}
          aria-label="Previous Dish"
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/95 shadow-lg border border-gray-200 text-gray-800 hover:bg-[rgb(255,196,106)] hover:text-black transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Dish Cards Stack */}
        <div className="relative w-full h-full flex items-center justify-center">
          {DISHES.map((dish, index) => {
            const diff = getDiff(index);
            const isActive = diff === 0;

            // Determine transforms and positions based on relative offset
            let positionStyles = "";
            if (diff === 0) {
              // Active Center Card
              positionStyles =
                "translate-x-0 scale-100 sm:scale-105 opacity-100 z-20";
            } else if (diff === -1) {
              // Immediate Left Card
              positionStyles =
                "-translate-x-[60%] sm:-translate-x-[70%] md:-translate-x-[78%] scale-85 opacity-60 z-10 cursor-pointer";
            } else if (diff === 1) {
              // Immediate Right Card
              positionStyles =
                "translate-x-[60%] sm:translate-x-[70%] md:translate-x-[78%] scale-85 opacity-60 z-10 cursor-pointer";
            } else if (diff < -1) {
              // Farther Left Cards
              positionStyles =
                "-translate-x-[130%] scale-75 opacity-0 z-0 pointer-events-none";
            } else {
              // Farther Right Cards
              positionStyles =
                "translate-x-[130%] scale-75 opacity-0 z-0 pointer-events-none";
            }

            return (
              <div
                key={dish.id}
                onClick={() => !isActive && handleSelect(index)}
                className={`absolute transition-all duration-500 ease-in-out cursor-pointer w-56 sm:w-64 md:w-72 h-85 sm:h-92.5 flex flex-col justify-between p-5 rounded-2xl ${
                  isActive
                    ? "bg-[rgb(252,229,151)] hover:bg-[rgb(255,196,106)] border-2 border-[rgb(252,229,151)] shadow-2xl shadow-amber-500/20"
                    : "bg-white hover:bg-[rgb(252,229,151)]/30 border border-gray-200 shadow-md"
                } ${positionStyles}`}
              >
                {/* Food Image */}
                <div className="relative w-full h-36 sm:h-44 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className={`object-contain transition-all duration-500 ${
                      isActive
                        ? "grayscale-0 filter-none drop-shadow-md"
                        : "grayscale opacity-75"
                    }`}
                  />
                </div>

                {/* Card Text Content: Title and Description */}
                <div className="flex flex-col text-center grow justify-center">
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-1.5 transition-colors duration-500 ${
                      isActive ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {dish.name}
                  </h3>
                  <p
                    className={`font-mono text-xs sm:text-sm line-clamp-3 leading-relaxed transition-colors duration-500 ${
                      isActive ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {dish.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Button - Right */}
        <button
          onClick={handleNext}
          aria-label="Next Dish"
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/95 shadow-lg border border-gray-200 text-gray-800 hover:bg-[rgb(255,196,106)] hover:text-black transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Step Progress Yellow Bar at Bottom */}
      <div className="w-full max-w-xs sm:max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden mt-6">
        <div
          className="h-full bg-[rgb(252,229,151)] transition-all duration-500 ease-in-out rounded-full"
          style={{
            width: `${((currentIndex + 1) / DISHES.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
