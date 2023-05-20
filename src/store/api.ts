import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GRAPHQL_API } from '../configs/constants';

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery({ baseUrl: GRAPHQL_API }),
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
