import { combineReducers } from '@reduxjs/toolkit';
import { playgroundReducer } from './playground/playgroundSlice';
import { schemaReducer } from './schema/schemaSlice';

export const rootReducer = combineReducers({
  playground: playgroundReducer,
  schema: schemaReducer,
});
