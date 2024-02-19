import { create } from "zustand";
import zukeeper from "zukeeper";
export const useErrorStore = create(
  zukeeper((set) => ({
    error: null,
    setError: (data) =>
      set(() => ({
        error: data,
      })),
  }))
);
