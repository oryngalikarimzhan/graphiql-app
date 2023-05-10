export interface IAuthProps {
  handleClick: (user: IAuthFormInputs) => void;
  buttonName: string;
  errorMessage?: string;
  isloading?: boolean;
}

export interface IAuthFormInputs {
  email: string;
  password: string;
}
