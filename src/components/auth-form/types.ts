export interface IAuthProps {
  handleClick: (user: IAuthFormInputs) => void;
  buttonName: string;
  errorMessage?: string;
  disabled?: boolean;
}

export interface IAuthFormInputs {
  email: string;
  password: string;
}
