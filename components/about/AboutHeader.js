"use client";

export default function AboutHeader() {
  return (
    <div className="relative bg-linear-to-b from-amber-50/80 via-amber-100/40 to-white pt-10 pb-8 px-4 sm:px-6 rounded-3xl border-2 border-amber-300/60 shadow-sm overflow-hidden mb-12">
      {/* Decorative Background Accents */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-200/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase shadow-xs">
          <span></span> Welcome to The Breakfast Club <span></span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 font-pixelify-sans tracking-tight leading-tight">
          About <span className="text-amber-500 underline decoration-yellow-400 decoration-wavy underline-offset-8">Us</span>
        </h1>

        {/* Cheesy Line for Food */}
        <div className="mt-6 bg-white/90 backdrop-blur-sm border-2 border-amber-400 p-6 sm:p-8 rounded-2xl shadow-md max-w-2xl mx-auto transform hover:-translate-y-0.5 transition-all">
          <p className="text-lg sm:text-xl font-bold text-amber-900 italic font-pixelify-sans leading-relaxed">
            &ldquo;We&apos;re <span className="text-amber-600 underline">egg-stremely</span> passionate about making every morning <span className="text-amber-600 underline">egg-traordinary</span> — because life is always <span className="text-amber-600 underline">butter</span> when we&apos;re breakfasting together, and you <span className="text-amber-600 underline">gouda</span> start your day with a smile!&rdquo;
          </p>
          <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-amber-700">
            — The Breakfast Club Philosophy
          </div>
        </div>
      </div>
    </div>
  );
}
