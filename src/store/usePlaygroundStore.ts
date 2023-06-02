import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { devtools, persist } from 'zustand/middleware';
import { GRAPHQL_DEFAULT_API } from 'utils/constants/constants';

interface PlaygroundState {
  queryEditorValue: string;
  variablesEditorValue: string;
  headersEditorValue: string;
  responseEditorValue: string;
  isParamsBoxOpen: boolean;
  currentOnParamsBox: 'variables' | 'headers';
  apiEndpoint: string;
  isSideSectionOpen: boolean;
  currentOnSideSection: 'schema' | 'history';
  responseStatus: string;
  isSuccessResponse: boolean | undefined;
}

interface PlaygroundActions {
  setQueryEditorValue: (value: string) => void;
  setVariablesEditorValue: (value: string) => void;
  setHeadersEditorValue: (value: string) => void;
  setResponseEditorValue: (value: string) => void;
  setAllEditorsValue: (
    queryValue: string,
    variablesValue: string,
    headersValue: string,
    responseValue: string
  ) => void;
  toggleIsParamsBoxOpen: () => void;
  changeCurrentOnParamsBox: (editor: 'variables' | 'headers') => void;
  setApiEndpoint: (endpoint: string) => void;
  changeCurrentOnSideSection: (current: 'schema' | 'history') => void;
  closeSideSection: () => void;
  updateResponse: (value: string, status: string, isSuccess: boolean | undefined) => void;
  resetPlaygroundStoreState: () => void;
}

const initialState: PlaygroundState = {
  queryEditorValue: GRAPHQL_DEFAULT_API.query,
  variablesEditorValue: GRAPHQL_DEFAULT_API.variables,
  headersEditorValue: '',
  responseEditorValue: '',
  isParamsBoxOpen: false,
  currentOnParamsBox: 'variables',
  apiEndpoint: GRAPHQL_DEFAULT_API.api,
  isSideSectionOpen: false,
  currentOnSideSection: 'history',
  responseStatus: '',
  isSuccessResponse: undefined,
};

const playgroundStore = create<PlaygroundState & PlaygroundActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setQueryEditorValue: (value) => set({ queryEditorValue: value }),
        setVariablesEditorValue: (value) => set({ variablesEditorValue: value }),
        setHeadersEditorValue: (value) => set({ headersEditorValue: value }),
        setResponseEditorValue: (value) => set({ responseEditorValue: value }),
        setAllEditorsValue: (queryValue, variablesValue, headersValue, responseValue) =>
          set({
            queryEditorValue: queryValue,
            variablesEditorValue: variablesValue,
            headersEditorValue: headersValue,
            responseEditorValue: responseValue,
          }),
        toggleIsParamsBoxOpen: () => set((state) => ({ isParamsBoxOpen: !state.isParamsBoxOpen })),
        changeCurrentOnParamsBox: (current) =>
          set({ currentOnParamsBox: current, isParamsBoxOpen: true }),
        setApiEndpoint: (endpoint) => set({ apiEndpoint: endpoint }),

        changeCurrentOnSideSection: (current) =>
          set({ currentOnSideSection: current, isSideSectionOpen: true }),
        closeSideSection: () => set({ isSideSectionOpen: false }),
        updateResponse: (value, status, isSuccess) =>
          set({ responseEditorValue: value, responseStatus: status, isSuccessResponse: isSuccess }),
        resetPlaygroundStoreState: () => set(initialState),
      }),
      {
        name: 'playground-store',
        version: 1,
      }
    )
  )
);

export const usePlaygroundStore = (<U>(
  selector: (state: PlaygroundState & PlaygroundActions) => U
) => {
  return playgroundStore(selector, shallow);
}) as typeof playgroundStore;

Object.assign(usePlaygroundStore, playgroundStore);
