import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginStore = create(
  persist(
    set => ({
      loginState: [],
      setLoginState: loginState => set({ loginState }),
    }),
    {
      name: "login", // localStorage에 저장될 때 사용될 키
      getStorage: () => localStorage, // 사용할 스토리지 지정
    },
  ),
);

export default useLoginStore;
