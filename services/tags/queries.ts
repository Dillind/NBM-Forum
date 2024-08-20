import { createAxiosInstance } from "@/constants/primitives";
import { TagsParam, TagsResponse } from "@/types/tags";

namespace TagService {
  export const getTags = async ({
    page,
    limit,
  }: TagsParam): Promise<TagsResponse> => {
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.get<TagsResponse>(
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
