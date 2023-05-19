import { FC } from 'react';

import styles from './Playground.module.scss';
import { PlaygroundSideBar } from './playground-side-bar/PlaygroundSideBar';
import { SchemaSection } from './schema-section/SchemaSection';
import { ResponseSection } from './response-section/ResponseSection';
import { QuerySection } from './query-section/QuerySection';
import { useLazyGetDataQuery } from '../../store/api';

export const Playground: FC = () => {
  const [getData, { isLoading }] = useLazyGetDataQuery({});

  return (
    <div className={styles.playground}>
      <PlaygroundSideBar getData={getData} />

      <article className={styles.playgroundContainer}>
        <SchemaSection />
        <QuerySection />
        <ResponseSection />
      </article>
    </div>
  );
};
