import {
  Comment,
  CreateCommentResponse,
  GetCommentResponse,
  GetCommentsParams,
} from "@/types/comment";
import { createAxiosInstance } from "@/constants/primitives";

namespace CommentService {
  export const getComments = async ({
    postId,
    page,
    limit,
  }: GetCommentsParams): Promise<GetCommentResponse> => {
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.get<GetCommentResponse>(
        `/posts/${postId}/comments?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for ID`, error);
      throw new Error("Failed to fetch comments");
    }
  };

  export const createComment = async (
    postId: number,
    comment: Comment
  ): Promise<CreateCommentResponse> => {
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.post<CreateCommentResponse>(
        `/posts/${postId}/comments`,
        comment
      );
      return response.data;
    } catch (error) {
      console.error(`Error creating comment on post`, error);
      throw new Error("Failed to create comment");
    }
  };

  export const deleteComment = async (
    postId: number,
    commentId: number
  ): Promise<void> => {
    try {
      const axiosInstance = await createAxiosInstance();
      await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
    } catch (error) {
      console.error(
        `Error deleting comment with ID ${commentId} on post ID ${postId}:`,
        error
      );
      throw new Error("Failed to delete comment");
    }
  };

  export const getCommentById = async (
    page: number,
    limit: number,
    postId: number,
    commentId: number
  ): Promise<GetCommentResponse> => {
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.get<GetCommentResponse>(
        `/posts/${postId}/comments/${commentId}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching comment with provided ID`, error);
      throw new Error("Failed to fetch comment.");
    }
  };
}

export default CommentService;
