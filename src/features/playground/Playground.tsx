import { FC } from 'react';
import { AxiosError } from 'axios';
import { shallow } from 'zustand/shallow';

import './styles.scss';
import { QueryBoundary } from 'components/common/query-boundary/QueryBoundary';
import { PlaygroundSideBar } from './playground-side-bar/PlaygroundSideBar';
import { QueryResponseSection } from './query-response-section/QueryResponseSection';
import { QueryRequestSection } from './query-request-section/QueryRequestSection';
import { SchemaSection } from './schema-section/SchemaSection';
import { useGraphqlDataQuery } from 'services/api';
import { usePlaygroundStore } from 'features/playground/usePlaygroundStore';
import { isErrorWithMessage } from 'utils/helpers/isErrorWithMessage';
import { CustomError } from 'utils/types/types';

export const Playground: FC = () => {
  const [
    isSchemaOpen,
    queryEditorValue,
    variablesEditorValue,
    headersEditorValue,
    setResponseEditorValue,
    setIsSuccess,
    setResponseStatus,
    apiEndpoint,
  ] = usePlaygroundStore(
    (state) => [
      state.isSchemaOpen,
      state.queryEditorValue,
      state.variablesEditorValue,
      state.headersEditorValue,
      state.setResponseEditorValue,
      state.setIsSuccess,
      state.setResponseStatus,
      state.apiEndpoint,
    ],
    shallow
  );

  const onSuccess = (data: unknown) => {
    setIsSuccess(true);
    setResponseStatus('200');
    setResponseEditorValue(JSON.stringify(data, null, '\t'));
  };

  const onError = (error: AxiosError | CustomError) => {
    setIsSuccess(false);
    if (!(error instanceof AxiosError) && isErrorWithMessage(error)) {
      setResponseStatus('Bad request');
      setResponseEditorValue(error.message);
    } else {
      setResponseStatus(`${error.response?.status}`);
      setResponseEditorValue(JSON.stringify(error.response?.data || error.message, null, '\t'));
    }
  };

  const { getGraphqlData, isLoading } = useGraphqlDataQuery(onSuccess, onError);

  return (
    <main className="playground">
      <PlaygroundSideBar
        onExecutorButtonClick={() =>
          getGraphqlData({
            endpoint: apiEndpoint,
            queryValue: queryEditorValue,
            variablesValue: variablesEditorValue,
            headersValue: headersEditorValue,
          })
        }
      />

      <article className="playground-container">
        {isSchemaOpen && (
          <QueryBoundary>
            <SchemaSection />
          </QueryBoundary>
        )}
        <QueryRequestSection />
        <QueryResponseSection isLoading={isLoading} />
      </article>
    </main>
  );
};
