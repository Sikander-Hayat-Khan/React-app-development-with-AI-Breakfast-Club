import Image from "next/image";

export default function ContactHeader() {
  return (
    <div className="w-11/12 max-w-7xl mx-auto pt-8">
      {/* Contact Us Main Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 font-pixelify-sans text-left">
        Contact Us
      </h1>
      
      {/* Accent Yellow Bar */}
      <div className="w-full border-b-2 border-yellow-400 mt-3 mb-6" />

      {/* Hero Banner Card */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-md bg-linear-to-r from-[#b25a68] to-[#8d3e4a] text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider">
            We'd Love to Hear From You
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-pixelify-sans leading-tight">
            Get in Touch & Share Your Experience
          </h2>
          <p className="text-white/90 text-sm sm:text-base font-mono leading-relaxed">
            Have questions about our menu, feedback on your recent brunch, or want to host a special private gathering at one of our locations? Send us a message or find our café locations below!
          </p>
        </div>

        <div className="relative w-36 sm:w-44 h-36 sm:h-44 shrink-0">
          <Image
            src="/coffee.png"
            alt="Breakfast Club Coffee & Contact"
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
