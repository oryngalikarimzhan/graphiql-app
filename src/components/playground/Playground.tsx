import { FC } from 'react';

import styles from './Playground.module.scss';
import { PlaygroundSideBar } from './playground-side-bar/PlaygroundSideBar';
import { SchemaSection } from './schema-section/SchemaSection';
import { ResponseSection } from './response-section/ResponseSection';
import { QuerySection } from './query-section/QuerySection';

export const Playground: FC = () => {
  return (
    <div className={styles.playground}>
      <PlaygroundSideBar />

      <article className={styles.playgroundContainer}>
        <SchemaSection />
        <QuerySection />
        <ResponseSection />
      </article>
    </div>
  );
};
