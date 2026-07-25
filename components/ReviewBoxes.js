"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { fetchReviews } from "@/lib/firebaseService";

export default function ReviewBoxes() {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);

  // Load reviews & listen for real-time changes from Realtime Database `reviews` node
  useEffect(() => {
    fetchReviews().then((initialList) => {
      if (initialList) setReviews(initialList);
      setLoading(false);
    });

    if (db) {
      const reviewsRef = ref(db, "reviews");
      const unsubscribe = onValue(reviewsRef, (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          const list = Object.values(val).reverse();
          setReviews(list);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleCollapse = () => {
    setVisibleCount(3);
  };

  const displayedReviews = reviews.slice(0, visibleCount);

  return (
    <section className="w-11/12 max-w-7xl mx-auto py-8 sm:py-12 flex flex-col items-center text-center relative">
      {/* Header */}
      <div className="w-full flex flex-col justify-start mb-6 sm:mb-10 text-left">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 font-pixelify-sans mb-2 sm:mb-3">
          What Our Customers Are Saying
        </h2>
        <p className="text-gray-500 font-mono text-sm sm:text-lg md:text-xl">
          Real-time customer reviews submitted through our Contact Us portal.
        </p>
      </div>

      {/* Reviews Cards Grid */}
      {loading ? (
        <div className="py-12 font-mono text-gray-500 text-sm animate-pulse">
          Loading real-time customer reviews... 🍳
        </div>
      ) : reviews.length === 0 ? (
        <div className="py-12 text-center text-gray-500 font-mono">
          No reviews yet. Share your experience on our Contact Us page!
        </div>
      ) : (
        <div className="w-full flex flex-col items-center space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl">
            {displayedReviews.map((item, idx) => {
              const filledCount = item.ratingFilled !== undefined ? item.ratingFilled : item.rating || 5;
              const unfilledCount = item.ratingUnfilled !== undefined ? item.ratingUnfilled : 5 - filledCount;

              return (
                <div
                  key={item.id || idx}
                  style={{ backgroundColor: "rgb(252, 229, 151)" }}
                  className="w-full h-auto md:aspect-square rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between items-center text-center shadow-md hover:shadow-lg transition-all duration-300 border border-amber-200 animate-fade-in"
                >
                  {/* Quotation Icon */}
                  <div className="w-full flex justify-center pt-1 sm:pt-2">
                    <Image
                      src="/icons/quotation.svg"
                      alt="Quotation Mark"
                      width={36}
                      height={36}
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 opacity-90"
                    />
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-snug sm:leading-relaxed px-1 sm:px-2 font-mono italic my-3 sm:my-auto overflow-hidden line-clamp-4">
                    "{item.review}"
                  </p>

                  {/* Bottom Content Area */}
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full border-t border-black/20 my-2 sm:my-3" />

                    {/* Star Rating */}
                    <div className="flex items-center justify-center gap-1 mb-1 sm:mb-2">
                      {[...Array(filledCount)].map((_, i) => (
                        <Image
                          key={`filled-${i}`}
                          src="/icons/star_filled.png"
                          alt="Filled Star"
                          width={20}
                          height={20}
                          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                        />
                      ))}
                      {[...Array(unfilledCount)].map((_, i) => (
                        <Image
                          key={`unfilled-${i}`}
                          src="/icons/star_unfilled.png"
                          alt="Unfilled Star"
                          width={20}
                          height={20}
                          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                        />
                      ))}
                    </div>

                    {/* Reviewer Name */}
                    <h3 className="font-bold font-pixelify-sans text-gray-900 text-sm sm:text-base md:text-lg">
                      {item.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons: Load More & Collapse */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap pt-2">
            {visibleCount < reviews.length && (
              <button
                onClick={handleLoadMore}
                className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-orange-500 bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 font-pixelify-sans font-bold rounded-full text-sm sm:text-base md:text-lg cursor-pointer shadow-sm hover:shadow-md active:scale-95"
              >
                Load More Reviews ({reviews.length - visibleCount} remaining)
              </button>
            )}

            {visibleCount > 3 && (
              <button
                onClick={handleCollapse}
                className="px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-400 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-300 font-pixelify-sans font-bold rounded-full text-sm sm:text-base md:text-lg cursor-pointer shadow-sm active:scale-95 flex items-center gap-2"
              >
                <span>Collapse Reviews</span>
                <span>▲</span>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
