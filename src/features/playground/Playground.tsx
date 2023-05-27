import { FC, useEffect } from 'react';
import { getIntrospectionQuery } from 'graphql';
import { ErrorBoundary } from 'react-error-boundary';

import styles from './Playground.module.scss';
import { PlaygroundSideBar } from './playground-side-bar/PlaygroundSideBar';
import { ResponseSection } from './response-section/ResponseSection';
import { QuerySection } from './query-section/QuerySection';
import { SchemaSection } from './schema-section/SchemaSection';
import { useLazyGetDataQuery } from 'store/api';
import { getErrorData, getErrorStatus, getErrorMessage } from 'utils/helpers/errorQuery';
import { ErrorFallback } from 'components/common/error-fallback/ErrorFallback';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

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

  const [getData, { isFetching }] = useLazyGetDataQuery();
  const [getSchema, { data: schema, isLoading, error }] = useLazyGetDataQuery();

  useEffect(() => {
    if (!schema && isSchemaOpen) {
      getSchema({ query: getIntrospectionQuery() });
    }
  }, [getSchema, schema, isSchemaOpen]);

  const validateAndParse = (name: string, value: string) => {
    if (!value) return value;

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

  const graphqlApiHandler = async () => {
    const variables = validateAndParse('Variables', variablesEditorValue);
    const headers = validateAndParse('Headers', headersEditorValue);

    if (variables !== undefined && headers !== undefined) {
      const data = await getData({
        query: queryEditorValue,
        variables: variables,
        headers: headers,
      });

      if (data.error) {
        setIsSuccess(false);
        setStatusCode(getErrorStatus(data.error));
        setResponseEditorValue(JSON.stringify(getErrorData(data.error), null, '\t'));
      } else {
        setIsSuccess(true);
        setStatusCode('200');
        setResponseEditorValue(JSON.stringify(data.data, null, '\t'));
      }
    }
  };

  const graphqlSchemaHandler = () => {
    !isSchemaOpen && getSchema({ query: getIntrospectionQuery() });
    setIsSchemaOpen(!isSchemaOpen);
  };

  return (
    <div className={styles.playground}>
      <PlaygroundSideBar
        graphqlSchemaHandler={graphqlSchemaHandler}
        graphqlApiHandler={graphqlApiHandler}
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
