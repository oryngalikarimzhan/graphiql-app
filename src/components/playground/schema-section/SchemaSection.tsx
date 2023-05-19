import { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import HashLoader from 'react-spinners/HashLoader';

import styles from '../Playground.module.scss';
import { useAppSelector } from '../../../store/hooks';
import { Schema } from '../../schema/Schema';
import { SchemaSectionProps } from './types';

export const SchemaSection: FC<SchemaSectionProps> = ({ schema: schema, isFetching }) => {
  const { schemaIsOpen } = useAppSelector((state) => state.playground);
  const { t } = useTranslation();
  return (
    <div
      className={classnames(styles.playgroundSection, styles.schemaContainer, {
        [styles.schemaContainerHidden]: !schemaIsOpen,
      })}
    >
      <div className={styles.schemaHeading}>
        <h3 className={styles.schemaTitle}>{t('schema')}</h3>
      </div>

      {isFetching ? (
        <div className={styles.center}>
          <HashLoader color="#a836d6" size={80} />
        </div>
      ) : (
        schema && <Schema schemaData={schema.data} />
      )}
    </div>
  );
};
