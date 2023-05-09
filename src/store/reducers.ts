import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './users/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});
