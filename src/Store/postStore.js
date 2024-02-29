import { create } from "zustand";
import zukeeper from "zukeeper";
export const usePostStore = create(
  zukeeper((set) => ({
    posts: null,
    setPosts: (data) => set(() => ({ posts: data })),
  }))
);
window.store = usePostStore;
