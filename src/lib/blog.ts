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

interface BlogPostFormData {
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

interface BlogResponse {
  status: number;
  message: string;
  data: BlogPostFormData[] | null;
}

export async function getAllBlogs(
  skip: number,
  take: number
): Promise<BlogResponse> {
  try {
    const response = await fetch(
      `http://localhost:8080/user/blog/getAllBlogs?skip=${skip}&take=${take}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache : 'no-store'
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "Failed to get Blogs",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful Retrieval of all Blogs..",
      data: responseData.data,
    };
  } catch (error) {
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
}

export async function getSingleBlogPost(
  blogId: string
): Promise<{
  status: number;
  message: string;
  data: BlogPostFormData | null;
}> {
  try {
    const response = await fetch(
      `http://localhost:8080/user/blog/singleBlog/${blogId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "Failed to get Blog",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful Retrieval of Blog..",
      data: responseData.data,
    };
  } catch (error) {
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
}

