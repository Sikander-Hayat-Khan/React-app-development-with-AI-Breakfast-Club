"use client";

import Link from "next/link";
import AboutHeader from "@/components/about/AboutHeader";
import OurHistory from "@/components/about/OurHistory";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen pb-16 text-gray-800 relative">
      <div className="w-11/12 max-w-7xl mx-auto pt-8">
        {/* Title & Cheesy Header Line */}
        <AboutHeader />

        {/* Our History Section */}
        <OurHistory />

        {/* Bottom CTA Banner */}
        <div className="bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 p-8 sm:p-10 rounded-3xl text-center space-y-4 shadow-lg border-2 border-amber-500/40">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 font-pixelify-sans">
            Ready to Start Your Morning Right? 🍳
          </h3>
          <p className="text-gray-900 font-medium text-sm sm:text-base max-w-2xl mx-auto">
            Come taste our legendary pancakes, savor fresh barista coffee, and experience why every breakfast at The Breakfast Club is something special.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/menu"
              className="bg-gray-900 text-amber-400 font-bold px-6 py-3 rounded-xl hover:bg-gray-800 hover:scale-105 transition-all shadow-md font-pixelify-sans text-base"
            >
              Explore Our Menu 📜
            </Link>
            <Link
              href="/reservation"
              className="bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-50 hover:scale-105 transition-all shadow-md font-pixelify-sans text-base border border-amber-400"
            >
              Book a Table 🪑
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
