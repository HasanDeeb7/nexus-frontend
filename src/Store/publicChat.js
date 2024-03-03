import { create } from "zustand";
import zukeeper from "zukeeper";
export const usePublicChatStore = create(
  zukeeper((set) => ({
    messages: [],
    setMessages: (data) =>
      set((state) => ({ messages: [...state.messages, data] })),
  }))
);
