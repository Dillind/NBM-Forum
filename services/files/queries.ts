import { createAxiosInstance } from "@/constants/primitives";
import {
  BucketUrlProps,
  BucketUrlResponse,
  ResizedImageUrl,
} from "@/types/file";

namespace FileService {
  export const uploadImageToBucket = async ({
    fileName,
    folder,
    rootFolder,
  }: BucketUrlProps): Promise<BucketUrlResponse> => {
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.get<BucketUrlResponse>(
        `/files/upload/${rootFolder}`,
        {
          params: {
            fileName,
            folder,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching S3 bucket URL:`, error);
      throw new Error("Failed to get S3 bucket URL.");
    }
  };

  export const resizeImage = async ({
    fileName,
    height,
    width,
  }: ResizedImageUrl): Promise<BucketUrlResponse> => {
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.get<BucketUrlResponse>(
        `/files/download/resize`,
        {
          params: {
            fileName,
            height,
            width,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching the resized image URL`, error);
      throw new Error("Failed to get resized image URL.");
    }
  };

  export const downloadImage = async (
    fileName: string
  ): Promise<BucketUrlResponse> => {
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.get<BucketUrlResponse>(
        `/files/download`,
        {
          params: {
            fileName,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching the downloaded image URL `, error);
      throw new Error("Failed to get the downloaded image URL");
    }
  };
}

export default FileService;
