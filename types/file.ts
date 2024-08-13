export type BucketUrlProps = {
  fileName: string;
  folder: "avatar";
  rootFolder: "images" | "videos" | "other";
};

export type ResizedImageUrl = {
  fileName: string;
  width: number;
  height: number;
};

export type BucketUrlResponse = {
  url: string;
  fileName?: string;
};
