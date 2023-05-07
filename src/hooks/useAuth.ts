import { useAppSelector } from '../store/hooks';
import { IAuthUserState } from '../types/state/IUserState';

export const useAuth = (): IAuthUserState => {
  const { email, id, token } = useAppSelector((state) => state.user);

  return { isAuth: !!email, email, id, token };
};
