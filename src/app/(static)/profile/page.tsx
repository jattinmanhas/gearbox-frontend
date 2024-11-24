import React from "react";
import UserProfile from "./UserProfileForm";
import { getCompleteUserDetails } from "@/lib/auth";

export default async function page() {
  const user = await getCompleteUserDetails();
  if (user.status !== 200) {
    return <div>{user.message}</div>;
  }

  if(user.data == null){
    return <div>User Not Found...</div>
  }

  if (user.data.userAddress.length == 0) {
    user.data.userAddress = [
      {
        userAddressId: -1,
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: true,
      },
    ];
  }

  return (
    <div>
      <UserProfile initialUserData={user.data} />
    </div>
  );
}
