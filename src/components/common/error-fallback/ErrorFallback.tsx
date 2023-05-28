import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import styles from './ErrorFallback.module.scss';
import { getErrorMessage } from 'utils/helpers/getErrorMessage';
import { RectangularButton } from '../buttons/rectangular-button/RectangularButton';
import { Message } from '../message/Message';

export const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.errorTitle}>{t('error')}</h2>

      <Message isError>
        {t('error-happened')}: {getErrorMessage(error)}
      </Message>

      <RectangularButton onClick={resetErrorBoundary}>{t('refresh')}</RectangularButton>
    </div>
  );
};
