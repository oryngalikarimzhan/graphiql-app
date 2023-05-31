import { FC, lazy } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';

import styles from './SchemaSection.module.scss';
import { usePlaygroundStore } from 'features/playground/usePlaygroundStore';
import { useSchemaQuery } from 'services/api';

const Schema = lazy(() => import('features/schema/Schema'));

export const SchemaSection: FC = () => {
  const [isSchemaOpen, apiEndpoint] = usePlaygroundStore(
    (state) => [state.isSchemaOpen, state.apiEndpoint],
    shallow
  );
  const { t } = useTranslation();
  const { data: schema } = useSchemaQuery(apiEndpoint);

  return (
    <div
      className={classnames('playground-section', styles.schemaContainer, {
        [styles.schemaContainerHidden]: !isSchemaOpen,
      })}
    >
      <div className="playground-section-heading">
        <h3 className="playground-section-title">{t('studio.schema')}</h3>
      </div>

      <Schema schemaData={schema.data} />
    </div>
  );
};
