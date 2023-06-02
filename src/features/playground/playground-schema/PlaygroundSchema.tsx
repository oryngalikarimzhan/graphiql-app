import { FC, lazy } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './PlaygroundSchema.module.scss';
import { usePlaygroundStore } from 'store/usePlaygroundStore';
import { useSchemaQuery } from 'services/api';
const Schema = lazy(() => import('features/schema/Schema'));

export const PlaygroundSchema: FC = () => {
  const apiEndpoint = usePlaygroundStore((state) => state.apiEndpoint);
  const { t } = useTranslation();
  const { data: schema } = useSchemaQuery(apiEndpoint);

  return (
    <section className={classnames('box-container', styles.schemaContainer)}>
      <div className="playground-section-heading">
        <h3 className="playground-section-title">{t('studio.schema')}</h3>
      </div>

      <Schema schemaData={schema.data} />
    </section>
  );
};
