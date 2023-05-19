import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import appConfig from '../config/AppConfig';

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery({ baseUrl: appConfig.apiUrl }),
  endpoints: (build) => ({
    getData: build.query({
      query: (args) => ({
        url: '',
        method: 'POST',
        body: { query: args.query, variables: args.variables },
        headers: { ...args.headers },
      }),
    }),
  }),
});

export const { useLazyGetDataQuery } = graphqlApi;
