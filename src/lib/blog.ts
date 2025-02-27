import { FetchWrapperResponse } from "@/types/misc.types";
import { fetchWrapper } from "./fetchapiWrapper";

interface Section {
  id: string;
  heading: string;
  paragraph: string;
  order: number;
  image: {
    imageName: string | null;
    signedUrl?: string;
    id: string;
  };
}

export interface BlogPostFormData {
  id: string;
  title: string;
  description: string;
  category_id?: string;
  category?: {
    name: string;
  };
  author: {
    fullname: string;
  };
  mainImage: string | null;
  signedUrl?: string;
  mainImageSignedUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  sections: Section[];
}

export interface BlogResponse {
  status: number;
  message: string;
  data: BlogPostFormData[] | null;
}

export async function getAllBlogs(
  skip: number,
  take: number
): Promise<FetchWrapperResponse<BlogPostFormData[]>> {
  const response = await fetchWrapper<BlogPostFormData[]>({
    url: `blog/getAllBlogs?skip=${skip}&take=${take}`,
  })

  return response;
}

export async function getSingleBlogPost(
  blogId: string
): Promise<FetchWrapperResponse<BlogPostFormData>> {
  const response = await fetchWrapper<BlogPostFormData>({
    url: `user/blog/singleBlog/${blogId}`
  });

  return response;
}

