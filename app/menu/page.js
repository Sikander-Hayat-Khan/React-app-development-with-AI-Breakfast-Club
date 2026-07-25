"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const BREAKFAST_DATA = [
  {
    category: "Sweet Breakfast",
    id: "sweet-breakfast",
    items: [
      {
        id: "sb-pancake",
        name: "Pancake",
        price: 300,
        image: "/menu-items/breakfast/hot-breakfast/pancake.png",
      },
      {
        id: "sb-crepes",
        name: "Crepes",
        price: 300,
        image: "/menu-items/breakfast/hot-breakfast/crepes.png",
      },
      {
        id: "sb-waffle",
        name: "Waffle",
        price: 300,
        image: "/menu-items/breakfast/hot-breakfast/waffle.png",
      },
      {
        id: "sb-french-toast",
        name: "French Toast",
        price: 300,
        image: "/menu-items/breakfast/hot-breakfast/frenchtoast.png",
      },
    ],
  },
  {
    category: "Savory Breakfast",
    id: "savory-breakfast",
    items: [
      {
        id: "sav-eggs-toast",
        name: "Eggs and Toast",
        price: 250,
        image: "/menu-items/breakfast/savory/egg_and_toast.png",
      },
      {
        id: "sav-sandwich",
        name: "Breakfast Sandwich",
        price: 350,
        image: "/menu-items/breakfast/savory/breakfast_sandwich.png",
      },
      {
        id: "sav-panini",
        name: "Panini",
        price: 200,
        image: "/menu-items/breakfast/savory/panini.png",
      },
      {
        id: "sav-veg-omelette",
        name: "Vegetable Omlette Toast",
        price: 320,
        image: "/menu-items/breakfast/savory/vegetable_omelette_toast.png",
      },
      {
        id: "sav-burrito",
        name: "Breakfast Burrito",
        price: 380,
        image: "/menu-items/breakfast/savory/breakfast_burrito.png",
      },
    ],
  },
  {
    category: "Healthy",
    id: "healthy-breakfast",
    items: [
      {
        id: "h-oatmeal",
        name: "Oat Meal",
        price: 250,
        image: "/menu-items/breakfast/healthy/oatmeal.png",
      },
      {
        id: "h-salad-bowl",
        name: "Salad Bowl",
        price: 320,
        image: "/menu-items/breakfast/healthy/salad_bowl.png",
      },
      {
        id: "h-caprese",
        name: "Caprese Salad",
        price: 300,
        image: "/menu-items/breakfast/healthy/caprese_salad.png",
      },
      {
        id: "h-spinach-omlete",
        name: "Spinach Omlette",
        price: 280,
        image: "/menu-items/breakfast/healthy/spinach_omlete.png",
      },
    ],
  },
];

