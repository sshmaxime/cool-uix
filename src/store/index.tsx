import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {}

export const useStore = create<State>()(
  devtools(
    persist((set) => ({}), {
      name: "state-storage",
    })
  )
);
