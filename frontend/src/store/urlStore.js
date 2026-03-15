import { create } from "zustand";

const useUrlStore = create((set) => ({
  shortUrl: null,
  analytics: null,

  setShortUrl: (url) => set({ shortUrl: url }),
  setAnalytics: (data) => set({ analytics: data }),
  clearUrl: () => set({ shortUrl: null }),
}));

export default useUrlStore;
