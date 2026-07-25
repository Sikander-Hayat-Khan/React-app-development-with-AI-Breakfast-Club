"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const { user, points, placeOrder } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Form State
  const [orderType, setOrderType] = useState("dine-in"); // "dine-in" | "takeaway" | "delivery"
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tableNumber, setTableNumber] = useState("T-03");
  const [address, setAddress] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash"); // "cash" | "card" | "mobile"

  // Points & Rewards State
  const [pointsToRedeem, setPointsToRedeem] = useState(0);

  // Promo Code State
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  // Modal & Validation
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Pre-fill user profile info if logged in
  useEffect(() => {
    if (user) {
      if (user.name && !fullName) setFullName(user.name);
      if (user.email && !email) setEmail(user.email);
      if (user.phone && !phone) setPhone(user.phone);
    }
  }, [user]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("breakfast_club_cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart on checkout page", e);
    }
    setIsLoaded(true);
  }, []);

  // Sync cart edits back to localStorage
  const updateQuantity = (id, delta) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);

    setCartItems(updated);
    try {
      localStorage.setItem("breakfast_club_cart", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update cart", e);
    }
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    try {
      localStorage.setItem("breakfast_club_cart", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to remove item", e);
    }
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const userPoints = points !== undefined ? points : user?.points || 0;
  const pointsDiscountAmount = Math.min(
    subtotal,
    Math.round(pointsToRedeem * 0.5)
  );
  const deliveryFee = orderType === "delivery" ? 150 : 0;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const promoDiscountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalDiscount = promoDiscountAmount + pointsDiscountAmount;
  const grandTotal = Math.max(0, subtotal + deliveryFee + tax - totalDiscount);
  const earnedPoints = Math.floor(grandTotal / 10);

  // Promo code apply
  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError("Please enter a promo code.");
      return;
    }

    if (code === "BREAKFAST10" || code === "WELCOME10") {
      setDiscountPercent(10);
      setPromoSuccess("10% discount applied!");
    } else if (code === "CLUB20") {
      setDiscountPercent(20);
      setPromoSuccess("20% discount applied!");
    } else {
      setPromoError("Invalid promo code. Try BREAKFAST10 or CLUB20.");
    }
  };

  // Handle Order Submit with Firestore saving & points update
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setFormError("Please enter a valid phone number.");
      return;
    }
    if (orderType === "delivery" && !address.trim()) {
      setFormError("Please enter your delivery address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderDetails = {
        orderId: `BC-${Math.floor(10000 + Math.random() * 90000)}`,
        orderType,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        tableNumber: orderType === "dine-in" ? tableNumber : null,
        address: orderType === "delivery" ? address.trim() : null,
        paymentMethod,
        items: [...cartItems],
        subtotal,
        deliveryFee,
        tax,
        discountAmount: totalDiscount,
        pointsRedeemed: pointsToRedeem,
        pointsEarned: earnedPoints,
        grandTotal,
        status: "Preparing",
        estimatedTime: orderType === "dine-in" ? "15-20 mins" : "30-40 mins",
        placedAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const savedOrder = await placeOrder(orderDetails);

      setIsSubmitting(false);
      setOrderSuccess(savedOrder || orderDetails);

      // Clear cart
      setCartItems([]);
      try {
        localStorage.removeItem("breakfast_club_cart");
      } catch (err) {
        console.error("Error clearing cart", err);
      }
    } catch (err) {
      setIsSubmitting(false);
      setFormError("Failed to process order. Please try again.");
    }
  };

  if (!isLoaded) {
    return (
      <main className="bg-white min-h-screen pt-8 pb-16 flex items-center justify-center">
        <div className="text-xl font-bold font-pixelify-sans text-gray-600 animate-pulse">
          Loading checkout...
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen pb-16 text-gray-800 relative">
      {/* Checkout Page Heading */}
      <div className="w-11/12 max-w-7xl mx-auto pt-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 font-pixelify-sans text-left">
            Checkout
          </h1>
          <Link
            href="/menu"
            className="text-[#b25a68] hover:underline font-bold font-pixelify-sans text-lg flex items-center gap-1"
          >
            ← Back to Menu
          </Link>
        </div>
        {/* Horizontal Yellow Bar */}
        <div className="w-full border-b-2 border-yellow-400 mt-3 mb-6" />
      </div>

      {/* Hero Banner Section */}
      <div className="w-11/12 max-w-7xl mx-auto mb-8">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-md bg-linear-to-r from-[#b25a68] to-[#8d3e4a] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold font-pixelify-sans uppercase tracking-wider">
              Finalize Your Breakfast
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-pixelify-sans leading-tight">
              Almost Ready to Feast!
            </h2>
            <p className="text-white/90 text-sm sm:text-base font-mono">
              Provide your details, choose your order mode, and we’ll get your delicious meal prepared hot & fresh.
            </p>
          </div>
          <div className="relative w-28 h-28 shrink-0">
            <Image
              src="/banner-images/breakfast.png"
              alt="Breakfast Banner"
              fill
              className="object-cover rounded-2xl shadow-inner border border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-11/12 max-w-7xl mx-auto">
        {cartItems.length === 0 && !orderSuccess ? (
          /* Empty Cart View */
          <div className="py-20 px-6 text-center bg-gray-50 rounded-3xl border border-gray-200 space-y-5 max-w-xl mx-auto my-12 shadow-xs">
            <div className="w-24 h-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-4xl">
              🍳
            </div>
            <h2 className="text-3xl font-bold font-pixelify-sans text-gray-900">
              Your Basket is Empty
            </h2>
            <p className="text-gray-600 font-pixelify-sans text-base max-w-md mx-auto">
              You haven't added any breakfast delicacies to your cart yet. Explore our delicious menu items and add them to checkout!
            </p>
            <Link
              href="/menu"
              className="inline-block py-3 px-8 bg-yellow-400 hover:bg-yellow-500 text-black font-bold font-pixelify-sans text-xl rounded-2xl shadow-md transition-transform hover:scale-105 cursor-pointer no-underline"
            >
              Explore Menu 🥐
            </Link>
          </div>
        ) : (
          /* Checkout Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form & Customer Details (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Order Type Selector */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg font-pixelify-sans">
                    1
                  </span>
                  <h3 className="text-2xl font-bold font-pixelify-sans text-gray-900">
                    Order Type
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOrderType("dine-in")}
                    className={`py-3.5 px-3 rounded-2xl font-bold font-pixelify-sans text-sm sm:text-base flex flex-col sm:flex-row items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                      orderType === "dine-in"
                        ? "border-[#b25a68] bg-[#f1cacf]/40 text-[#b25a68] shadow-xs"
                        : "border-gray-200 text-gray-700 hover:border-gray-300 bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">🍽️</span>
                    <span>Dine-In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType("takeaway")}
                    className={`py-3.5 px-3 rounded-2xl font-bold font-pixelify-sans text-sm sm:text-base flex flex-col sm:flex-row items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                      orderType === "takeaway"
                        ? "border-[#b25a68] bg-[#f1cacf]/40 text-[#b25a68] shadow-xs"
                        : "border-gray-200 text-gray-700 hover:border-gray-300 bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">📦</span>
                    <span>Takeaway</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType("delivery")}
                    className={`py-3.5 px-3 rounded-2xl font-bold font-pixelify-sans text-sm sm:text-base flex flex-col sm:flex-row items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                      orderType === "delivery"
                        ? "border-[#b25a68] bg-[#f1cacf]/40 text-[#b25a68] shadow-xs"
                        : "border-gray-200 text-gray-700 hover:border-gray-300 bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">🛵</span>
                    <span>Delivery</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Customer Details */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg font-pixelify-sans">
                    2
                  </span>
                  <h3 className="text-2xl font-bold font-pixelify-sans text-gray-900">
                    Customer Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold font-mono text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border focus:border-[#b25a68] focus:ring-2 focus:ring-[#b25a68]/20 outline-hidden transition-all text-gray-800 font-medium font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold font-mono text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0300-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border focus:border-[#b25a68] focus:ring-2 focus:ring-[#b25a68]/20 outline-hidden transition-all text-gray-800 font-medium font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold font-mono text-gray-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. sarah@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border focus:border-[#b25a68] focus:ring-2 focus:ring-[#b25a68]/20 outline-hidden transition-all text-gray-800 font-medium font-mono"
                  />
                </div>

                {orderType === "dine-in" && (
                  <div>
                    <label className="block text-sm font-bold font-mono text-gray-700 mb-1">
                      Select Table Number
                    </label>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border focus:border-[#b25a68] focus:ring-2 focus:ring-[#b25a68]/20 outline-hidden transition-all text-gray-800 font-bold font-mono bg-white cursor-pointer"
                    >
                      <option value="T-01">Table 01 (Indoor Window View)</option>
                      <option value="T-02">Table 02 (Indoor Booth)</option>
                      <option value="T-03">Table 03 (Center Main Hall)</option>
                      <option value="T-04">Table 04 (Patio Garden)</option>
                      <option value="T-05">Table 05 (Patio High Table)</option>
                    </select>
                  </div>
                )}

                {orderType === "delivery" && (
                  <div>
                    <label className="block text-sm font-bold font-mono text-gray-700 mb-1">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Street name, house/building number, landmark..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border focus:border-[#b25a68] focus:ring-2 focus:ring-[#b25a68]/20 outline-hidden transition-all text-gray-800 font-medium font-mono"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold font-mono text-gray-700 mb-1">
                    Special Preparation Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra syrup for pancakes, no onions in omelette..."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border focus:border-[#b25a68] focus:ring-2 focus:ring-[#b25a68]/20 outline-hidden transition-all text-gray-800 font-medium font-mono"
                  />
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg font-pixelify-sans">
                    3
                  </span>
                  <h3 className="text-2xl font-bold font-pixelify-sans text-gray-900">
                    Payment Options
                  </h3>
                </div>

                <div className="space-y-3 pt-2">
                  <label
                    onClick={() => setPaymentMethod("cash")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "cash"
                        ? "border-[#b25a68] bg-[#f1cacf]/30"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💵</span>
                      <div>
                        <p className="font-bold text-gray-900 font-mono text-lg">
                          Cash on Delivery / Pay at Counter
                        </p>
                        <p className="text-xs text-gray-500 font-mono">
                          Pay directly when your order is served or delivered.
                        </p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                      className="accent-[#b25a68] w-5 h-5"
                    />
                  </label>

                  <label
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-[#b25a68] bg-[#f1cacf]/30"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💳</span>
                      <div>
                        <p className="font-bold text-gray-900 font-mono text-lg">
                          Credit / Debit Card
                        </p>
                        <p className="text-xs text-gray-500 font-mono">
                          Visa, MasterCard, or UnionPay accepted.
                        </p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="accent-[#b25a68] w-5 h-5"
                    />
                  </label>

                  <label
                    onClick={() => setPaymentMethod("mobile")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "mobile"
                        ? "border-[#b25a68] bg-[#f1cacf]/30"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <p className="font-bold text-gray-900 font-mono text-lg">
                          Mobile Wallet
                        </p>
                        <p className="text-xs text-gray-500 font-mono">
                          Pay via Easypaisa or JazzCash account.
                        </p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "mobile"}
                      onChange={() => setPaymentMethod("mobile")}
                      className="accent-[#b25a68] w-5 h-5"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Review (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6 sticky top-24">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h3 className="text-2xl font-bold font-pixelify-sans text-gray-900 flex items-center gap-2">
                    <span>🛒</span> Order Summary
                  </h3>
                  <span className="bg-[#b25a68] text-white px-3 py-1 rounded-full text-xs font-bold font-mono">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
                  </span>
                </div>

                {/* Items List */}
                <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100"
                    >
                      <div className="relative w-14 h-14 rounded-xl bg-white p-1 overflow-hidden shrink-0 border border-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 font-mono text-base truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600 font-mono">
                          Rs. {item.price} × {item.quantity}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded bg-gray-200 hover:bg-gray-300 font-bold text-xs flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-gray-800 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded bg-gray-200 hover:bg-gray-300 font-bold text-xs flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold text-gray-900 font-mono text-base">
                          Rs. {item.price * item.quantity}
                        </span>
                        <div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-red-500 hover:underline font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rewards Points Redemption Box */}
                <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-pixelify-sans text-amber-900 flex items-center gap-1">
                      <span>🌟</span>
                      <span>Club Rewards Points</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-lg border border-amber-300">
                      {userPoints} PTS
                    </span>
                  </div>

                  {userPoints > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-gray-700">
                        <span>Redeem points discount:</span>
                        <span className="font-bold text-emerald-700">
                          -Rs. {pointsDiscountAmount}
                        </span>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setPointsToRedeem(0)}
                          className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                            pointsToRedeem === 0
                              ? "bg-gray-900 text-white"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          None
                        </button>
                        {[100, 250, 500].map((pt) => {
                          if (userPoints < pt) return null;
                          return (
                            <button
                              key={pt}
                              type="button"
                              onClick={() => setPointsToRedeem(pt)}
                              className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                                pointsToRedeem === pt
                                  ? "bg-amber-500 text-white shadow-xs"
                                  : "bg-white text-amber-900 border border-amber-200 hover:bg-amber-100"
                              }`}
                            >
                              {pt} pts (-Rs.{pt * 0.5})
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] font-mono text-amber-800">
                      Sign in or complete orders to earn reward points for food discounts!
                    </p>
                  )}
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold font-mono text-gray-600">
                    Promo Code (Try: BREAKFAST10 or CLUB20)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm rounded-xl border focus:border-[#b25a68] outline-hidden uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-900 hover:bg-black text-white font-bold font-mono text-sm rounded-xl cursor-pointer transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-xs text-red-500 font-bold">{promoError}</p>
                  )}
                  {promoSuccess && (
                    <p className="text-xs text-green-600 font-bold">{promoSuccess}</p>
                  )}
                </form>

                {/* Calculation Breakdown */}
                <div className="space-y-2 pt-3 border-t border-gray-200 text-sm font-mono">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">Rs. {subtotal}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-gray-900">
                      {orderType === "delivery" ? `Rs. ${deliveryFee}` : "Free"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>GST Tax (5%)</span>
                    <span className="font-bold text-gray-900">Rs. {tax}</span>
                  </div>

                  {promoDiscountAmount > 0 && (
                    <div className="flex items-center justify-between text-green-600 font-bold">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span>- Rs. {promoDiscountAmount}</span>
                    </div>
                  )}

                  {pointsDiscountAmount > 0 && (
                    <div className="flex items-center justify-between text-amber-700 font-bold">
                      <span>Points Discount ({pointsToRedeem} pts)</span>
                      <span>- Rs. {pointsDiscountAmount}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                    <span>🌟 You'll Earn:</span>
                    <span>+{earnedPoints} Rewards Points</span>
                  </div>

                  <div className="flex items-center justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-300">
                    <span>Total Amount</span>
                    <span className="text-[#b25a68] text-2xl">Rs. {grandTotal}</span>
                  </div>
                </div>

                {/* Validation Error Notice */}
                {formError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold font-pixelify-sans animate-shake">
                    ⚠️ {formError}
                  </div>
                )}

                {/* Submit / Place Order Button */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting || cartItems.length === 0}
                  className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold font-mono text-xl rounded-2xl shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Placing Order... 🍳</span>
                  ) : (
                    <span>Place Order</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Confirmation Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in duration-300 border-2 border-yellow-400 relative">
            <div className="w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl shadow-inner">
              🎉
            </div>

            <div className="space-y-2">
              <span className="inline-block bg-[#f1cacf] text-[#b25a68] px-3 py-1 rounded-full text-xs font-bold font-pixelify-sans uppercase tracking-wider">
                Order Confirmed
              </span>
              <h3 className="text-3xl font-bold font-pixelify-sans text-gray-900">
                Thank You, {orderSuccess.fullName}!
              </h3>
              <p className="text-gray-600 font-mono text-sm">
                Your order <strong className="text-gray-900">{orderSuccess.orderId}</strong> has been received by our kitchen staff.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-left space-y-2 font-pixelify-sans text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Order Mode:</span>
                <span className="font-bold text-gray-800 capitalize">
                  {orderSuccess.orderType}
                </span>
              </div>
              {orderSuccess.tableNumber && (
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Table:</span>
                  <span className="font-bold text-gray-800">
                    {orderSuccess.tableNumber}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Estimated Ready Time:</span>
                <span className="font-bold font-mono text-[#b25a68]">
                  {orderSuccess.estimatedTime}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-500">Total Paid:</span>
                <span className="font-bold font-mono text-lg text-gray-900">
                  Rs. {orderSuccess.grandTotal}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/menu"
                className="flex-1 py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold font-pixelify-sans text-lg rounded-xl shadow-sm transition-all no-underline text-center"
              >
                Back to Menu 🥐
              </Link>
              <Link
                href="/"
                className="flex-1 py-3 px-4 bg-gray-900 hover:bg-black text-white font-bold font-pixelify-sans text-lg rounded-xl transition-all no-underline text-center"
              >
                Home Page 🏠
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
