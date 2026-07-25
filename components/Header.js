"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, points } = useAuth();
  const displayPoints = points !== undefined ? points : user?.points || 0;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Disable body scrolling when the mobile side drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="z-40 sticky top-0 w-full border-b-2 border-yellow-400 px-4 sm:px-8 py-4 flex items-center justify-between bg-white h-19.5">
        {/* Left Header Section */}
        {/* Desktop: Home Icon */}
        <Link
          href="/"
          className="hidden md:flex items-center hover:scale-105 transition-transform"
        >
          <Image
            src="/icons/home.png"
            alt="Home"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
        </Link>

        {/* Mobile: Hamburger Menu Icon */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex md:hidden items-center justify-center p-1 hover:scale-105 transition-transform cursor-pointer"
          aria-label="Open mobile navigation menu"
        >
          <Image
            src="/icons/menu.png"
            alt="Menu"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
        </button>

        {/* Middle: Navigation Image Buttons (Desktop) */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link href="/menu" className="hover:scale-105 transition-transform">
            <Image
              src="/buttons/menu.png"
              alt="Menu"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <Link href="/reservation" className="hover:scale-105 transition-transform">
            <Image
              src="/buttons/reservations.png"
              alt="Reservation"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <Link href="/contact" className="hover:scale-105 transition-transform">
            <Image
              src="/buttons/contactus.png"
              alt="Contact Us"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <Link href="/review" className="hover:scale-105 transition-transform">
            <Image
              src="/buttons/reviews.png"
              alt="Reviews"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <Link href="/about" className="hover:scale-105 transition-transform">
            <Image
              src="/buttons/aboutus.png"
              alt="About Us"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
        </nav>

        {/* Right: Auth Profile / Points Badge & Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-2xl transition-all cursor-pointer shadow-xs"
            title={user ? `Logged in as ${user.name}` : "Sign In / Join Club"}
          >
            <div className="w-7 h-7 rounded-xl bg-amber-400 text-gray-900 font-bold font-pixelify-sans text-xs flex items-center justify-center border border-amber-300">
              {user?.name ? user.name.charAt(0).toUpperCase() : "🍳"}
            </div>
            <div className="hidden sm:flex flex-col text-left font-pixelify-sans">
              <span className="text-xs font-bold text-gray-900 truncate max-w-24">
                {user?.name ? user.name.split(" ")[0] : "Sign In"}
              </span>
              {user ? (
                <span className="text-[10px] text-amber-700 font-mono font-bold">
                  🌟 {displayPoints} pts
                </span>
              ) : (
                <span className="text-[10px] text-amber-700 font-mono font-bold">
                  +500 bonus
                </span>
              )}
            </div>
          </Link>

          <Link href="/" className="flex items-center hover:scale-105 transition-transform">
            <Image
              src="/breakfast_club_logo.png"
              alt="Breakfast Club Logo"
              width={140}
              height={45}
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      {/* Mobile Side Navigation Drawer */}
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Side Menu Card */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 sm:w-80 bg-white z-60 shadow-2xl transition-all duration-300 ease-in-out flex flex-col p-6 pb-16 sm:pb-20 overflow-y-auto border-r-2 border-yellow-400 ${
          isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Drawer Header (Logo & Close Button) */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <Image
              src="/breakfast_club_logo.png"
              alt="Breakfast Club Logo"
              width={150}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close navigation menu"
          >
            <Image
              src="/icons/cross.png"
              alt="Close"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          </button>
        </div>

        {/* Profile / Sign In Box */}
        <div className="my-5">
          <Link
            href="/auth"
            onClick={closeMenu}
            className="flex items-center gap-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 p-3.5 rounded-2xl transition-all shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-gray-900 font-bold font-pixelify-sans text-base flex items-center justify-center border border-amber-300 shadow-xs shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : "🍳"}
            </div>
            <div className="flex flex-col text-left font-pixelify-sans grow">
              <span className="text-sm font-bold text-gray-900 truncate">
                {user?.name ? user.name : "Sign In / Join Club"}
              </span>
              {user ? (
                <span className="text-xs text-amber-700 font-mono font-bold">
                  🌟 {displayPoints} Reward Points
                </span>
              ) : (
                <span className="text-xs text-amber-700 font-mono font-bold">
                  🎁 Claim +500 Bonus Points
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Navigation Buttons List */}
        <div className="space-y-3.5 flex-1 flex flex-col items-center w-full">
          <p className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider px-1 text-center">
            Explore Breakfast Club
          </p>

          {/* Home Button */}
          <Link
            href="/"
            onClick={closeMenu}
            className="w-44 h-11 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="w-full h-full bg-amber-400 hover:bg-amber-500 border border-amber-500 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors">
              <Image
                src="/icons/home.png"
                alt="Home"
                width={24}
                height={24}
                className="h-5 w-5 object-contain"
              />
              <span className="font-pixelify-sans font-bold text-sm text-gray-900">
                Home
              </span>
            </div>
          </Link>

          {/* Menu Button */}
          <Link
            href="/menu"
            onClick={closeMenu}
            className="w-44 h-11 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            <Image
              src="/buttons/menu.png"
              alt="Menu"
              width={176}
              height={44}
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Reservation Button */}
          <Link
            href="/reservation"
            onClick={closeMenu}
            className="w-44 h-11 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            <Image
              src="/buttons/reservations.png"
              alt="Reservation"
              width={176}
              height={44}
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Contact Us Button */}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="w-44 h-11 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            <Image
              src="/buttons/contactus.png"
              alt="Contact Us"
              width={176}
              height={44}
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Reviews Button */}
          <Link
            href="/review"
            onClick={closeMenu}
            className="w-44 h-11 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            <Image
              src="/buttons/reviews.png"
              alt="Reviews"
              width={176}
              height={44}
              className="w-full h-full object-contain"
            />
          </Link>

          {/* About Us Button */}
          <Link
            href="/about"
            onClick={closeMenu}
            className="w-44 h-11 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            <Image
              src="/buttons/aboutus.png"
              alt="About Us"
              width={176}
              height={44}
              className="w-full h-full object-contain"
            />
          </Link>
        </div>

        {/* Footer Note in Drawer */}
        <div className="pt-6 mt-4 border-t border-gray-100 text-center font-mono text-[11px] text-gray-400">
          The Breakfast Club 🥞 <br />
          Fresh & Cozy Morning Vibes
        </div>
      </aside>
    </>
  );
}
