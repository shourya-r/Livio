import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket, isSocketReady } from "../socket/socket.client";

export const useMessageStore = create((set, get) => ({
  messages: [],
  isLoading: false,
  isSubscribed: false,

  getMessages: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/conversation/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      set({ messages: [] });
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (userId, content) => {
    try {
      const res = await axiosInstance.post("/messages/send", {
        receiverId: userId,
        content: content,
      });

      // Don't add message here - it will be received via socket for real-time updates
      // This prevents duplicates and ensures consistent real-time behavior
      console.log("Message sent successfully:", res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  addMessage: (message) => {
    console.log("=== ADDING MESSAGE TO STATE ===");
    console.log("Message:", message);
    console.log("Current messages count:", get().messages.length);

    set((state) => {
      // Check if message already exists to prevent duplicates
      const messageExists = state.messages.some(
        (existingMsg) => existingMsg._id === message._id
      );

      if (messageExists) {
        console.log("Message already exists, skipping:", message._id);
        return state; // Don't add duplicate
      }

      console.log("Adding new message to state:", message._id);
      const newState = {
        messages: [...state.messages, message],
      };
      console.log("New messages count:", newState.messages.length);
      return newState;
    });
  },

  subscribeToMessages: () => {
    console.log("=== SUBSCRIBE TO MESSAGES CALLED ===");
    const socket = getSocket();
    console.log("Socket object:", socket);
    console.log("Socket ready:", isSocketReady());
    console.log("Already subscribed:", get().isSubscribed);

    if (!isSocketReady()) {
      console.log("Socket not ready, skipping subscription");
      return;
    }

    if (get().isSubscribed) {
      console.log("Already subscribed to messages, skipping");
      return;
    }

    console.log("Subscribing to newMessage events");
    socket.on("newMessage", (message) => {
      console.log("=== RECEIVED NEW MESSAGE EVENT ===");
      console.log("Message:", message);
      console.log("Message ID:", message._id);
      console.log("Message sender:", message.sender);
      console.log("Message receiver:", message.receiver);
      get().addMessage(message);
    });

    set({ isSubscribed: true });
    console.log("=== SUBSCRIPTION COMPLETE ===");
  },

  unsubscribeFromMessages: () => {
    const socket = getSocket();
    if (!socket) return;

    socket.off("newMessage");
    set({ isSubscribed: false });
  },
}));
