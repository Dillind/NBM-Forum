export type TagsParam = {
  page: number;
  limit: number;
};

export type TagsResponse = {
  data: Tag[];
  total: number;
  nextPage?: number;
  totalPages?: number;
  currentPage?: number;
  length?: number;
  hasMore?: boolean;
};

export type Tag = {
  name: string;
};
