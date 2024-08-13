import { create } from "zustand";
import { User } from "@/types/user";

interface UserStoreState {
  user: User | null;
  setUser: (data: User | null) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
}));
