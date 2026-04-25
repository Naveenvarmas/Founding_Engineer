// src/store/useCollegeStore.js

import { create } from "zustand";

const useCollegeStore = create((set, get) => ({
  selectedColleges: [],

  toggleCompare: (college) => {
    const selected = get().selectedColleges;

    const exists = selected.find(
      (item) => item._id === college._id
    );

    if (exists) {
      set({
        selectedColleges: selected.filter(
          (item) => item._id !== college._id
        ),
      });
      return;
    }

    if (selected.length >= 3) return;

    set({
      selectedColleges: [...selected, college],
    });
  },

  clearCompare: () => set({ selectedColleges: [] }),
}));

export default useCollegeStore;