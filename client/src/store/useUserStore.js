import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = create((set) => ({
  loading: false,

  updateProfile: async (data) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.put("/users/update", data);
      toast.success("Profile updated successfully!");
      
      // Update the auth user data with the new profile information
      const { checkAuth } = useAuthStore.getState();
      await checkAuth();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      set({ loading: false });
    }
  },
}));
