export interface IAuthProps {
  handleClick: (user: IAuthFormInputs) => void;
  buttonName: string;
  errorMessage?: string;
  isLoading?: boolean;
}

export interface IAuthFormInputs {
  email: string;
  password: string;
}
