import { FC, lazy } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './SchemaSection.module.scss';
import { usePlaygroundStore } from 'store/usePlaygroundStore';
import { useSchemaQuery } from 'services/api';

const SchemaLazy = lazy(() => import('../../schema/Schema'));

export const SchemaSection: FC = () => {
  const isSchemaOpen = usePlaygroundStore((state) => state.isSchemaOpen);
  const { t } = useTranslation();
  const { data: schema } = useSchemaQuery();

  return (
    <div
      className={classnames('playground-section', styles.schemaContainer, {
        [styles.schemaContainerHidden]: !isSchemaOpen,
      })}
    >
      <div className="playground-section-heading">
        <h3 className="playground-section-title">{t('studio.schema')}</h3>
      </div>

      <SchemaLazy schemaData={schema.data} />
    </div>
  );
};
