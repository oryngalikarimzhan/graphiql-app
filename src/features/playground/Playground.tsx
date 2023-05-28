import { FC } from 'react';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import './styles.scss';
import { QueryBoundary } from 'components/common/query-boundary/QueryBoundary';
import { PlaygroundSideBar } from './playground-side-bar/PlaygroundSideBar';
import { QueryResponseSection } from './query-response-section/QueryResponseSection';
import { QueryRequestSection } from './query-request-section/QueryRequestSection';
import { SchemaSection } from './schema-section/SchemaSection';
import { getErrorData, getErrorMessage } from 'utils/helpers/errorQuery';
import { fetchData } from 'services/api';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

export const Playground: FC = () => {
  const [
    isSchemaOpen,
    queryEditorValue,
    variablesEditorValue,
    headersEditorValue,
    setResponseEditorValue,
    setIsSuccess,
    setStatusCode,
  ] = usePlaygroundStore((state) => [
    state.isSchemaOpen,
    state.queryEditorValue,
    state.variablesEditorValue,
    state.headersEditorValue,
    state.setResponseEditorValue,
    state.setIsSuccess,
    state.setStatusCode,
  ]);

  const validateAndParse = (name: string, value: string) => {
    if (!value.trim()) return '';

    try {
      const result = JSON.parse(value);
      if (typeof result !== 'object') throw new Error(`${name} is not JSON object`);
      return result;
    } catch (e) {
      setResponseEditorValue(`Invalid ${name}. \n${getErrorMessage(e)}`);
      setStatusCode('');
      setIsSuccess(false);
    }
  };

  const { mutate: getResponseData, isLoading: isFetching } = useMutation({
    mutationKey: ['response'],
    mutationFn: async () => {
      const variables = validateAndParse('Variables', variablesEditorValue);
      const headers = validateAndParse('Headers', headersEditorValue);

      if (variables !== undefined && headers !== undefined) {
        return fetchData({
          body: {
            query: queryEditorValue,
            variables: variables,
          },
          headers: headers,
        });
      }
      return null;
    },
    onSuccess: (data) => {
      if (data) {
        setIsSuccess(true);
        setStatusCode('200');
        setResponseEditorValue(JSON.stringify(data, null, '\t'));
      }
    },
    onError: (error: AxiosError) => {
      setIsSuccess(false);
      setStatusCode(`${error.response?.status || '500'}`);
      setResponseEditorValue(JSON.stringify(getErrorData(error.response), null, '\t'));
    },
  });

  return (
    <div className="playground">
      <PlaygroundSideBar onExecutorButtonClick={getResponseData} />

      <article className="playground-container">
        {isSchemaOpen && (
          <QueryBoundary>
            <SchemaSection />
          </QueryBoundary>
        )}
        <QueryRequestSection />
        <QueryResponseSection isFetching={isFetching} />
      </article>
    </div>
  );
};
