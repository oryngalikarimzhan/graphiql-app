import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PlaygroundState {
  queryEditorValue: string;
  variablesEditorValue: string;
  headersEditorValue: string;
  responseEditorValue: string;
  isSchemaOpen: boolean;
  isParamsBoxOpen: boolean;
  paramsBoxEditor: 'variables' | 'headers';
  statusCode: string;
  isSuccess: boolean;
}

interface PlaygroundActions {
  setQueryEditorValue: (value: string) => void;
  setVariablesEditorValue: (value: string) => void;
  setHeadersEditorValue: (value: string) => void;
  setResponseEditorValue: (value: string) => void;
  changeParamsBoxEditor: (editor: 'variables' | 'headers') => void;
  setIsSchemaOpen: (isOpen: boolean) => void;
  setIsParamsBoxOpen: (isOpen: boolean) => void;
  setStatusCode: (status: string) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  resetPlaygroundStates: () => void;
}

const initialState: PlaygroundState = {
  queryEditorValue: '',
  variablesEditorValue: '',
  headersEditorValue: '',
  responseEditorValue: '',
  isSchemaOpen: false,
  isParamsBoxOpen: false,
  paramsBoxEditor: 'variables',
  statusCode: '',
  isSuccess: false,
};

export const usePlaygroundStore = create<PlaygroundState & PlaygroundActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setQueryEditorValue: (value) => set(() => ({ queryEditorValue: value })),
        setVariablesEditorValue: (value) => set(() => ({ variablesEditorValue: value })),
        setHeadersEditorValue: (value) => set(() => ({ headersEditorValue: value })),
        setResponseEditorValue: (value) => set(() => ({ responseEditorValue: value })),
        changeParamsBoxEditor: (editor) => set(() => ({ paramsBoxEditor: editor })),
        setIsSchemaOpen: (isOpen) => set(() => ({ isSchemaOpen: isOpen })),
        setIsParamsBoxOpen: (isOpen) => set(() => ({ isParamsBoxOpen: isOpen })),
        setStatusCode: (statusCode) => set(() => ({ statusCode: statusCode })),
        setIsSuccess: (isSuccess) => set(() => ({ isSuccess: isSuccess })),
        resetPlaygroundStates: () => set(initialState),
      }),
      {
        name: 'playground-store',
        version: 1,
      }
    )
  )
);
