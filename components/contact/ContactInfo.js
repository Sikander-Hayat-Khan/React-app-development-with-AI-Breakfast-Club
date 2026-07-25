"use client";

import { useState } from "react";
import { IconMail, IconPhone, IconClock, IconCheckCircle } from "./ContactIcons";

export default function ContactInfo() {
  const [copiedType, setCopiedType] = useState(null);

  const clubEmail = "hello@breakfastclub.com";
  const clubPhone = "+92 (0992) 861-420";

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <div className="bg-linear-to-br from-gray-900 via-gray-900 to-gray-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-800 flex flex-col justify-between space-y-6 h-full">
      <div className="space-y-6">
        <div>
          <span className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider mb-2">
            Reach Out Directly
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-pixelify-sans text-white">
            Club Contact Information
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 font-mono mt-1">
            Have an urgent query or group booking question? Reach our team directly via phone or email.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Email Card */}
          <div className="bg-gray-800/80 border border-gray-700/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-amber-400/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                <IconMail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-pixelify-sans block uppercase tracking-wider">
                  Email of the Club
                </span>
                <a
                  href={`mailto:${clubEmail}`}
                  className="font-bold font-mono text-white hover:text-amber-400 text-sm sm:text-base transition-colors"
                >
                  {clubEmail}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(clubEmail, "email")}
              className="text-xs font-bold font-pixelify-sans px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-amber-300 transition-all cursor-pointer self-end sm:self-center"
            >
              {copiedType === "email" ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <IconCheckCircle className="w-4 h-4" /> Copied!
                </span>
              ) : (
                "Copy Email"
              )}
            </button>
          </div>

          {/* Phone Card */}
          <div className="bg-gray-800/80 border border-gray-700/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-amber-400/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                <IconPhone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-pixelify-sans block uppercase tracking-wider">
                  Phone Number of the Club
                </span>
                <a
                  href={`tel:${clubPhone.replace(/\s+/g, "")}`}
                  className="font-bold font-mono text-white hover:text-amber-400 text-sm sm:text-base transition-colors"
                >
                  {clubPhone}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(clubPhone, "phone")}
              className="text-xs font-bold font-pixelify-sans px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-amber-300 transition-all cursor-pointer self-end sm:self-center"
            >
              {copiedType === "phone" ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <IconCheckCircle className="w-4 h-4" /> Copied!
                </span>
              ) : (
                "Copy Phone"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Customer Service Hours */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
          <IconClock className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold font-pixelify-sans uppercase tracking-wider text-amber-400">
            Customer Care Hours
          </h4>
          <p className="text-xs text-gray-300 font-pixelify-sans">
            Monday – Sunday: 7:00 AM – 11:00 PM PST
          </p>
        </div>
      </div>
    </div>
  );
}
