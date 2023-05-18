import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import appConfig from '../config/AppConfig';

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery({ baseUrl: appConfig.apiUrl }),
  endpoints: (build) => ({
    getData: build.query({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLazyGetDataQuery } = graphqlApi;
