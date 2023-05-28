import { getIntrospectionQuery } from 'graphql';
import { RegularObject } from './../utils/types/types';
import { GRAPHQL_API } from 'utils/constants/constants';
import axios from 'axios';

type GraphqlResponseData = { body: RegularObject; headers?: RegularObject };

export const fetchData = async ({ headers, body }: GraphqlResponseData) => {
  const { data } = await axios.post(GRAPHQL_API, body, {
    headers: { 'Content-Type': 'application/json', ...headers },
  });

  return data;
};

export const fetchSchema = async () => {
  const { data } = await axios.post(
    GRAPHQL_API,
    { query: getIntrospectionQuery() },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return data;
};
