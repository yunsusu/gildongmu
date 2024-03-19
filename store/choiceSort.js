import { create } from "zustand";

const useSortStore = create(set => ({
  choiceSort: "최근 작성순",
  setChoiceSort: sort => set({ choiceSort: sort }),
}));

export default useSortStore;
