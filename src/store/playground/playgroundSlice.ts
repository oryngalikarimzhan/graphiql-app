import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queryEditorValue: '',
  variablesEditorValue: '',
  headersEditorValue: '',
  schemaIsOpen: true,
  isParamsIsOpen: false,
  responseEditorValue: '',
  paramsEditor: <'variables' | 'headers'>'variables',
};

const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    setQueryEditorValue: (state, action) => {
      state.queryEditorValue = action.payload;
    },
    setVariablesEditorValue: (state, action) => {
      state.variablesEditorValue = action.payload;
    },
    setHeadersEditorValue: (state, action) => {
      state.headersEditorValue = action.payload;
    },
    setSchemaIsOpen: (state, action) => {
      state.schemaIsOpen = action.payload;
    },
    setParamsIsOpen: (state, action) => {
      state.isParamsIsOpen = action.payload;
    },
    setResponseEditorValue: (state, action) => {
      state.responseEditorValue = action.payload;
    },
    setParamsEditor: (state, action) => {
      state.paramsEditor = action.payload;
    },
  },
});

export const playgroundActions = playgroundSlice.actions;

export const playgroundReducer = playgroundSlice.reducer;
