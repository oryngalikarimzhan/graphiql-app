import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './users/userSlice';
import { playgroundReducer } from './playground/playgroundSlice';
import { schemaReducer } from './schema/schemaSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  playground: playgroundReducer,
  schema: schemaReducer,
});
