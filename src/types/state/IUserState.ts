export interface IUserState {
  email: string | null | undefined;
  token: string | null | undefined;
  id: string | null | undefined;
}

export interface IAuthUserState extends IUserState {
  isAuth: boolean;
}
