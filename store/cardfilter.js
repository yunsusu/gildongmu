import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCardFilterStore = create(
  persist(
    set => ({
      cardsOrigin: [],
      cards: [],
      setCardFilter: cards => set({ cards }),
      setCardOrigin: cardsOrigin => set({ cardsOrigin }),
    }),
    {
      name: "card-store", // localStorage에 저장될 때 사용될 키
      getStorage: () => localStorage, // 사용할 스토리지 지정
    },
  ),
);

export default useCardFilterStore;
