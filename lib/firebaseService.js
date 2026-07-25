// lib/firebaseService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ref,
  set,
  get,
  update,
  child,
} from "firebase/database";
import { auth, db } from "./firebase";

// Local storage key helper for offline/resilient sync
const LOCAL_USER_KEY = "breakfast_club_user";
const LOCAL_FAVORITES_KEY = "breakfast_club_favorites";
const LOCAL_ORDERS_KEY = "breakfast_club_orders";

/**
 * Register a new user in Firebase Auth & Realtime Database (`users/{uid}`)
 */
export async function signUpUser({ fullName, email, password, phone, favoriteItem }) {
  const initialUserData = {
    name: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : "",
    points: 500, // 500 Bonus Sign-up Points
    memberSince: new Date().getFullYear().toString(),
    favoriteItem: favoriteItem || "French Toast 🥞",
    avatarColor: "bg-amber-500",
    role: "Breakfast Club VIP Member 🌟",
    favorites: [],
    createdAt: new Date().toISOString(),
  };

  const isRealFirebaseConfigured =
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("DemoKey");

  if (auth && db && isRealFirebaseConfigured) {
    try {
      console.log("⚡ Attempting Firebase Auth signup for:", email);

      // 1. Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;
      console.log("✅ Firebase Auth User created. UID:", user.uid);

      const userDoc = {
        ...initialUserData,
        uid: user.uid,
      };

      // 2. Store in Firebase Realtime Database under node `users/{uid}`
      console.log("⚡ Writing user profile to Realtime Database path `users/" + user.uid + "`...");
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, userDoc);
      console.log("✅ User profile successfully written to Firebase Realtime Database!");

      // Save locally for active session
      saveLocalUser(userDoc);
      return { success: true, user: userDoc };
    } catch (error) {
      console.error("❌ Firebase Signup Error:", error.code, error.message);

      let message = error.message;
      if (error.code === "auth/email-already-in-use") {
        message = "This email address is already registered. Please sign in instead.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.code === "auth/operation-not-allowed") {
        message = "Email/Password Sign-in is disabled. Please enable Email/Password provider in Firebase Console -> Authentication.";
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      } else if (error.code === "auth/invalid-api-key" || error.code === "auth/api-key-not-valid") {
        message = "Invalid Firebase API key in .env.local. Please check your Firebase Console keys.";
      }

      return { success: false, error: message, code: error.code };
    }
  }

  // Fallback mode if Firebase credentials are demo/placeholder
  console.warn("⚠️ Running in Standalone Demo Mode (Firebase API Key is placeholder).");
  const fallbackUser = {
    ...initialUserData,
    uid: `user_${Date.now()}`,
  };
  saveLocalUser(fallbackUser);
  return { success: true, user: fallbackUser };
}

/**
 * Sign in existing user with Firebase Auth & Realtime Database lookup
 */
