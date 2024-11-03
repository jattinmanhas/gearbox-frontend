export type SignupInitialStateTypes = {
  status: number;
  message: string;
  data: null;
};

type SignupForm = (
  prevState: SignupInitialStateTypes,
  formData: FormData
) => Promise<SignupInitialStateTypes>;

export type SignupFormProps = {
    action: SignupForm
}