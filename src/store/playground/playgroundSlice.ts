import { createSlice } from '@reduxjs/toolkit';

interface PlaygroundState {
  queryEditorValue: string;
  variablesEditorValue: string;
  headersEditorValue: string;
  schemaIsOpen: boolean;
  isParamsOpen: boolean;
  responseEditorValue: string;
  paramsEditor: 'variables' | 'headers';
  status: string;
  isSuccess: boolean;
}

const initialState: PlaygroundState = {
  queryEditorValue: '',
  variablesEditorValue: '',
  headersEditorValue: '',
  schemaIsOpen: false,
  isParamsOpen: false,
  responseEditorValue: '',
  paramsEditor: 'variables',
  status: '',
  isSuccess: false,
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
    setIsParamsOpen: (state, action) => {
      state.isParamsOpen = action.payload;
    },
    setResponseEditorValue: (state, action) => {
      state.responseEditorValue = action.payload;
    },
    setParamsEditor: (state, action) => {
      state.paramsEditor = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    resetPlaygroundProgress: () => initialState,
  },
});

export const playgroundActions = playgroundSlice.actions;

export const playgroundReducer = playgroundSlice.reducer;
