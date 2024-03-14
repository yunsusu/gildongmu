import create from "zustand";

const useGnbStore = create(set => ({
  gnbColor: "",
  setGnbColor: text => set({ gnbColor: text }),
}));

export default useGnbStore;
