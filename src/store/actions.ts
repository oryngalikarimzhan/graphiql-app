import { playgroundActions } from './playground/playgroundSlice';
import { schemaActions } from './schema/schemaSlice';

export const actions = {
  ...playgroundActions,
  ...schemaActions,
};
