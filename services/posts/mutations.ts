import { useMutation } from "@tanstack/react-query";
import { Post, PostResponse } from "@/types/post";
import PostService from "./queries";
import { useCreatePostStore } from "@/store/useCreatePostStore";
import { router } from "expo-router";
import { Alert } from "react-native";

export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: async (post: Post): Promise<PostResponse> => {
      const response: PostResponse = await PostService.createPost(post);
      return response;
    },
    onSuccess: async () => {
      Alert.alert("Post created successfully.");
      useCreatePostStore.getState().reset();
      router.push("/forum");
    },
    onError: async (error) => {
      console.error("Failed to create post:", error);
    },
  });
};

export const useLikePostMutation = () => {
  return useMutation({
    mutationFn: async (postId: number) => {
      const response = await PostService.likePost(postId);
      return response;
    },
    onSuccess: async () => {
      console.log("Successfully liked the post");
    },
    onError: async (error) => {
      console.error("Failed to like post:", error);
    },
  });
};
