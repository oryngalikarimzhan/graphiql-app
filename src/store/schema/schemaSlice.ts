import { createSlice } from '@reduxjs/toolkit';

interface SchemaInitialState {
  currentType: string;
  history: string[];
  previousType: string;
}

const initialState: SchemaInitialState = {
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
