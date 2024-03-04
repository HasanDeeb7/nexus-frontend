import { create } from "zustand";
import zukeeper from "zukeeper";
export const useChatStore = create(
  zukeeper((set) => ({
    messages: [],
    privateChatOpen: true,
    setMessages: (data) =>
      set((state) => ({ messages: [...state.messages, data] })),
    setPrivateChat: (data) => set(() => ({ privateChatOpen: data })),
  }))
);
