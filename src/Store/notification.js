import { create } from "zustand";
import zukeeper from "zukeeper";
export const useNotificationStore = create(
  zukeeper((set) => ({
    notifications: [],
    setNotifications: (data) =>
      set((state) => ({
        notifications: [...data, ...state.notifications],
      })),
    markAllAsRead: () =>
      set((state) => {
        // state.notifications.forEach((item) => (item.isRead = true));
        return { notifications: [] };
      }),
  }))
);
window.store = useNotificationStore;
