import { FC } from 'react';
import { AxiosError } from 'axios';
import classNames from 'classnames';

import './styles.scss';
import { QueryBoundary } from 'components/common/query-boundary/QueryBoundary';
import { PlaygroundSideBar } from 'components/playground/playground-side-bar/PlaygroundSideBar';
import { PlaygroundSchema } from 'components/playground/playground-schema/PlaygroundSchema';
import { PlaygroundQuery } from 'components/playground/playground-query/PlaygroundQuery';
import { PlaygroundQueryParams } from 'components/playground/playground-query-params/PlaygroundQueryParams';
import { PlaygroundApi } from 'components/playground/playground-api/PlaygroundApi';
import { PlaygroundQueryResponse } from 'components/playground/playground-query-response/PlaygroundQueryResponse';
import { PlaygroundQueryHistory } from 'components/playground/playground-query-history/PlaygroundQueryHistory';
import { CustomError } from 'utils/types/types';
import { useGraphqlDataQuery } from 'services/api';
import { usePlaygroundStore } from 'store/usePlaygroundStore';
import { useQueryHistoryStore } from 'store/useQueryHistoryStore';

export const Playground: FC = () => {
  const [
    queryEditorValue,
    variablesEditorValue,
    headersEditorValue,
    apiEndpoint,
    isSideSectionOpen,
    currentOnSideSection,
    updateResponse,
  ] = usePlaygroundStore((state) => [
    state.queryEditorValue,
    state.variablesEditorValue,
    state.headersEditorValue,
    state.apiEndpoint,
    state.isSideSectionOpen,
    state.currentOnSideSection,
    state.updateResponse,
  ]);
  const addToHistory = useQueryHistoryStore((state) => state.addToHistory);

  const onSuccess = (data: unknown) => {
    const responseValue = JSON.stringify(data, null, '\t');
    updateResponse(responseValue, '200', true);
    addToHistory(queryEditorValue, variablesEditorValue, headersEditorValue, responseValue);
  };

  const onError = (error: AxiosError | CustomError) => {
    if (error instanceof AxiosError) {
      updateResponse(
        JSON.stringify(error.response?.data || error.message, null, '\t'),
        `${error.response?.status || error.code}`,
        false
      );
    } else {
      updateResponse(error.message, 'Bad request', false);
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
        <section
          className={classNames('playground-section', { 'section-hidden': !isSideSectionOpen })}
        >
          {currentOnSideSection === 'schema' ? (
            <QueryBoundary>
              <PlaygroundSchema />
            </QueryBoundary>
          ) : (
            <PlaygroundQueryHistory />
          )}
        </section>
        <section className="playground-section">
          <PlaygroundQuery />
          <PlaygroundQueryParams />
        </section>
        <section className="playground-section">
          <PlaygroundApi />
          <PlaygroundQueryResponse isLoading={isLoading} />
        </section>
      </article>
    </main>
  );
};

export default Playground;