export async function signInUser(email, password) {
  const isRealFirebaseConfigured =
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("DemoKey");

  if (auth && db && isRealFirebaseConfigured) {
    try {
      console.log("⚡ Attempting Firebase login for:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const firebaseUser = userCredential.user;

      // Fetch user profile from Realtime Database `users/{uid}`
      const userRef = ref(db, `users/${firebaseUser.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log("✅ Fetched user profile from Realtime Database:", userData);
        saveLocalUser(userData);
        return { success: true, user: userData };
      } else {
        // Create user profile if missing in Realtime Database
        const defaultProfile = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || email.split("@")[0],
          email: firebaseUser.email,
          points: 500,
          memberSince: new Date().getFullYear().toString(),
          role: "Breakfast Club VIP Member 🌟",
          favorites: [],
          createdAt: new Date().toISOString(),
        };
        await set(userRef, defaultProfile);
        saveLocalUser(defaultProfile);
        return { success: true, user: defaultProfile };
      }
    } catch (error) {
      console.error("❌ Firebase Auth Login Error:", error.code, error.message);
      let message = error.message;
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        message = "Invalid email or password. Please check your credentials.";
      }
      return { success: false, error: message, code: error.code };
    }
  }

  // Local storage fallback lookup
  const localUser = getLocalUser();
  if (localUser && localUser.email.toLowerCase() === email.trim().toLowerCase()) {
    return { success: true, user: localUser };
  }

  const fallbackUser = {
    uid: `user_${Date.now()}`,
    name: email.split("@")[0].toUpperCase() || "Club Member",
    email: email.trim(),
    points: 500,
    memberSince: "2026",
    role: "Breakfast Club VIP Member 🌟",
    favorites: [],
    createdAt: new Date().toISOString(),
  };
  saveLocalUser(fallbackUser);
  return { success: true, user: fallbackUser };
}

/**
 * Logout current user
 */
export async function logoutUser() {
  try {
    if (auth) {
      await signOut(auth);
    }
  } catch (e) {
    console.warn("Firebase signOut notification", e);
  }
  clearLocalUser();
  return { success: true };
}

/**
 * Toggle Food Item in User's Favorites in Realtime Database (`users/{uid}/favorites`)
 */
export async function toggleFavorite(userId, foodItem) {
  const currentLocalFavorites = getLocalFavorites();
  const exists = currentLocalFavorites.some((item) => item.id === foodItem.id);
  const updatedFavorites = exists
    ? currentLocalFavorites.filter((item) => item.id !== foodItem.id)
    : [...currentLocalFavorites, foodItem];

  saveLocalFavorites(updatedFavorites);

  // Sync with logged in user state
  const currentUser = getLocalUser();
  if (currentUser) {
    currentUser.favorites = updatedFavorites;
    saveLocalUser(currentUser);
  }

  try {
    if (db && userId && !userId.startsWith("user_")) {
      const favRef = ref(db, `users/${userId}/favorites`);
      await set(favRef, updatedFavorites);
      console.log("✅ Updated favorites in Realtime Database for user:", userId);
    }
  } catch (e) {
    console.warn("Realtime Database toggle favorite note:", e.message);
  }

  return updatedFavorites;
}

/**
 * Save Order to Realtime Database (`orders/{orderId}` & `user_orders/{userId}/{orderId}`)
 */
export async function placeFirebaseOrder(orderData) {
  const finalOrder = {
    ...orderData,
    id: orderData.orderId || `BC-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
    status: orderData.status || "Preparing",
  };

  // Update local order history
  const localOrders = getLocalOrders();
  const updatedOrders = [finalOrder, ...localOrders];
  saveLocalOrders(updatedOrders);

  // Update local user points
  const currentUser = getLocalUser();
  if (currentUser) {
    let currentPoints = currentUser.points || 0;
    if (orderData.pointsRedeemed) {
      currentPoints = Math.max(0, currentPoints - orderData.pointsRedeemed);
    }
    if (orderData.pointsEarned) {
      currentPoints += orderData.pointsEarned;
    }
    currentUser.points = currentPoints;
    saveLocalUser(currentUser);
  }

  // Realtime Database Sync
  try {
    if (db) {
      // 1. Write order document under Realtime DB path `orders/{orderId}`
      console.log("⚡ Writing order to Realtime Database path `orders/" + finalOrder.id + "`...");
      await set(ref(db, `orders/${finalOrder.id}`), finalOrder);

      // 2. Link under user orders `user_orders/{userId}/{orderId}`
      if (finalOrder.userId && !finalOrder.userId.startsWith("user_")) {
        await set(ref(db, `user_orders/${finalOrder.userId}/${finalOrder.id}`), finalOrder);

        // 3. Update points under `users/{userId}/points`
        await update(ref(db, `users/${finalOrder.userId}`), {
          points: currentUser.points,
        });
      }
      console.log("✅ Order successfully written to Firebase Realtime Database!");
    }
  } catch (e) {
    console.warn("Realtime Database order placement error:", e.message);
  }

  return finalOrder;
}

/**
 * Fetch Order History for User from Realtime Database (`user_orders/{userId}`)
 */
export async function fetchUserOrders(userId) {
  try {
    if (db && userId && !userId.startsWith("user_")) {
      const userOrdersRef = ref(db, `user_orders/${userId}`);
      const snapshot = await get(userOrdersRef);

      if (snapshot.exists()) {
        const val = snapshot.val();
        const orderArray = Object.values(val).reverse();
        saveLocalOrders(orderArray);
        return orderArray;
      }
    }
  } catch (e) {
    console.warn("Realtime Database fetch orders note:", e.message);
  }

  return getLocalOrders();
}

/**
 * Submit Table Reservation to Realtime Database (`reservations/{id}` & `user_reservations/{userId}/{id}`)
 */
export async function submitReservation(reservationData) {
  const currentUser = getLocalUser();
  const reservationId = `RES-${Math.floor(10000 + Math.random() * 90000)}`;

  const finalReservation = {
    ...reservationData,
    id: reservationId,
    reservationId,
    userId: currentUser?.uid || "guest",
    createdAt: new Date().toISOString(),
    status: "Confirmed",
  };

  try {
    if (db) {
      console.log("⚡ Writing table reservation to Realtime DB path `reservations/" + reservationId + "`...");
      await set(ref(db, `reservations/${reservationId}`), finalReservation);

      if (finalReservation.userId && !finalReservation.userId.startsWith("user_")) {
        await set(ref(db, `user_reservations/${finalReservation.userId}/${reservationId}`), finalReservation);
      }
      console.log("✅ Reservation written to Firebase Realtime Database!");
    }
  } catch (e) {
    console.warn("Realtime DB reservation submission note:", e.message);
  }

  // Local storage fallback
  try {
    const existing = localStorage.getItem("breakfast_club_reservations");
    const list = existing ? JSON.parse(existing) : [];
    localStorage.setItem("breakfast_club_reservations", JSON.stringify([finalReservation, ...list]));
  } catch (e) {}

  return finalReservation;
}

/**
 * Fetch User Reservations from Realtime Database (`user_reservations/{userId}`)
 */
export async function fetchUserReservations(userId) {
  try {
    if (db && userId && !userId.startsWith("user_")) {
      const snapshot = await get(ref(db, `user_reservations/${userId}`));
      if (snapshot.exists()) {
        return Object.values(snapshot.val()).reverse();
      }
    }
  } catch (e) {
    console.warn("Realtime DB fetch reservations note:", e.message);
  }
  try {
    const existing = localStorage.getItem("breakfast_club_reservations");
    return existing ? JSON.parse(existing) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Submit Contact Us Feedback directly as a Customer Review in Realtime Database (`reviews/{id}`)
 */
export async function submitFeedback(feedbackData) {
  const reviewId = `rev_${Date.now()}`;
  const ratingVal = feedbackData.rating && feedbackData.rating > 0 ? feedbackData.rating : 5;
  const reviewPayload = {
    id: reviewId,
    name: feedbackData.name ? feedbackData.name.trim() : "Anonymous Foodie",
    email: feedbackData.email ? feedbackData.email.trim() : "",
    review: feedbackData.comments ? feedbackData.comments.trim() : "",
    ratingFilled: ratingVal,
    ratingUnfilled: 5 - ratingVal,
    createdAt: new Date().toISOString(),
  };

  try {
    if (db) {
      console.log("⚡ Writing customer review to Realtime DB path `reviews/" + reviewId + "`...");
      await set(ref(db, `reviews/${reviewId}`), reviewPayload);
      console.log("✅ Customer review successfully written to Firebase Realtime Database!");
    }
  } catch (e) {
    console.warn("Realtime DB review submission note:", e.message);
  }

  return reviewPayload;
}

/**
 * Default initial celebrity reviews
 */
const DEFAULT_REVIEWS = [
  {
    id: "rev_1",
    name: "Gordon Ramsay",
    review: "The eggs benedict here are bloody brilliant! Perfectly poached and cooked to absolute perfection. Best breakfast spot in town!",
    ratingFilled: 5,
    ratingUnfilled: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "rev_2",
    name: "Taylor Swift",
    review: "Loved the peaceful morning vibes and the avocado toast! It was enchanted. Absolutely coming back for more fluffy pancakes!",
    ratingFilled: 4,
    ratingUnfilled: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "rev_3",
    name: "Dwayne Johnson",
    review: "The protein breakfast platter is legendary! Fuels my workouts and tastes unbelievable. Can you smell what Breakfast Club is cookin'?",
    ratingFilled: 5,
    ratingUnfilled: 0,
    createdAt: new Date().toISOString(),
  },
];

/**
 * Fetch Public Reviews from Realtime Database (`reviews`)
 */
export async function fetchReviews() {
  try {
    if (db) {
      const snapshot = await get(ref(db, "reviews"));
      if (snapshot.exists()) {
        const val = snapshot.val();
        const reviewsArray = Object.values(val).reverse();
        if (reviewsArray.length > 0) return reviewsArray;
      }

      // Seed initial default reviews into Realtime DB if node is empty
      console.log("⚡ Seeding default reviews into Realtime DB `reviews` node...");
      for (const rev of DEFAULT_REVIEWS) {
        await set(ref(db, `reviews/${rev.id}`), rev);
      }
      return DEFAULT_REVIEWS;
    }
  } catch (e) {
    console.warn("Realtime DB fetch reviews note:", e.message);
  }

  return DEFAULT_REVIEWS;
}

/**
 * Submit Public Review to Realtime Database (`reviews/{id}`)
 */
export async function submitReview(reviewData) {
  const reviewId = `rev_${Date.now()}`;
  const finalReview = {
    ...reviewData,
    id: reviewId,
    ratingFilled: reviewData.rating || 5,
    ratingUnfilled: 5 - (reviewData.rating || 5),
    createdAt: new Date().toISOString(),
  };

  try {
    if (db) {
      console.log("⚡ Writing public review to Realtime DB path `reviews/" + reviewId + "`...");
      await set(ref(db, `reviews/${reviewId}`), finalReview);
      console.log("✅ Review written to Firebase Realtime Database!");
    }
  } catch (e) {
    console.warn("Realtime DB review submission note:", e.message);
  }

  return finalReview;
}

/* Local Storage Utility Helpers */
function getLocalUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveLocalUser(userData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userData));
  } catch (e) {}
}

function clearLocalUser() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LOCAL_USER_KEY);
  } catch (e) {}
}

function getLocalFavorites() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalFavorites(favs) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(favs));
  } catch (e) {}
}

function getLocalOrders() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalOrders(orders) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {}
}
