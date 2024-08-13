import { PostResponse } from "@/types/post";
import { create } from "zustand";

interface PostStoreState {
  currentPost: PostResponse | null;
  setCurrentPost: (data: PostResponse | null) => void;
  reset: () => void;
}

export const usePostStore = create<PostStoreState>((set) => ({
  currentPost: null,
  setCurrentPost: (data) => set({ currentPost: data }),
  reset: () => set({ currentPost: null }),
}));
