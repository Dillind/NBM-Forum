import { createAxiosInstance } from "@/constants/primitives";

type fetchTagsParams = {
  page: number;
  limit: number;
};

type fetchTagsResponse = {
  data: {
    name: string;
  }[];
  total: number;
};

namespace TagService {
  export const getTags = async ({
    page,
    limit,
  }: fetchTagsParams): Promise<fetchTagsResponse> => {
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.get<fetchTagsResponse>(
        `/tags?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw new Error("Failed to fetch tags");
    }
  };
}

export default TagService;
