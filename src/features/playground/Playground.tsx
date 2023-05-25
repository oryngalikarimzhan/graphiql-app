import { FC, useEffect } from 'react';
import { getIntrospectionQuery } from 'graphql';

import styles from './Playground.module.scss';
import { PlaygroundSideBar } from './playground-side-bar/PlaygroundSideBar';
import { ResponseSection } from './response-section/ResponseSection';
import { QuerySection } from './query-section/QuerySection';
import { useLazyGetDataQuery } from '../../store/api';
import { useActions, useAppSelector } from '../../store/hooks';
import { getErrorData, getErrorStatus, getErrorMessage } from 'utils/helpers/errorQuery';
import { SchemaSection } from './schema-section/SchemaSection';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../components/common/error-fallback/ErrorFallback';

export const Playground: FC = () => {
  const [getData, { isFetching }] = useLazyGetDataQuery();
  const [getSchema, { data: schema, isLoading, error }] = useLazyGetDataQuery();

  const { queryEditorValue, schemaIsOpen, variablesEditorValue, headersEditorValue } =
    useAppSelector((state) => state.playground);
  const { setSchemaIsOpen, setResponseEditorValue, setIsSuccess, setStatus } = useActions();

  useEffect(() => {
    if (!schema && schemaIsOpen) {
      getSchema({ query: getIntrospectionQuery() });
    }
  }, [getSchema, schema, schemaIsOpen]);

  const validateAndParse = (name: string, value: string) => {
    if (!value) return value;

    try {
      const result = JSON.parse(value);
      if (typeof result !== 'object') throw new Error(`${name} is not JSON object`);
      return result;
    } catch (e) {
      setResponseEditorValue(`Invalid ${name}. \n${getErrorMessage(e)}`);
      setStatus('');
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
        setStatus(getErrorStatus(data.error));
        setResponseEditorValue(JSON.stringify(getErrorData(data.error), null, '\t'));
      } else {
        setIsSuccess(true);
        setStatus('200');
        setResponseEditorValue(JSON.stringify(data.data, null, '\t'));
      }
    }
  };

  const graphqlSchemaHandler = () => {
    !schemaIsOpen && getSchema({ query: getIntrospectionQuery() });
    setSchemaIsOpen(!schemaIsOpen);
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
