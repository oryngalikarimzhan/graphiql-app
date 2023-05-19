import { FC } from 'react';

import styles from './Playground.module.scss';
import { PlaygroundSideBar } from './playground-side-bar/PlaygroundSideBar';
import { SchemaSection } from './schema-section/SchemaSection';
import { ResponseSection } from './response-section/ResponseSection';
import { QuerySection } from './query-section/QuerySection';
import { useLazyGetDataQuery } from '../../store/api';
import { useActions, useAppSelector } from '../../store/hooks';
import { getIntrospectionQuery } from 'graphql';
import { getErrorData, getErrorStatus } from '../../helper/errorQuery';

export const Playground: FC = () => {
  const [getData, { isFetching }] = useLazyGetDataQuery();
  const [getSchema, { data: schema, isFetching: isSchemeFetching }] = useLazyGetDataQuery();

  const { queryEditorValue, schemaIsOpen, variablesEditorValue } = useAppSelector(
    (state) => state.playground
  );
  const { setSchemaIsOpen, setResponseEditorValue, setIsSuccess, setStatus } = useActions();

  const graphqlApiHandler = async () => {
    const data = await getData({
      query: queryEditorValue,
      variables: variablesEditorValue ? JSON.parse(variablesEditorValue) : '',
    });
    console.log(data);

    if (data.error) {
      setIsSuccess(false);
      setStatus(getErrorStatus(data.error));
      setResponseEditorValue(JSON.stringify(getErrorData(data.error), null, '\t'));
    } else {
      setIsSuccess(true);
      setStatus('200');
      setResponseEditorValue(JSON.stringify(data.data, null, '\t'));
    }
  };

  const graphqlSchemeHandler = () => {
    !schemaIsOpen && getSchema({ query: getIntrospectionQuery() });
    setSchemaIsOpen(!schemaIsOpen);
  };

  return (
    <div className={styles.playground}>
      <PlaygroundSideBar
        graphqlSchemeHandler={graphqlSchemeHandler}
        graphqlApiHandler={graphqlApiHandler}
      />

      <article className={styles.playgroundContainer}>
        <SchemaSection schema={schema} isFetching={isSchemeFetching} />
        <QuerySection />
        <ResponseSection isFetching={isFetching} />
      </article>
    </div>
  );
};
