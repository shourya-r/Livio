import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMatchStore = create((set) => ({
  matches: [],
  isLoadingMyMatches: false,
  userProfiles: [],
  isLoadingUserProfiles: false,
  swipeFeedback: null,

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

  swipeLeft: async (user) => {
    try {
      set({ swipeFeedback: "passed" });
      await axiosInstance.post("/matches/swipe-left/" + user._id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to swipe left");
    } finally {
      setTimeout(() => set({ swipeFeedback: null }), 1500);
    }
  },
  swipeRight: async (user) => {
    try {
      set({ swipeFeedback: "liked" });
      await axiosInstance.post("/matches/swipe-right/" + user._id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to swipe right");
    } finally {
      setTimeout(() => set({ swipeFeedback: null }), 1500);
    }
  },
}));
