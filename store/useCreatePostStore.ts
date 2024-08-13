import { Post } from "@/types/post";
import { create } from "zustand";

interface CreatePostStoreState {
  post: Post;
  setData: (data: Post) => void;
  reset: () => void;
}

const initialPostState: Post = {
  title: "",
  content: "",
  tags: [],
};

export const useCreatePostStore = create<CreatePostStoreState>((set) => ({
  post: initialPostState,
  setData: (data) =>
    set((state) => ({
      post: { ...state.post, ...data },
    })),
  reset: () => set({ post: initialPostState }),
}));
