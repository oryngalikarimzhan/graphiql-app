import { combineReducers } from '@reduxjs/toolkit';

import { graphqlApi } from './api';

export const rootReducer = combineReducers({
  [graphqlApi.reducerPath]: graphqlApi.reducer,
});
