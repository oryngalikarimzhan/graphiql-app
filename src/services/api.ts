import axios, { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getIntrospectionQuery } from 'graphql';
import { CustomError, RegularObject } from 'utils/types/types';
import { validateStringAndParseToObject } from 'utils/helpers/validateStringAndParseToObject';
import { isErrorWithMessage } from 'utils/helpers/isErrorWithMessage';

type GraphqlRequestParams = {
  endpoint: string;
  body: {
    query: string;
    variables?: RegularObject;
  };
  headers?: RegularObject;
};

type RequestValues = {
  endpoint: string;
  queryValue: string;
  variablesValue: string;
  headersValue: string;
};

const fetchData = async ({ endpoint, body, headers }: GraphqlRequestParams) => {
  const { data } = await axios.post(endpoint, body, {
    headers: { 'Content-Type': 'application/json', ...headers },
  });

  return data;
};

const fetchQueryResponse = async ({
  endpoint,
  queryValue,
  variablesValue,
  headersValue,
}: RequestValues) => {
  const validatedVariables = validateStringAndParseToObject('variables', variablesValue, false);
  const validatedHeaders = validateStringAndParseToObject('request headers', headersValue);

  if (!isErrorWithMessage(validatedVariables)) {
    if (!isErrorWithMessage(validatedHeaders)) {
      return fetchData({
        endpoint: endpoint,
        body: {
          query: queryValue,
          variables: typeof validatedVariables === 'string' ? undefined : validatedVariables,
        },
        headers: typeof validatedHeaders === 'string' ? undefined : validatedHeaders,
      });
    }
    return new Promise((_, reject) => reject(validatedHeaders));
  }
  return new Promise((_, reject) => reject(validatedVariables));
};

const fetchSchema = async (endpoint: string) => {
  const { data } = await axios.post(
    endpoint,
    { query: getIntrospectionQuery() },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return data;
};

export const useSchemaQuery = (endpoint: string) => {
  return useQuery({
    queryKey: ['schema', endpoint],
    queryFn: () => fetchSchema(endpoint),
    suspense: true,
  });
};

export const useGraphqlDataQuery = (
  onSuccess: (data: unknown) => void,
  onError: (error: AxiosError | CustomError) => void
) => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ['response'],
    mutationFn: fetchQueryResponse,
    onSuccess: onSuccess,
    onError: onError,
  });

  return { getGraphqlData: mutate, ...rest };
};
