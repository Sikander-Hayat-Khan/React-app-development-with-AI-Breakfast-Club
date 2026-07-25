"use client";

import Image from "next/image";

export default function OurHistory() {
  const milestones = [
    {
      year: "2015",
      title: "The First Skillet",
      description: "Opened our doors with just 5 wooden tables, a cast-iron skillet, and a dream to serve the best coffee in town.",
      icon: "☕",
    },
    {
      year: "2018",
      title: "Pancake Fame",
      description: "Our signature golden buttermilk pancakes became a local sensation, drawing food lovers from all across the city.",
      icon: "🥞",
    },
    {
      year: "2021",
      title: "Expanding the Family",
      description: "Added artisanal bakery items, outdoor patio seating, and expanded our cozy breakfast nook to welcome even more guests.",
      icon: "🥖",
    },
    {
      year: "Today",
      title: "Your Daily Morning Stop",
      description: "Serving over 500,000+ happy morning meals while keeping our original home-cooked warmth in every bite.",
      icon: "🍳",
    },
  ];

  return (
    <section className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden mb-12">
      {/* Decorative side accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-bl-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/icons/our-history.svg"
            alt="Our History"
            width={44}
            height={44}
            className="h-11 w-11 object-contain drop-shadow-sm"
          />
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-pixelify-sans">
              Our History
            </h2>
            <p className="text-xs sm:text-sm text-amber-700 font-semibold">
              From a Humble Griddle to Your Favorite Breakfast Sanctuary
            </p>
          </div>
        </div>

        {/* Story Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-7 space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-amber-500 first-letter:mr-2 first-letter:float-left font-pixelify-sans">
              It all started back in 2015 with a simple yet passionate belief: <strong className="text-gray-900">mornings shouldn&apos;t be rushed — they should be savored.</strong> Equipped with just a humble stove, a hand-crafted espresso machine, and a secret family recipe for fluffy buttermilk pancakes, The Breakfast Club opened its doors as a neighborhood sanctuary.
            </p>
            <p>
              Word quickly spread across town about our rich slow-roasted coffee, sizzling bacon, and sunny, welcoming atmosphere. What began as a quiet 5-table coffee nook rapidly transformed into the community&apos;s favorite morning hub — where old friends meet, families gather, and every breakfast feels like a weekend celebration.
            </p>
            <p className="text-amber-800 font-semibold bg-amber-50 p-4 rounded-xl border-l-4 border-amber-400 text-sm">
              &ldquo;We haven&apos;t changed our original promise: fresh ingredients, generous portions, and a warm smile with every single cup.&rdquo;
            </p>
          </div>

          {/* Side Banner / Image Placeholder Card */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-amber-900 text-white p-6 flex flex-col justify-between min-h-70">
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10" />
            <Image
              src="/hero.png"
              alt="Our Kitchen History"
              fill
              className="object-cover opacity-60"
            />
            <div className="relative z-20">
              <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Since 2015
              </span>
              <h3 className="text-xl font-bold font-pixelify-sans mt-3 text-amber-300">
                Sizzling Happiness Every Morning
              </h3>
            </div>
            <div className="relative z-20 border-t border-amber-400/30 pt-3 text-xs text-amber-100 flex justify-between items-center">
              <span>📍 Shimla Hill, Abbottabad.</span>
              <span className="font-bold text-amber-300">10+ Years Strong</span>
            </div>
          </div>
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-amber-200">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="bg-amber-50/60 border border-amber-200/80 p-5 rounded-2xl hover:border-amber-400 hover:bg-amber-100/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-extrabold text-amber-600 font-pixelify-sans bg-amber-200/70 px-2 py-0.5 rounded-md">
                    {item.year}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-base font-pixelify-sans mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
