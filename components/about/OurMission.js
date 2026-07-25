"use client";

export default function OurMission() {
  const missionPillars = [
    {
      icon: "🌾",
      title: "Farm-Fresh Ingredients",
      description: "We partner with local farms to bring organic eggs, ripe avocados, and seasonal fruits straight to your plate daily.",
      badge: "Pure & Local",
    },
    {
      icon: "☕",
      title: "Artisanal Coffee & Brews",
      description: "Every cup is roasted to perfection and brewed by passionate baristas who treat coffee like an art form.",
      badge: "Hand-Crafted",
    },
    {
      icon: "💖",
      title: "Cozy & Inclusive Vibe",
      description: "Creating a welcoming morning atmosphere where every guest feels cherished, relaxed, and right at home.",
      badge: "Warm Hospitality",
    },
    {
      icon: "🌱",
      title: "Eco-Friendly Sourcing",
      description: "Committed to sustainable packaging, zero food waste initiatives, and eco-conscious kitchen practices.",
      badge: "Sustainable",
    },
  ];

  const cheesyPuns = [
    { pun: "We bacon people happy!", emoji: "🥓" },
    { pun: "You're a pancake-tastic guest!", emoji: "🥞" },
    { pun: "Don't worry, be egg-stra!", emoji: "🍳" },
    { pun: "You mean a waffle lot to us!", emoji: "🧇" },
  ];

  return (
    <section className="bg-linear-to-b from-amber-900 to-gray-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden mb-12 border-2 border-amber-400/40">
      {/* Decorative Glow */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-amber-400/20 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-400/30">
            🎯 What Drives Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-amber-400 font-pixelify-sans">
            Our Mission
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            To brighten every morning by serving mouthwatering gourmet food, handcrafted coffee, and genuine warmth that fuels your day with joy.
          </p>
        </div>

        {/* Mission Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {missionPillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-gray-800/80 border border-amber-400/20 p-6 rounded-2xl hover:border-amber-400 hover:bg-gray-800 transition-all duration-300 flex flex-col justify-between group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg font-pixelify-sans mb-2 group-hover:text-amber-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cheesy Food Line Showcase Box */}
        <div className="bg-amber-400/10 border border-amber-400/30 p-6 rounded-2xl mt-8">
          <div className="text-center mb-4">
            <h4 className="text-amber-300 font-pixelify-sans text-lg font-bold">
              🧀 Daily Cheesy Slice of Smile 🧀
            </h4>
            <p className="text-gray-300 text-xs">
              Because a good meal should always come with a side of laughter!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cheesyPuns.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-900/90 border border-amber-400/20 p-3 rounded-xl text-center hover:scale-105 transition-transform"
              >
                <div className="text-2xl mb-1">{item.emoji}</div>
                <p className="text-xs font-bold text-amber-200 font-pixelify-sans">
                  &ldquo;{item.pun}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