export default function Menu() {
  const { toggleFavorite, isFavorite } = useAuth();
  const [activeCategory, setActiveCategory] = useState("Breakfast");
  const [activeSubCategory, setActiveSubCategory] = useState("Sweet Breakfast");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("breakfast_club_cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart", e);
    }
    setIsCartLoaded(true);
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (!isCartLoaded) return;
    try {
      localStorage.setItem("breakfast_club_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cartItems, isCartLoaded]);

  const categories = [
    { name: "Breakfast", banner: "/banner-images/breakfast.png" },
    { name: "Desserts", banner: "/banner-images/desserts.png" },
    { name: "Beverages", banner: "/banner-images/beverages.png" },
  ];

  // Get active banner image path based on selected category
  const activeBanner =
    categories.find((cat) => cat.name === activeCategory)?.banner ||
    "/banner-images/breakfast.png";

  // Scrollspy effect to highlight sub-category button based on current scroll position
  useEffect(() => {
    if (activeCategory !== "Breakfast") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const group of BREAKFAST_DATA) {
        const el = document.getElementById(group.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSubCategory(group.category);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCategory]);

  // Smooth scroll handler to scroll down to target breakfast section
  const handleSubCategoryClick = (categoryName, id) => {
    setActiveSubCategory(categoryName);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -152; // Offset to clear sticky header, main sub-navbar, and sub-category bar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Cart operations
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });

    // Show temporary toast notification
    setToastMessage(`Added "${item.name}" to basket!`);
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="bg-white min-h-screen pb-16 text-gray-800 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl font-bold font-pixelify-sans text-lg flex items-center gap-3 border border-gray-700 animate-bounce">
          <span className="text-xl">🛒</span>
          {toastMessage}
        </div>
      )}

      {/* Menu Heading Section */}
      <div className="w-11/12 max-w-7xl mx-auto pt-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 font-pixelify-sans text-left">
          Menu
        </h1>
        {/* Horizontal Bar */}
        <div className="w-full border-b-2 border-yellow-400 mt-3 mb-6" />
      </div>

      {/* Sticky Main Sub-Navbar */}
      <div className="sticky top-19.5 z-40 bg-white/95 backdrop-blur-sm py-2.5 sm:py-3.5 border-b border-gray-100 shadow-sm">
        <div className="w-11/12 max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
          {/* Navigation Categories */}
          <nav className="flex-1 flex items-center justify-between sm:justify-start gap-1 sm:gap-3 md:gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5">
            {categories.map((category) => {
              const isActive = activeCategory === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  style={
                    isActive
                      ? { backgroundColor: "rgb(178, 90, 104)" }
                      : undefined
                  }
                  className={`shrink-0 sm:flex-1 text-center text-xs sm:text-base md:text-xl font-bold font-pixelify-sans transition-all duration-200 cursor-pointer py-1.5 px-2.5 sm:py-2 sm:px-4 rounded-xl no-underline whitespace-nowrap ${
                    isActive
                      ? "text-white shadow-md scale-102"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </nav>

          {/* Cart Icon (Opens Slide-in Cart Drawer) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 hover:scale-105 transition-transform cursor-pointer group shrink-0 relative pl-1 sm:pl-2"
            title="Open Cart"
          >
            <Image
              src={
                totalCartCount === 0
                  ? "/icons/cart_empty.png"
                  : "/icons/cart.png"
              }
              alt={totalCartCount === 0 ? "Empty Cart" : "Full Cart"}
              width={42}
              height={42}
              className="h-8 sm:h-10 w-auto object-contain"
            />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm font-mono">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Banner Image Section */}
      <div className="w-11/12 max-w-7xl mx-auto my-8">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md">
          <Image
            src={activeBanner}
            alt={`${activeCategory} Banner`}
            width={1200}
            height={400}
            priority
            className="w-full h-auto object-cover transition-opacity duration-300"
          />
        </div>
      </div>

      {/* Sticky Breakfast Sub-Category Buttons Bar */}
      {activeCategory === "Breakfast" && (
        <div className="sticky top-37 z-30 bg-white/95 backdrop-blur-sm py-2 sm:py-3 mb-8 border-b border-gray-100 shadow-sm">
          <div className="w-11/12 max-w-7xl mx-auto flex items-center justify-start gap-1.5 sm:gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5">
            {BREAKFAST_DATA.map((group) => {
              const isActive = activeSubCategory === group.category;
              return (
                <button
                  key={group.id}
                  onClick={() => handleSubCategoryClick(group.category, group.id)}
                  style={
                    isActive
                      ? { backgroundColor: "rgb(178, 90, 104)" }
                      : undefined
                  }
                  className={`shrink-0 text-center text-xs sm:text-sm font-bold font-pixelify-sans transition-all duration-200 cursor-pointer py-1.5 px-3 rounded-xl whitespace-nowrap ${
                    isActive
                      ? "text-white shadow-md scale-102"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {group.category}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="w-11/12 max-w-7xl mx-auto">
        {activeCategory === "Breakfast" ? (
          /* Breakfast Categories & Cards */
          <div className="space-y-14">
            {BREAKFAST_DATA.map((group) => (
              <section key={group.id} id={group.id} className="space-y-6 pt-2">
                {/* Category Title with Yellow Accent Line */}
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl sm:text-3xl font-bold font-pixelify-sans text-gray-900">
                    {group.category}
                  </h2>
                  <div className="flex-1 h-0.5 bg-yellow-400/60 rounded-full" />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#f1cacf] hover:bg-[#e8b3b8] transition-all duration-300 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md border border-[#e5b3b9] group cursor-pointer"
                    >
                      {/* Item Image Container */}
                      <div className="relative w-full h-28 sm:h-44 md:h-48 mb-2 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden bg-white/40 p-2 sm:p-3 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item);
                            setToastMessage(
                              isFavorite(item.id)
                                ? `Removed "${item.name}" from favorites`
                                : `Added "${item.name}" to favorites! ❤️`
                            );
                            setTimeout(() => setToastMessage(""), 2500);
                          }}
                          className={`absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs transition-transform active:scale-125 cursor-pointer shadow-sm ${
                            isFavorite(item.id)
                              ? "bg-red-500 text-white border border-red-400 scale-105"
                              : "bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 border border-gray-200"
                          }`}
                          title={isFavorite(item.id) ? "Remove from Favorites" : "Save to Favorites"}
                        >
                          ❤️
                        </button>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                        />
                      </div>

                      {/* Item Title & Price */}
                      <div className="mb-2 sm:mb-4 flex flex-col justify-between grow">
                        <h3 className="text-sm sm:text-xl font-bold text-gray-900 font-pixelify-sans mb-0.5 sm:mb-1 line-clamp-2 sm:line-clamp-none leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-lg font-bold text-gray-800 font-pixelify-sans">
                          Rs. {item.price}
                        </p>
                      </div>

                      {/* Add to Basket Button */}
                      <button
                        onClick={() => addToCart(item)}
                        style={{ backgroundColor: "rgb(178, 90, 104)" }}
                        className="w-full py-1.5 sm:py-2.5 px-2 sm:px-4 text-black font-bold font-pixelify-sans text-xs sm:text-base md:text-lg rounded-lg sm:rounded-xl transition-all duration-200 hover:brightness-105 active:scale-95 shadow-sm flex items-center justify-center gap-1 sm:gap-2 cursor-pointer"
                      >
                        Add to basket
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* Placeholder for Desserts and Beverages */
          <div className="py-16 text-center bg-gray-50 rounded-2xl border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold font-pixelify-sans text-gray-800 mb-2">
              {activeCategory} Menu
            </h2>
            <p className="text-gray-500 font-pixelify-sans">
              Delicious items for {activeCategory} are coming soon!
            </p>
          </div>
        )}
      </div>

      {/* Cart Slide-over Drawer / Card */}
      {/* Backdrop */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300"
        />
      )}

      {/* Drawer Card */}
      <div
        className={`fixed top-4 right-4 bottom-4 h-[calc(100vh-2rem)] w-80 sm:w-96 bg-white z-50 shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 ease-in-out flex flex-col ${
          isCartOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-[calc(100%+3rem)] opacity-0 pointer-events-none"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={
                totalCartCount === 0
                  ? "/icons/cart_empty.png"
                  : "/icons/cart.png"
              }
              alt="Cart Icon"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <h2 className="text-2xl font-bold font-pixelify-sans text-gray-900">
              Your Cart <span className="font-mono">({totalCartCount})</span>
            </h2>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close cart"
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

        {/* Horizontal Yellow Divider */}
        <div className="w-full border-b-2 border-yellow-400" />

        {/* Drawer Content Body */}
        <div className="flex-1 p-6 flex flex-col overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="my-auto flex flex-col items-center justify-center text-center gap-4 text-gray-500">
              <Image
                src="/icons/cart_empty.png"
                alt="Empty Cart"
                width={80}
                height={80}
                className="w-20 h-auto opacity-70 mb-2"
              />
              <p className="text-xl font-bold text-gray-800 font-pixelify-sans">
                Your cart is empty!
              </p>
              <p className="text-sm text-gray-500 max-w-xs">
                Looks like you haven't added anything to your cart yet. Explore our menu to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="relative w-16 h-16 rounded-lg bg-white p-1 overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 font-pixelify-sans truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 font-mono">
                      Rs. {item.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded bg-gray-200 text-gray-800 font-bold flex items-center justify-center hover:bg-gray-300 text-xs"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-gray-800 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded bg-gray-200 text-gray-800 font-bold flex items-center justify-center hover:bg-gray-300 text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-bold text-gray-900 font-mono">
                      Rs. {item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-500 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-3">
          {cartItems.length > 0 && (
            <div className="flex items-center justify-between font-bold text-lg font-pixelify-sans text-gray-900 pb-2 border-b border-gray-200">
              <span>Total:</span>
              <span className="text-xl font-mono">Rs. {totalCartPrice}</span>
            </div>
          )}
          {cartItems.length > 0 && (
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black text-center font-bold font-pixelify-sans rounded-xl transition-all cursor-pointer text-lg shadow-sm no-underline"
            >
              Checkout
            </Link>
          )}
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-full py-3 bg-[rgb(178,90,104)] text-white font-bold font-pixelify-sans rounded-xl hover:opacity-90 transition-opacity cursor-pointer text-lg shadow-sm"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </main>
  );
}
