import { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from '../Playground.module.scss';
import { useAppSelector } from '../../../store/hooks';
import { Schema } from '../../schema/Schema';
import schemaData from '../schemaData.json';

const schemaString = JSON.stringify(schemaData);

export const SchemaSection: FC = () => {
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

      <Schema schemaData={JSON.parse(schemaString).data} />
    </div>
  );
};
