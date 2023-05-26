import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

import styles from './StartButton.module.scss';
import { auth } from '../firebaseConfig';
import { SpinnerLoader } from 'components/common/spinner-loader/SpinnerLoader';
import { RectangularButton } from 'components/common/buttons/rectangular-button/RectangularButton';

export const StartButton: FC = () => {
  const { t } = useTranslation();
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
    return (
      <RectangularButton className={styles.startButton}>
        <SpinnerLoader />
      </RectangularButton>
    );
  }

  return (
    <Link to={user ? '/main' : '/registration'} className={styles.loginLink}>
      <RectangularButton className={styles.startButton}>
        <span>{t('landing.start-button')}</span>
      </RectangularButton>
    </Link>
  );
};
