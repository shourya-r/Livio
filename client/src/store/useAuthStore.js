import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

// Zustand store for authentication
export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  // signs the user up and sets the authUser state
  signup: async (signupData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      set({ authUser: res.data.user });
      toast.success("Signup successful!");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(
        error.response.data.message || "Signup failed. Please try again."
      );
    } finally {
      set({ loading: false });
    }
  },

  // logs the user in and sets the authUser state
  login: async (loginData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/login", loginData);
      set({ authUser: res.data.user });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        error.response.data.message || "Login failed. Please try again."
      );
    } finally {
      set({ loading: false });
    }
  },
  // logs the user out
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        set({ authUser: null });
      }
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(
        error.response.data.message || "Logout failed. Please try again."
      );
    }
  },

  // checks if the user is authenticated and sets the checkingAuth state
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
      console.log("Error checking auth:", error);
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
