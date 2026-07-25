import Image from "next/image";
import Link from "next/link";
import TopDishesCarousel from "./TopDishesCarousel";

export default function TopDishes() {
  return (
    <section className="w-11/12 max-w-7xl mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Half - 40% width */}
        <div className="w-full md:w-[40%] flex flex-col items-start gap-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-pixelify-sans">
            Top Dishes Of The Season
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed font-mono">
            A curated selection of our customer favorites, highlighting our current top dishes. Scroll through to see what's cookin' good lookin'
          </p>
          <div className="mt-2">
            <Link
              href="/menu"
              className="hover:scale-105 transition-transform inline-block"
            >
              <Image
                src="/buttons/menu.png"
                alt="Menu"
                width={150}
                height={50}
                className="h-12 w-auto object-contain cursor-pointer"
              />
            </Link>
          </div>
        </div>

        {/* Right Half - 60% width */}
        <div className="w-full md:w-[60%]">
          <TopDishesCarousel />
        </div>
      </div>
    </section>
  );
}
