import { create } from "zustand";

const useSearchStore = create(set => ({
  searchValue: "",
  setSearchValue: text => set({ searchValue: text }),
}));

export default useSearchStore;
