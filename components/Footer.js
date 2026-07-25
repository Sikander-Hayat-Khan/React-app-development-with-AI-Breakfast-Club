"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full z-50 transition-all duration-500 ease-in-out bg-gray-900 text-gray-200 border-t-2 border-amber-400 shadow-2xl group overflow-hidden ${
        isExpanded ? "max-h-[85vh]" : "max-h-10 hover:max-h-[85vh]"
      }`}
    >
      {/* Top Handle / Bar with Centered Arrow Up Icon */}
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full h-10 flex items-center justify-center cursor-pointer select-none bg-gray-900 shrink-0 px-4 hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center gap-2 text-amber-400">
          <svg
            className={`w-5 h-5 transform transition-transform duration-500 ${
              isExpanded ? "rotate-180" : "group-hover:rotate-180"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 15l7-7 7 7"
            />
          </svg>
          <span className="text-xs font-semibold tracking-wider uppercase opacity-90 transition-opacity duration-300">
            {isExpanded ? "Tap / Click to Collapse Footer" : "Tap / Hover to Expand Footer"}
          </span>
        </div>
      </div>

      {/* Expanded Content Area */}
      <div
        className={`w-11/12 max-w-7xl mx-auto flex flex-col justify-between py-4 pb-6 gap-4 overflow-y-auto max-h-[calc(85vh-2.5rem)] transition-opacity duration-300 ease-in-out ${
          isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {/* Column 1: Brand Info */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-400 font-pixelify-sans mb-2">
              The Breakfast Club
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed font-mono">
              Serving happiness, fresh coffee, and gourmet morning dishes every single day. Your favorite cozy spot for breakfast and brunch.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-2 font-pixelify-sans text-sm sm:text-base">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-gray-400 text-xs font-mono">
              <li>
                <Link href="/menu" className="hover:text-amber-400 transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/review" className="hover:text-amber-400 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-amber-400 transition-colors">
                  Book a Table
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours */}
          <div>
            <h4 className="font-bold text-white mb-2 font-pixelify-sans text-sm sm:text-base">
              Opening Hours
            </h4>
            <ul className="space-y-1 text-gray-400 text-xs font-mono">
              <li>Mon - Fri: 7:00 AM - 3:00 PM</li>
              <li>Sat - Sun: 8:00 AM - 4:00 PM</li>
              <li className="text-amber-400 font-medium pt-1">Holidays: 8:00 AM - 2:00 PM</li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-bold text-white mb-2 font-pixelify-sans text-sm sm:text-base">
              Get In Touch
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed font-mono">
              123 Sunshine Boulevard, Foodie District
              <br />
              Phone: (555) 839-2041
              <br />
              Email: hello@breakfastclub.com
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 pt-3 text-center text-xs text-gray-500 font-mono">
          © {new Date().getFullYear()} The Breakfast Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
