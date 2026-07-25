"use client";

import { useState } from "react";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import CafeLocations from "@/components/contact/CafeLocations";
import SocialFollow from "@/components/contact/SocialFollow";

export default function ContactPage() {
  const [toastMessage, setToastMessage] = useState("");

  const handleFormSubmitSuccess = (data) => {
    setToastMessage(`Feedback received from ${data.name}! Thank you.`);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  return (
    <main className="bg-white min-h-screen pb-16 text-gray-800 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl font-bold font-pixelify-sans text-base flex items-center gap-3 border border-amber-400 animate-bounce">
          <span className="text-amber-400 text-xl">🌟</span>
          {toastMessage}
        </div>
      )}

      {/* Header & Hero Section */}
      <ContactHeader />

      {/* Main Content Layout */}
      <div className="w-11/12 max-w-7xl mx-auto space-y-12">
        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm onSubmitSuccess={handleFormSubmitSuccess} />
          </div>

          {/* Contact Info Column (5 cols) */}
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
        </div>

        {/* Cafe Locations Section */}
        <CafeLocations />

        {/* Follow Us Section */}
        <SocialFollow />
      </div>
    </main>
  );
}
