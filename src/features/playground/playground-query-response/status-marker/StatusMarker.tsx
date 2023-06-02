import { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './StatusMarker.module.scss';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

export const StatusMarker: FC = () => {
  const { t } = useTranslation();
  const [isSuccessResponse, responseStatus] = usePlaygroundStore((state) => [
    state.isSuccessResponse,
    state.responseStatus,
  ]);

  return (
    <div className={styles.statusMarker}>
      <span
        className={classnames(styles.statusCode, {
          [styles.errorCode]: isSuccessResponse !== undefined && !isSuccessResponse,
          [styles.successCode]: !!isSuccessResponse,
        })}
      >
        {responseStatus}
      </span>
      <span className={styles.statusTitle}>{t('studio.status')}</span>
      <span
        className={classnames(styles.statusPin, {
          [styles.error]: isSuccessResponse !== undefined && !isSuccessResponse,
          [styles.success]: !!isSuccessResponse,
        })}
      />
    </div>
  );
};
