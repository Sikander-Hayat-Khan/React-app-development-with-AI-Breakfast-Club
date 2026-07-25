import Link from "next/link";
import Image from "next/image";

export default function AuthHeader() {
  return (
    <div className="w-full bg-linear-to-b from-amber-50 to-white pt-8 pb-6 border-b border-amber-100/60 mb-8">
      <div className="w-11/12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400/20 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wide">
              THE BREAKFAST CLUB MEMBER PORTAL
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-pixelify-sans text-gray-900 tracking-tight">
            Welcome to <span className="text-amber-500 underline decoration-amber-300 decoration-wavy">Breakfast Club</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-mono mt-1">
            Sign in or register to unlock exclusive rewards, save favorite dishes & book tables instantly.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 bg-white hover:bg-amber-50 text-gray-800 border-2 border-gray-200 hover:border-amber-400 px-4 py-2 rounded-2xl shadow-sm text-xs sm:text-sm font-bold font-pixelify-sans transition-all duration-200 group"
        >
          <Image
            src="/icons/home.png"
            alt="Home"
            width={20}
            height={20}
            className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
          />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
