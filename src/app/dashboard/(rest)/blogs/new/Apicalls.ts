import { fetchWrapper } from "@/lib/fetchapiWrapper";
import { Address } from "@/components/ShopComponents/UserAddress";

export const updloadFileImageToS3 = async (formData: File) => {
  const imageFormData = new FormData();
  imageFormData.append("file", formData);

  try {
    const response = await fetch(
      "http://localhost:8080/api/admin/blog/BlogUploadS3",
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
    const response = await fetch("http://localhost:8080/api/user/updateUser", {
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
  const response = await fetchWrapper<Address>({
    url : `api/user/userAddress/${userId}`
  })

  return response;
}
