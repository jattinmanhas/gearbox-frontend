import React, { useState } from "react";
import UserProfileForm from "./UserProfileForm";

export default function ProfilePage() {
  return (
    <div className="w-4/5 m-auto">
      <h1 className="text-3xl font-bold text-white mb-6 underline mt-2">
        User Details
      </h1>
      <UserProfileForm />
    </div>
  );
}
