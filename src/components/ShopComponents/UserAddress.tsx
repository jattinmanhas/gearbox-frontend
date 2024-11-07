"use client";
import { getUserAddressDetails } from "@/app/dashboard/(rest)/blogs/new/Apicalls";
import React, { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";

type AddressProps = {
  userId: string;
};

export interface Address {
  userAddressId: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  user: {
    username: string;
    fullname: string;
  };
}

const AddressDisplay = ({ userId }: AddressProps) => {
  const [userAddress, setUserAddress] = useState<Address | null>(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userDetails = await getUserAddressDetails(userId);
        console.log(userDetails);
        if (userDetails.data != null && userDetails.status == 200) {
          setUserAddress(userDetails.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchUserDetails();
  }, []);

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-white text-lg font-medium mb-4">Delivery Details</h2>
      {userAddress ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-gray-400 font-medium mb-2">Deliver To:</h3>
            <p>{userAddress.user.fullname}</p>
          </div>

          <div>
            <h3 className="text-gray-400 font-medium mb-2">Your Address:</h3>
            <p className="text-gray-300">
              {userAddress.street}
              <br />
              {userAddress.city}, {userAddress.state} {userAddress.postalCode}
            </p>
          </div>
        </div>
      ) : (
        <div>
            <ErrorMessage message="Please Define Address in your Profile" />
        </div>
      )}
    </div>
  );
};

export default AddressDisplay;
