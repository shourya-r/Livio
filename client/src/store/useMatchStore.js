import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket, initializeSocket } from "../socket/socket.client";

export const useMatchStore = create((set, get) => ({
  matches: [],
  isLoadingMyMatches: false,
  userProfiles: [],
  isLoadingUserProfiles: false,
  swipeFeedback: null,

  // Helper function to add match without duplicates
  addMatchIfNotExists: (newMatch) => {
    const state = get();
    const matchExists = state.matches.some(
      (match) => match._id === newMatch._id
    );
    if (!matchExists) {
      set((state) => ({
        matches: [...state.matches, newMatch],
      }));
      return true; // Match was added
    }
    return false; // Match already exists
  },

  getMyMatches: async () => {
    try {
      set({ isLoadingMyMatches: true });
      const res = await axiosInstance.get("/matches");
      set({ matches: res.data.matches });
    } catch (error) {
      set({ matches: [] });
      toast.error(error.response.data.message || "Failed to load matches");
    } finally {
      set({ isLoadingMyMatches: false });
    }
  },

  getUserProfiles: async () => {
    try {
      set({ isLoadingUserProfiles: true });
      const res = await axiosInstance.get("/matches/user-profiles");
      set({ userProfiles: res.data.users });
    } catch (error) {
      set({ userProfiles: [] });
      toast.error(
        error.response.data.message || "Failed to load user profiles"
      );
    } finally {
      set({ isLoadingUserProfiles: false });
    }
  },

  // Helper function to remove user from profiles
  removeUserFromProfiles: (userId) => {
    set((state) => ({
      userProfiles: state.userProfiles.filter((user) => user._id !== userId),
    }));
  },

  swipeLeft: async (user) => {
    try {
      set({ swipeFeedback: "passed" });
      // Remove user from profiles immediately for better UX
      set((state) => ({
        userProfiles: state.userProfiles.filter((u) => u._id !== user._id),
      }));
      await axiosInstance.post("/matches/swipe-left/" + user._id);
    } catch (error) {
      console.log("Swipe left error:", error);
      // Restore user to profiles if API call fails
      set((state) => ({
        userProfiles: [...state.userProfiles, user],
      }));
      toast.error(
        error.response?.data?.message ||
          "Failed to swipe left. Please try again."
      );
    } finally {
      setTimeout(() => set({ swipeFeedback: null }), 1500);
    }
  },

  swipeRight: async (user) => {
    try {
      set({ swipeFeedback: "liked" });
      // Remove user from profiles immediately for better UX
      set((state) => ({
        userProfiles: state.userProfiles.filter((u) => u._id !== user._id),
      }));
      const response = await axiosInstance.post(
        "/matches/swipe-right/" + user._id
      );

      // Debug: Log the response to see if it's a match
      console.log("Swipe right response:", response.data);

      // If it's a match from the API response, add to matches immediately
      if (response.data.isMatch) {
        console.log("Match detected from API response!");

        // Add the match to the store without duplicates
        const wasAdded = get().addMatchIfNotExists(response.data.match);
        if (wasAdded) {
          console.log("Match added from API response");
        } else {
          console.log("Match already exists, not adding duplicate");
        }
      }
    } catch (error) {
      console.log("Swipe right error:", error);
      // Restore user to profiles if API call fails
      set((state) => ({
        userProfiles: [...state.userProfiles, user],
      }));
      toast.error(
        error.response?.data?.message ||
          "Failed to swipe right. Please try again."
      );
    } finally {
      setTimeout(() => set({ swipeFeedback: null }), 1500);
    }
  },

  subscribeToNewMatches: (userId) => {
    try {
      // Initialize socket with userId
      initializeSocket(userId);
      const socket = getSocket();

      console.log("Subscribing to newMatch events for userId:", userId);

      socket.on("newMatch", (match) => {
        console.log("New match received via socket:", match);

        // Add the match to the store without duplicates
        const wasAdded = get().addMatchIfNotExists(match);
        if (wasAdded) {
          console.log("Match added from socket notification");

          // Show toast notification only if match was actually added
          toast.success("Roommate Match!", {
            duration: 3000,
            position: "top-center",
          });

          // Also try a browser notification as backup
          if (Notification.permission === "granted") {
            new Notification("Livio", {
              body: "Roommate Match!",
              icon: "/avatar.png",
            });
          }
        } else {
          console.log(
            "Match already exists, not showing duplicate notification"
          );
        }

        console.log("Socket notification processed");
      });

      // Test if socket is working with a simple event
      socket.on("connect", () => {
        console.log("Socket connected successfully for userId:", userId);
      });
    } catch (error) {
      console.log("Error in subscribeToNewMatches: ", error);
    }
  },

  unsubscribeFromNewMatches: () => {
    try {
      const socket = getSocket();
      if (socket) {
        console.log("Unsubscribing from newMatch events...");
        socket.off("newMatch");
      }
    } catch (error) {
      console.log("Error in unsubscribeFromNewMatches: ", error);
    }
  },
}));
