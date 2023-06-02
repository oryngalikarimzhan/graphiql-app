import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

interface QueryHistoryState {
  queryHistory: {
    id: string;
    query: string;
    variables: string;
    headers: string;
    response: string;
  }[];
}

interface QueryHistoryActions {
  addToHistory: (query: string, variables: string, headers: string, response: string) => void;
  deleteFromHistory: (id: string) => void;
  resetQueryHistoryStoreStates: () => void;
}

const initialState: QueryHistoryState = {
  queryHistory: [],
};

const queryHistoryStore = create<QueryHistoryState & QueryHistoryActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        addToHistory: (query, variables, headers, response) =>
          set((state) => {
            const newItem = { query, variables, headers, response };

            const hasDuplicate = state.queryHistory.some(
              (item) =>
                query === item.query &&
                variables === item.variables &&
                headers === item.headers &&
                response === item.response
            );

            if (hasDuplicate) return state;

            return {
              queryHistory: [...state.queryHistory, { ...newItem, id: crypto.randomUUID() }],
            };
          }),
        deleteFromHistory: (id) =>
          set((state) => ({
            queryHistory: state.queryHistory.filter((item) => item.id !== id),
          })),
        resetQueryHistoryStoreStates: () => set(initialState),
      }),
      {
        name: 'history-store',
        version: 1,
      }
    )
  )
);

export const useQueryHistoryStore = (<U>(
  selector: (state: QueryHistoryState & QueryHistoryActions) => U
) => {
  return queryHistoryStore(selector, shallow);
}) as typeof queryHistoryStore;

Object.assign(useQueryHistoryStore, queryHistoryStore);
