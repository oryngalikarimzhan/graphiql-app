import { createSlice } from '@reduxjs/toolkit';

import { ISchemaInitialState } from './types';

const initialState: ISchemaInitialState = {
  currentType: 'Query',
  history: [],
  previousType: '',
};

const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setCurrentGraphqlType: (state, action) => {
      state.history.push(state.currentType);
      state.previousType = state.history[state.history.length - 1];
      state.currentType = action.payload;
    },
    getPreviousGraphqlType: (state) => {
      state.currentType = state.previousType;
      state.history.pop();
      state.previousType = state.history[state.history.length - 1] || '';
    },
    resetSchemaProgress: () => initialState,
  },
});

export const schemaActions = schemaSlice.actions;

export const schemaReducer = schemaSlice.reducer;
