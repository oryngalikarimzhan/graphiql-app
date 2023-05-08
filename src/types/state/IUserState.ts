export interface IUserState {
  email: string | null;
  token: string | null;
  id: string | null;
}

export interface IAuthUserState extends IUserState {
  isAuth: boolean;
}
