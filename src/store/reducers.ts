import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './users/userSlice';
import { playgroundReducer } from './playground/playgroundSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  playground: playgroundReducer,
});
