import { FC, Suspense, lazy, useEffect } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { IntrospectionQuery } from 'graphql';
import { useErrorBoundary } from 'react-error-boundary';

import styles from '../Playground.module.scss';
import { usePlaygroundStore } from 'store/usePlaygroundStore';
import { LoaderSection } from 'components/common/section-loader/LoaderSection';

const SchemaLazy = lazy(() => import('../../schema/Schema'));

interface SchemaSectionProps {
  schema: {
    data: IntrospectionQuery;
  };
  isLoading: boolean;
  error: unknown;
}

export const SchemaSection: FC<SchemaSectionProps> = ({ schema, isLoading, error }) => {
  const isSchemaOpen = usePlaygroundStore((state) => state.isSchemaOpen);
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
        [styles.schemaContainerHidden]: !isSchemaOpen,
      })}
    >
      <div className={styles.schemaHeading}>
        <h3 className={styles.schemaTitle}>{t('studio.schema')}</h3>
      </div>
      {isLoading ? (
        <LoaderSection />
      ) : (
        !!schema && (
          <Suspense fallback={<LoaderSection />}>
            <SchemaLazy schemaData={schema.data} />
          </Suspense>
        )
      )}
    </div>
  );
};
