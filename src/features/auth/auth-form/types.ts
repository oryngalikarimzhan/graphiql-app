export interface IAuthFormProps {
  handleClick: (user: IAuthFormInputs) => void;
  contentContext: {
    title: string;
    question: string;
    redirectLink: string;
    redirectLinkTitle: string;
  };
  errorMessage?: string;
  isLoading?: boolean;
}

export interface IAuthFormInputs {
  email: string;
  password: string;
}
