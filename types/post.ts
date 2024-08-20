import { User } from "./user";

export type Post = {
  title: string;
  content: string;
  tags?: string[];
};

export type SearchPostParams = {
  page: number;
  limit: number;
  tags: string[];
};

export type SearchPostResponse = {
  total: number;
  data: PostResponse[];
  nextPage: number;
  totalPages: number;
  currentPage: number;
  length: number;
  hasMore: boolean;
};

export type PostResponse = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: User;
  likes: number;
  comments: number;
  tags?: {
    name: string;
  }[];
};

// export type Category = {
//   id: number;
//   name: string;
//   checked?: boolean;
// };
