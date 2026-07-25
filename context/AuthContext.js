"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, db } from "@/lib/firebase";
import {
  signUpUser,
  signInUser,
  logoutUser,
  toggleFavorite as toggleFavService,
  placeFirebaseOrder,
  fetchUserOrders,
} from "@/lib/firebaseService";

const AuthContext = createContext({
  user: null,
  points: 0,
  favorites: [],
  orders: [],
  isLoading: true,
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
  toggleFavorite: async () => {},
  isFavorite: () => false,
  placeOrder: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sync user profile & favorites from localStorage / Firebase session
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("breakfast_club_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setPoints(parsed.points || 500);
        if (parsed.favorites) {
          setFavorites(parsed.favorites);
        }
      }

      const savedFavs = localStorage.getItem("breakfast_club_favorites");
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }

      const savedOrders = localStorage.getItem("breakfast_club_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (e) {
      console.error("Failed loading local auth state", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Listen to Firebase Auth state changes & real-time Realtime Database updates
  useEffect(() => {
    if (!auth) return;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Listen to Realtime Database user node `users/{uid}` in real time
        if (db) {
          const userNodeRef = ref(db, `users/${firebaseUser.uid}`);
          const unsubscribeValue = onValue(userNodeRef, (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              setUser(data);
              setPoints(data.points || 0);
              if (data.favorites) setFavorites(data.favorites);
              localStorage.setItem("breakfast_club_user", JSON.stringify(data));
            }
          });

          // Fetch user orders
          fetchUserOrders(firebaseUser.uid).then((orderList) => {
            if (orderList) setOrders(orderList);
          });

          return () => unsubscribeValue();
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Signup Action
  const signup = async (formData) => {
    const res = await signUpUser(formData);
    if (res.success && res.user) {
      setUser(res.user);
      setPoints(res.user.points || 500);
      setFavorites(res.user.favorites || []);
    }
    return res;
  };

  // Login Action
  const login = async (email, password) => {
    const res = await signInUser(email, password);
    if (res.success && res.user) {
      setUser(res.user);
      setPoints(res.user.points || 0);
      if (res.user.favorites) setFavorites(res.user.favorites);

      // Fetch user order history
      const userOrders = await fetchUserOrders(res.user.uid);
      setOrders(userOrders || []);
    }
    return res;
  };

  // Logout Action
  const logout = async () => {
    await logoutUser();
    setUser(null);
    setPoints(0);
    setFavorites([]);
    setOrders([]);
  };

  // Toggle Favorite
  const toggleFavorite = async (foodItem) => {
    const updatedFavs = await toggleFavService(user?.uid, foodItem);
    setFavorites(updatedFavs);
    if (user) {
      const updatedUser = { ...user, favorites: updatedFavs };
      setUser(updatedUser);
    }
  };

  // Is Favorite Check
  const isFavorite = (itemId) => {
    return favorites.some((f) => f.id === itemId);
  };

  // Place Order Action
  const placeOrder = async (orderData) => {
    const orderWithUser = {
      ...orderData,
      userId: user?.uid || "guest",
    };
    const newOrder = await placeFirebaseOrder(orderWithUser);

    setOrders((prev) => [newOrder, ...prev]);

    // Recalculate local points
    if (user) {
      let currentPts = user.points || 0;
      if (orderData.pointsRedeemed) {
        currentPts = Math.max(0, currentPts - orderData.pointsRedeemed);
      }
      if (orderData.pointsEarned) {
        currentPts += orderData.pointsEarned;
      }
      const updatedUser = { ...user, points: currentPts };
      setUser(updatedUser);
      setPoints(currentPts);
    }

    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        points,
        favorites,
        orders,
        isLoading,
        signup,
        login,
        logout,
        toggleFavorite,
        isFavorite,
        placeOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
