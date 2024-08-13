import { PostResponse } from "./post";
import { User } from "./user";

export type Comment = {
  commentId?: number;
  text: string;
};

export type CreateCommentVariables = {
  postId: number;
  comment: Comment;
};

export type CreateCommentResponse = {
  id?: number;
  text: string;
  user: User;
  post: PostResponse;
  parent: string;
  createdAt: string;
};

export type GetCommentsParams = {
  postId: number;
  page: number;
  limit: number;
};

export type CommentResponse = {
  id: number;
  text: string;
  userId: number;
  postId: number;
  createdAt: string;
  user: User;
  comments: CommentResponse[];
};

export type GetCommentResponse = {
  total: number;
  data: CommentResponse[];
  length: number;
};
