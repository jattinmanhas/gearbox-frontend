"use server";

import { ContactInitialType } from "@/types/contact.type";
import { fetchWrapper } from "./fetchapiWrapper";

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

  const response = await fetchWrapper<any>({
    url: "contact",
    method: "POST",
    data: data
  })

  return response;
};
