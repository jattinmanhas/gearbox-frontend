"use server";

import { ContactInitialType } from "@/types/contact.type";

export const createContactUs = async (
  prevState: ContactInitialType,
  formData: FormData
) => {
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  if (!email) {
    return {
      status: 404,
      message: "Email Not found",
      data: null,
    };
  }

  let data = {
    email: email,
    subject: subject,
    message: message
  }

  try {
    const response = await fetch("http://localhost:8080/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "Signup failed",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: responseData.message,
      data: responseData.data.data,
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
