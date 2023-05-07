export interface IAuthProps {
  addUser: (user: IAuthFormInputs) => void;
  buttonName: string;
}

export interface IAuthFormInputs {
  email: string;
  password: string;
}
