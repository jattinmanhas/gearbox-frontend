import { useUserStore } from "@/store";
import { BlogPostFormData } from "./CreateBlog";

export const updloadFileImageToS3 = async (formData: File) => {
  const imageFormData = new FormData();
  imageFormData.append("file", formData);

  try {
    const response = await fetch(
      "http://localhost:8080/admin/blog/BlogUploadS3",
      {
        method: "POST",
        body: imageFormData,
        cache: "no-store",
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      return {
        status: 200,
        message: responseData.message,
        data: responseData.data,
      };
    }

    return {
      status: 400,
      message: responseData.message || "Failed to Upload image to S3",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
};

export async function updateUserDetailsWithAddress(formData: FormData) {
  try {
    const response = await fetch("http://localhost:8080/user/updateUser", {
      method: "PUT",
      body: formData,
      cache: "no-store",
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        status: 200,
        message: responseData.message,
        data: responseData.data,
      };
    }

    return {
      status: 400,
      message: responseData.message || "Failed to Update Profile",
      data: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
}

export async function getUserAddressDetails(userId: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/user/userAddress/${userId}`,
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
        message: errorData.message || "Failed to Fetch User Details",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: responseData.message,
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
