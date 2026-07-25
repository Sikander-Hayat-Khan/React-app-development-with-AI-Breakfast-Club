"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { submitFeedback } from "@/lib/firebaseService";
import {
  IconStar,
  IconUser,
  IconMail,
  IconMessageSquare,
  IconSend,
  IconCheckCircle,
} from "./ContactIcons";

const RATING_LABELS = {
  1: "Poor - Needs Work",
  2: "Fair - OK Experience",
  3: "Good - Enjoyed It",
  4: "Very Good - Really Liked It!",
  5: "Outstanding - Loved Everything! 🌟",
};

export default function ContactForm({ onSubmitSuccess }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      if (user.name && !name) setName(user.name);
      if (user.email && !email) setEmail(user.email);
    }
  }, [user]);

  const handleStarClick = (selectedStar) => {
    // Click same star to unselect, or set rating
    if (rating === selectedStar) {
      setRating(0);
    } else {
      setRating(selectedStar);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!comments.trim()) {
      setErrorMessage("Please share your comments or feedback.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        rating: rating,
        comments: comments.trim(),
        submittedAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const res = await submitFeedback(payload);

      setIsSubmitting(false);
      setSubmittedData(res || payload);
      if (onSubmitSuccess) {
        onSubmitSuccess(res || payload);
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setRating(0);
    setComments("");
    setSubmittedData(null);
    setErrorMessage("");
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
          ✉️
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-pixelify-sans text-gray-900">
            Send Us a Message
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-mono">
            We value your feedback and respond to all inquiries promptly.
          </p>
        </div>
      </div>

      {submittedData ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-fade-in">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
            <IconCheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-emerald-900 font-pixelify-sans">
              Thank You, {submittedData.name}!
            </h4>
            <p className="text-sm text-emerald-700 font-pixelify-sans mt-1">
              Your message and experience rating have been received. We appreciate your feedback!
            </p>
          </div>

          <div className="bg-white/80 rounded-xl p-4 text-left text-xs font-pixelify-sans text-gray-700 space-y-2 border border-emerald-100">
            <div>
              <span className="font-bold text-gray-900">Email:</span> {submittedData.email}
            </div>
            {submittedData.rating > 0 && (
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">Your Rating:</span>
                <span className="text-amber-500 font-bold flex items-center ml-1">
                  {"★".repeat(submittedData.rating)}
                  {"☆".repeat(5 - submittedData.rating)}
                </span>
                <span className="text-gray-500 ml-1">({submittedData.rating}/5)</span>
              </div>
            )}
            <div>
              <span className="font-bold text-gray-900">Comments:</span> "{submittedData.comments}"
            </div>
          </div>

          <button
            onClick={handleResetForm}
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold font-pixelify-sans hover:bg-emerald-700 transition-colors shadow-sm text-sm"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold font-pixelify-sans">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Name Input */}
          <div>
            <label className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-2">
              Your Name <span className="text-amber-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <IconUser className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-2">
              Your Email Address <span className="text-amber-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <IconMail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                required
              />
            </div>
          </div>

          {/* Rate Your Experience with Stars Input */}
          <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4 sm:p-5">
            <label className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-800 mb-2">
              Rate Your Experience
            </label>
            <p className="text-xs text-gray-500 font-mono mb-3">
              How was your recent visit or food delivery experience?
            </p>

            <div className="flex items-center gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const isFilled = starIndex <= displayRating;
                return (
                  <button
                    key={starIndex}
                    type="button"
                    onClick={() => handleStarClick(starIndex)}
                    onMouseEnter={() => setHoverRating(starIndex)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 rounded-lg hover:scale-125 focus:outline-none transition-all duration-200"
                    title={`Rate ${starIndex} out of 5 stars`}
                    aria-label={`Rate ${starIndex} out of 5 stars`}
                  >
                    <IconStar
                      filled={isFilled}
                      className={`w-7 h-7 sm:w-9 sm:h-9 ${
                        isFilled
                          ? "text-amber-400 drop-shadow-sm"
                          : "text-gray-300 hover:text-amber-300"
                      } transition-colors`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Rating Label Indicator */}
            <div className="mt-2.5 text-xs font-bold font-pixelify-sans text-amber-800 min-h-5">
              {displayRating > 0 ? (
                <span>
                  {displayRating}/5 Stars — {RATING_LABELS[displayRating]}
                </span>
              ) : (
                <span className="text-gray-400 font-normal">
                  Tap stars to select your rating (optional)
                </span>
              )}
            </div>
          </div>

          {/* Comments Input */}
          <div>
            <label className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-2">
              Comments & Suggestions <span className="text-amber-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-3.5 pointer-events-none text-gray-400">
                <IconMessageSquare className="w-5 h-5" />
              </div>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
                placeholder="Share your thoughts, suggestions, inquiries or table feedback..."
                className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all resize-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-400 hover:bg-amber-500 active:scale-[0.98] text-gray-900 font-bold font-pixelify-sans text-base sm:text-lg py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <IconSend className="w-5 h-5" />
                <span>Submit Feedback & Contact</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
