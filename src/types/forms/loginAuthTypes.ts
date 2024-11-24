export type UserLoginResponse = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export type initialStateTypes = {
  status: number;
  message: string;
  data: null | UserLoginResponse;
};

export type LoginFunction = (
  prevState: initialStateTypes,
  formData: FormData
) => Promise<initialStateTypes>;

export type LoginFormProps = {
  action: LoginFunction;
};

export type LoginResponse = {
  flag: boolean;
  tokens: {
    token: string;
  };
  data: UserLoginResponse;
  message: string;
};
