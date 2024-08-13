import { CreateCommentResponse, CreateCommentVariables } from "@/types/comment";
import { useMutation } from "@tanstack/react-query";
import CommentService from "./queries";

export const useCreateCommentMutation = () => {
  return useMutation({
    mutationFn: async ({
      postId,
      comment,
    }: CreateCommentVariables): Promise<CreateCommentResponse> => {
      const response: CreateCommentResponse =
        await CommentService.createComment(postId, comment);
      return response;
    },
    onSuccess: () => {
      console.log("Successfully commented on post");
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    },
  });
};
