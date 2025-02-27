export type UserLoginResponse = {
  id: string;
  username: string;
  email: string;
  roleId: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
};

export type initialStateTypes = {
  status: number;
  message: string;
  data: null | UserLoginResponse;
};

export type LoginFunction = (
  formData: FormData
) => Promise<initialStateTypes>;

export type LoginFormProps = {
  action: LoginFunction;
};

export type LoginResponse = {
  flag: boolean;
  data: UserLoginResponse;
  message: string;
};
