"use client";
import React, { useState, useRef } from "react";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Building,
  User,
  Save,
} from "lucide-react";
import { updateUserDetailsWithAddress } from "@/app/dashboard/(rest)/blogs/new/Apicalls";
import { toast } from "react-toastify";
import { UserDataProps, UserDetails } from "@/types/forms/UserProfileForm";

const UserProfile = ({ initialUserData }: UserDataProps) => {
  const [userData, setUserData] = useState<UserDetails>(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserDetails>(userData);
  const [updatedFile, setUpdatedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
      setUpdatedFile(file);
    }
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      setUserData(editedData); // Save changes

      const formData = new FormData();

      // Append the file
      if (updatedFile) {
        formData.append("image", updatedFile);
      }

      // Append other fields as JSON
      formData.append(
        "data",
        JSON.stringify({
          id: editedData.id,
          email: editedData.email,
          username: editedData.username,
          mobileNo: editedData.mobileNo,
          fullname: editedData.fullname,
          role: editedData.role,
          userAddress: editedData.userAddress,
        })
      );

      const updatedUser = await updateUserDetailsWithAddress(formData);
      if (updatedUser.status === 200) {
        toast.success("Profile Updated Successfully...");
      }else{
        toast.error("Failed to update profile");
        window.location.reload();
      }
    }

    
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes("[") && name.includes("]")) {
      // Extract the parent object, array index, and child property
      const match = name.match(/(\w+)\[(\d+)\]\.(\w+)/);
      if (match) {
        const [, parent, index, child] = match;
        const arrayIndex = parseInt(index, 10);

        setEditedData((prev) => {
          // Ensure the parent array exists and is copied correctly
          const parentArray = Array.isArray(prev[parent as keyof typeof prev])
            ? [...(prev[parent as keyof typeof prev] as any[])]
            : [];

          // Ensure the specific index is populated with an object if it’s empty
          parentArray[arrayIndex] = {
            ...(parentArray[arrayIndex] || {}),
            [child]: value,
          };

          return {
            ...prev,
            [parent]: parentArray,
          };
        });
      }
    } else {
      // Handle non-array names (existing else part)
      setEditedData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-inherit text-gray-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold mb-3 underline underline-offset-4">
          User Details
        </h1>
        <div className="bg-gray-900 rounded-lg shadow-xl p-8">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mx-auto">
                <img
                  src={editedData?.signedUrl || editedData?.image || ""}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-white">
              {userData.fullname}
            </h1>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullname"
                      value={editedData.fullname}
                      onChange={handleInputChange}
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-white">{userData.fullname}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={editedData.username}
                      onChange={handleInputChange}
                      disabled
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-white">{userData.username}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Email
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleInputChange}
                        className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-white">{userData.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Phone
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="tel"
                        name="mobileNo"
                        value={editedData.mobileNo || ""}
                        onChange={handleInputChange}
                        className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-white">{userData.mobileNo}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Street
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="userAddress[0].street"
                      value={editedData.userAddress[0].street || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-white">
                      {userData.userAddress[0].street || ""}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="userAddress[0].city"
                        value={editedData.userAddress[0].city || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-white">
                        {userData.userAddress[0].city || ""}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      State
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="userAddress[0].state"
                        value={editedData.userAddress[0].state || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-white">
                        {userData.userAddress[0].state || ""}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    ZIP Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="userAddress[0].postalCode"
                      value={editedData.userAddress[0].postalCode || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-white">
                      {userData.userAddress[0].postalCode || ""}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Edit/Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
