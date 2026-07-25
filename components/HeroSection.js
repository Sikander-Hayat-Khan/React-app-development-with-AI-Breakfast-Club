"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function HeroSection() {
  const { user } = useAuth();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress from 0 to 1 over first 350px of scroll
      const maxScroll = 350;
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Image scale expands smoothly from 1.0 to 1.25
  const imageScale = 1 + scrollProgress * 0.25;
  // Blur effect increases from 2px to 20px as you scroll
  const blurAmount = 2 + scrollProgress * 18;
  // Card background opacity darkens slightly for better contrast on blur
  const bgOpacity = 0.2 + scrollProgress * 0.3;

  // Container width expands from 91.666% (w-11/12 max-w-7xl) to 100% full viewport width
  const containerWidth = `calc(91.666% + ${scrollProgress * 8.334}%)`;
  const containerMarginTop = `${(1 - scrollProgress) * 2}rem`; // 2rem (32px) -> 0
  const containerBorderRadius = `${(1 - scrollProgress) * 1}rem`; // 1rem (16px) -> 0
  const containerBorderWidth = `${(1 - scrollProgress) * 2}px`; // 2px -> 0

  return (
    <section
      className="relative mx-auto h-125 overflow-hidden border-black shadow-2xl shadow-black/30 transition-all duration-75 ease-out"
      style={{
        width: containerWidth,
        maxWidth: "100%",
        marginTop: containerMarginTop,
        borderRadius: containerBorderRadius,
        borderWidth: containerBorderWidth,
      }}
    >
      {/* Hero Image with Scroll Zoom */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out will-change-transform"
        style={{ transform: `scale(${imageScale})` }}
      >
        <Image
          src="/hero.png"
          alt="The Breakfast Club Hero"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Center Container Overlying the Hero Image with Scroll Blur */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 z-10">
        <div
          className="flex flex-col items-center justify-center text-center text-white max-w-xl p-8 rounded-2xl transition-all duration-75 ease-out border border-white/20 shadow-2xl"
          style={{
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-3 text-yellow-200 font-pixelify-sans drop-shadow-md">
            The Breakfast Club
          </h1>
          <p className="text-lg md:text-xl font-medium mb-6 text-gray-100 font-mono">
            The perfect spot for your next breakfast or brunch!
          </p>

          {user ? (
            <div className="flex flex-col items-center gap-3 animate-fade-in w-full">
              <h2 className="text-2xl sm:text-3xl font-bold font-pixelify-sans text-yellow-300 drop-shadow-md">
                Welcome, {user.name}!
              </h2>
              <div className="flex items-center justify-center gap-4 w-full pt-1">
                <Link
                  href="/menu"
                  className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold font-pixelify-sans px-5 py-2.5 rounded-xl shadow-lg transition-all hover:scale-105 text-sm sm:text-base flex items-center gap-2"
                >
                  <span>Explore Menu</span>
                </Link>
                <Link
                  href="/auth"
                  className="bg-white/20 hover:bg-white/30 text-white font-bold font-pixelify-sans px-5 py-2.5 rounded-xl border border-white/40 transition-all hover:scale-105 text-sm sm:text-base flex items-center gap-2"
                >
                  <span>My Profile ({user.points || 0} pts)</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-6 w-full">
              <Link
                href="/auth?mode=login"
                className="hover:scale-105 transition-transform flex items-center justify-center"
              >
                <img
                  src="/buttons/Login.png"
                  alt="Login"
                  width={140}
                  className="object-contain drop-shadow-lg"
                />
              </Link>
              <Link
                href="/auth?mode=signup"
                className="hover:scale-105 transition-transform flex items-center justify-center"
              >
                <img
                  src="/buttons/Signup.png"
                  alt="Signup"
                  width={140}
                  className="object-contain drop-shadow-lg"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
