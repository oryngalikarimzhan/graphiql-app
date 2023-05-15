import { userActions } from './users/userSlice';
import { playgroundActions } from './playground/playgroundSlice';

export const actions = {
  ...userActions,
  ...playgroundActions,
};
