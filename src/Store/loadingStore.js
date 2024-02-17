import { create } from "zustand";
import zukeeper from "zukeeper";
export const useLoadingStore = create(
  zukeeper((set) => ({
    loading: true,
    proggressBar: 0,
    loadingWall: false,
    setLoading: (data) => set(() => ({ loading: data })),
    setProgress: (data) => set(() => ({ proggressBar: data })),
    setLoadingWall: (data) => set(() => ({ loadingWall: data })),
  }))
);
window.store = useLoadingStore;
