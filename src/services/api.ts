import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { getIntrospectionQuery } from 'graphql';
import { RegularObject } from 'utils/types/types';
import { GRAPHQL_API } from 'utils/constants/constants';
import { validateStringAndParseToObject } from 'utils/helpers/validateStringAndParseToObject';
import { isErrorWithMessage } from 'utils/helpers/isErrorWithMessage';

type GraphqlResponseData = { body: RegularObject; headers?: RegularObject };

type EditorValues = {
  queryEditorValue: string;
  variablesEditorValue: string;
  headersEditorValue: string;
};

const fetchData = async ({ headers, body }: GraphqlResponseData) => {
  const { data } = await axios.post(GRAPHQL_API, body, {
    headers: { 'Content-Type': 'application/json', ...headers },
  });

  return data;
};

export const fetchQueryResponse = async ({
  queryEditorValue,
  variablesEditorValue,
  headersEditorValue,
}: EditorValues) => {
  const variables = validateStringAndParseToObject('Variables', variablesEditorValue);
  const headers = validateStringAndParseToObject('Headers', headersEditorValue);

  if (!isErrorWithMessage(variables)) {
    if (!isErrorWithMessage(headers)) {
      return fetchData({
        body: {
          query: queryEditorValue,
          variables: variables,
        },
        headers: headers,
      });
    }
    return headers;
  }
  return variables;
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
