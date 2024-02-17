import { create } from "zustand";
import zukeeper from "zukeeper";
export const useUserStore = create(
  zukeeper((set) => ({
    user: null,
    setUser: (data) => set(() => ({ user: data })),
    logout: () => set(() => ({ user: null })),
  }))
);

window.store = useUserStore;
