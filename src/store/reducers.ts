import { combineReducers } from '@reduxjs/toolkit';
import { usersReducer } from './users/usersSlice';

export const rootReducer = combineReducers({
  users: usersReducer,
});
