import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { getIntrospectionQuery } from 'graphql';
import { RegularObject } from 'utils/types/types';
import { GRAPHQL_API } from 'utils/constants/constants';
import { validateStringAndParseToObject } from 'utils/helpers/validateStringAndParseToObject';
import { isErrorWithMessage } from 'utils/helpers/isErrorWithMessage';

type GraphqlRequestParams = {
  body: {
    query: string;
    variables?: RegularObject;
  };
  headers?: RegularObject;
};

type RequestValues = {
  queryValue: string;
  variablesValue: string;
  headersValue: string;
};

const fetchData = async ({ body, headers }: GraphqlRequestParams) => {
  const { data } = await axios.post(GRAPHQL_API, body, {
    headers: { 'Content-Type': 'application/json', ...headers },
  });

  return data;
};

export const fetchQueryResponse = async ({
  queryValue,
  variablesValue,
  headersValue,
}: RequestValues) => {
  const validatedVariables = validateStringAndParseToObject('Variables', variablesValue);
  const validatedHeaders = validateStringAndParseToObject('Headers', headersValue);

  if (!isErrorWithMessage(validatedVariables)) {
    if (!isErrorWithMessage(validatedHeaders)) {
      return fetchData({
        body: {
          query: queryValue,
          variables: typeof validatedVariables === 'string' ? undefined : validatedVariables,
        },
        headers: typeof validatedHeaders === 'string' ? undefined : validatedHeaders,
      });
    }
    return validatedHeaders;
  }
  return validatedVariables;
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
