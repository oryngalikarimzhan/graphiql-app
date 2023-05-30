import { FC } from 'react';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { shallow } from 'zustand/shallow';

import './styles.scss';
import { QueryBoundary } from 'components/common/query-boundary/QueryBoundary';
import { PlaygroundSideBar } from './playground-side-bar/PlaygroundSideBar';
import { QueryResponseSection } from './query-response-section/QueryResponseSection';
import { QueryRequestSection } from './query-request-section/QueryRequestSection';
import { SchemaSection } from './schema-section/SchemaSection';
import { fetchQueryResponse } from 'services/api';
import { usePlaygroundStore } from 'store/usePlaygroundStore';
import { isErrorWithMessage } from 'utils/helpers/isErrorWithMessage';

export const Playground: FC = () => {
  const [
    isSchemaOpen,
    queryEditorValue,
    variablesEditorValue,
    headersEditorValue,
    setResponseEditorValue,
    setIsSuccess,
    setStatusCode,
  ] = usePlaygroundStore(
    (state) => [
      state.isSchemaOpen,
      state.queryEditorValue,
      state.variablesEditorValue,
      state.headersEditorValue,
      state.setResponseEditorValue,
      state.setIsSuccess,
      state.setStatusCode,
    ],
    shallow
  );

  const { mutate: getResponseData, isLoading } = useMutation({
    mutationKey: ['response'],
    mutationFn: fetchQueryResponse,
    onSuccess: (data) => {
      if (isErrorWithMessage(data)) {
        setResponseEditorValue(data.message);
        setStatusCode('Bad request');
        setIsSuccess(false);
      } else if (data) {
        setIsSuccess(true);
        setStatusCode('200');
        setResponseEditorValue(JSON.stringify(data, null, '\t'));
      }
    },
    onError: (error: AxiosError) => {
      setIsSuccess(false);
      setStatusCode(`${error.response?.status}`);
      setResponseEditorValue(JSON.stringify(error.response?.data || '', null, '\t'));
    },
  });

  return (
    <div className="playground">
      <PlaygroundSideBar
        onExecutorButtonClick={() =>
          getResponseData({
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
    </div>
  );
};
