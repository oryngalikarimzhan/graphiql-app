import { FC, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import styles from './Playground.module.scss';
import { PlaygroundSideBar } from './playground-side-bar/PlaygroundSideBar';
import { ResponseSection } from './response-section/ResponseSection';
import { QuerySection } from './query-section/QuerySection';
import { SchemaSection } from './schema-section/SchemaSection';
import { getErrorData, getErrorMessage } from 'utils/helpers/errorQuery';
import { ErrorFallback } from 'components/common/error-fallback/ErrorFallback';
import { usePlaygroundStore } from 'store/usePlaygroundStore';
import { fetchData, fetchSchema } from 'services/api';

export const Playground: FC = () => {
  const [
    isSchemaOpen,
    setIsSchemaOpen,
    queryEditorValue,
    variablesEditorValue,
    headersEditorValue,
    setResponseEditorValue,
    setIsSuccess,
    setStatusCode,
  ] = usePlaygroundStore((state) => [
    state.isSchemaOpen,
    state.setIsSchemaOpen,
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

  const {
    mutate: getSchemaData,
    data: schema,
    isLoading,
    error,
  } = useMutation({
    mutationKey: ['schema'],
    mutationFn: fetchSchema,
  });

  useEffect(() => {
    if (!schema && isSchemaOpen) {
      getSchemaData();
    }
  }, [getSchemaData, schema, isSchemaOpen]);

  const onDocsButtonClick = () => {
    !isSchemaOpen && getSchemaData();
    setIsSchemaOpen(!isSchemaOpen);
  };

  return (
    <div className={styles.playground}>
      <PlaygroundSideBar
        onDocsButtonClick={onDocsButtonClick}
        onExecutorButtonClick={getResponseData}
      />

      <article className={styles.playgroundContainer}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <SchemaSection schema={schema} isLoading={isLoading} error={error} />
        </ErrorBoundary>
        <QuerySection />
        <ResponseSection isFetching={isFetching} />
      </article>
    </div>
  );
};
