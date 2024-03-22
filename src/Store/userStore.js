import { create } from "zustand";
import zukeeper from "zukeeper";
import axios from "axios";
export const useUserStore = create(
  zukeeper((set) => ({
    user: null,
    setUser: (data) => set(() => ({ user: data })),
    logout: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ENDPOINT}user/logout`
        );
        if (response) {
          set({ user: null });
        }
      } catch (error) {
        console.log(error);
      }
    },
  }))
);

window.store = useUserStore;
