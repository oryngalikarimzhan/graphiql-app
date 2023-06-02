import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

interface SchemaState {
  currentType: string;
  previousType: string;
  history: string[];
}

interface SchemaActions {
  setCurrentGraphqlType: (next: string) => void;
  setPreviousGraphqlType: () => void;
  resetSchemaStoreState: () => void;
}

const initialState: SchemaState = {
  currentType: 'Query',
  history: [],
  previousType: '',
};

export const schemaStore = create<SchemaState & SchemaActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setCurrentGraphqlType: (next) =>
          set((state) => ({
            history: [...state.history, state.currentType],
            previousType: state.currentType,
            currentType: next,
          })),
        setPreviousGraphqlType: () =>
          set((state) => {
            const history = state.history.slice(0, -1);
            return {
              currentType: state.previousType,
              history: history,
              previousType: history[history.length - 1] || '',
            };
          }),
        resetSchemaStoreState: () => set(initialState),
      }),
      {
        name: 'schema-store',
        version: 1,
      }
    )
  )
);

export const useSchemaStore = (<U>(selector: (state: SchemaState & SchemaActions) => U) => {
  return schemaStore(selector, shallow);
}) as typeof schemaStore;

Object.assign(useSchemaStore, schemaStore);
