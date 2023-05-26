import { FC, Suspense, lazy, useEffect } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { IntrospectionQuery } from 'graphql';

import styles from '../Playground.module.scss';
import { useAppSelector } from 'store/hooks';
import { SectionLoading } from '../section-loading/SectionLoading';
import { useErrorBoundary } from 'react-error-boundary';

const SchemaLazy = lazy(() => import('../../schema/Schema'));

interface SchemaSectionProps {
  schema: {
    data: IntrospectionQuery;
  };
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const SchemaSection: FC<SchemaSectionProps> = ({ schema, isLoading, error }) => {
  const { schemaIsOpen } = useAppSelector((state) => state.playground);
  const { t } = useTranslation();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (error) {
      showBoundary(error);
    }
  }, [error, showBoundary]);

  return (
    <div
      className={classnames(styles.playgroundSection, styles.schemaContainer, {
        [styles.schemaContainerHidden]: !schemaIsOpen,
      })}
    >
      <div className={styles.schemaHeading}>
        <h3 className={styles.schemaTitle}>{t('studio.schema')}</h3>
      </div>
      {isLoading ? (
        <SectionLoading />
      ) : (
        !!schema && (
          <Suspense fallback={<SectionLoading />}>
            <SchemaLazy schemaData={schema.data} />
          </Suspense>
        )
      )}
    </div>
  );
};
