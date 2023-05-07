export interface IUserState {
  email: string;
  token: string;
  id: string;
}

export interface IAuthUserState extends IUserState {
  isAuth: boolean;
}
