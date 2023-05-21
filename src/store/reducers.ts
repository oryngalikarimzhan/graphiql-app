import { combineReducers } from '@reduxjs/toolkit';

import { playgroundReducer } from './playground/playgroundSlice';
import { schemaReducer } from './schema/schemaSlice';
import { graphqlApi } from './api';

export const rootReducer = combineReducers({
  playground: playgroundReducer,
  schema: schemaReducer,
  [graphqlApi.reducerPath]: graphqlApi.reducer,
});
