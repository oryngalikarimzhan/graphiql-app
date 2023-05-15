import { userActions } from './users/userSlice';
import { playgroundActions } from './playground/playgroundSlice';
import { schemaActions } from './schema/schemaSlice';

export const actions = {
  ...userActions,
  ...playgroundActions,
  ...schemaActions,
};
