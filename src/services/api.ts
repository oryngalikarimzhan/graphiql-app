import { getIntrospectionQuery } from 'graphql';
import { RegularObject } from './../utils/types/types';
import { GRAPHQL_API } from 'utils/constants/constants';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type GraphqlResponseData = { body: RegularObject; headers?: RegularObject };

export const fetchData = async ({ headers, body }: GraphqlResponseData) => {
  const { data } = await axios.post(GRAPHQL_API, body, {
    headers: { 'Content-Type': 'application/json', ...headers },
  });

  return data;
};

const fetchSchema = async () => {
  const { data } = await axios.post(
    GRAPHQL_API,
    { query: getIntrospectionQuery() },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return data;
};

export const useSchemaQuery = () => {
  return useQuery({
    queryKey: ['schema'],
    queryFn: fetchSchema,
    suspense: true,
  });
};
