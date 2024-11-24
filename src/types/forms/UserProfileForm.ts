export type UserAddressDetails = {
    userAddressId: number;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  };
  
export type UserDetails = {
    id: string;
    email: string;
    username: string;
    image?: string;
    signedUrl?: string;
    fullname: string;
    mobileNo: null | number;
    role: string;
    userAddress: UserAddressDetails[];
  };
  
export type UserDataProps = {
    initialUserData: UserDetails;
  };