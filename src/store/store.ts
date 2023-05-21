import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducers';
import { graphqlApi } from './api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(graphqlApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
