import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { GRAPHQL_DEFAULT_API } from 'utils/constants/constants';

interface PlaygroundState {
  queryEditorValue: string;
  variablesEditorValue: string;
  headersEditorValue: string;
  responseEditorValue: string;
  isSchemaOpen: boolean;
  isParamsBoxOpen: boolean;
  paramsBoxEditor: 'variables' | 'headers';
  responseStatus: string;
  isSuccess: boolean | undefined;
  apiEndpoint: string;
}

interface PlaygroundActions {
  setQueryEditorValue: (value: string) => void;
  setVariablesEditorValue: (value: string) => void;
  setHeadersEditorValue: (value: string) => void;
  setResponseEditorValue: (value: string) => void;
  changeParamsBoxEditor: (editor: 'variables' | 'headers') => void;
  setIsSchemaOpen: (isOpen: boolean) => void;
  setIsParamsBoxOpen: (isOpen: boolean) => void;
  setResponseStatus: (status: string) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setApiEndpoint: (endpoint: string) => void;
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
  responseStatus: '',
  isSuccess: undefined,
  apiEndpoint: GRAPHQL_DEFAULT_API,
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
        setResponseStatus: (responseStatus) => set(() => ({ responseStatus: responseStatus })),
        setIsSuccess: (isSuccess) => set(() => ({ isSuccess: isSuccess })),
        setApiEndpoint: (endpoint) => set(() => ({ apiEndpoint: endpoint })),
        resetPlaygroundStates: () => set(initialState),
      }),
      {
        name: 'playground-store',
        version: 1,
      }
    )
  )
);
