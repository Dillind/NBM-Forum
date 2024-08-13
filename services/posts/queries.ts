import {
  Post,
  PostResponse,
  SearchPostParams,
  SearchPostResponse,
} from "@/types/post";
import { createAxiosInstance } from "@/constants/primitives";

namespace PostService {
  export const searchPosts = async ({
    page,
    limit,
    tags,
  }: SearchPostParams): Promise<SearchPostResponse> => {
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.post<SearchPostResponse>(
        "/posts/_search",
        { page, limit, tags }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching posts:", error);
      throw new Error("Failed to search posts");
    }
  };

  export const createPost = async (post: Post): Promise<PostResponse> => {
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.post<PostResponse>("/posts", {
        title: post.title,
        content: post.content,
        tags: post.tags,
      });
      const data = response.data;
      const postResponse: PostResponse = {
        ...data,
        likes: data.likes ?? 0,
        comments: data.comments ?? 0,
      };
      return postResponse;
    } catch (error) {
      console.error("Error creating post", error);
      throw new Error("Failed to create post");
    }
  };

  export const likePost = async (postId: number): Promise<void> => {
    try {
      const axiosInstance = await createAxiosInstance();
      await axiosInstance.post(`/posts/${postId}/like`);
    } catch (error) {
      console.error("Error liking post with ID", error);
      throw new Error("Failed to like post");
    }
  };

  export const removeLike = async (postId: number): Promise<void> => {
    try {
      const axiosInstance = await createAxiosInstance();
      await axiosInstance.delete(`/posts/${postId}/like`);
    } catch (error) {
      console.error("Error removing like with ID", error);
      throw new Error("Failed to remove like from post");
    }
  };
}

export default PostService;
