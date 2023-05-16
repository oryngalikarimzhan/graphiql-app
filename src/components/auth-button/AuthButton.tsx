import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import styles from './AuthButton.module.scss';
import { auth } from '../../configs/FirebaseConfig';
import { IAuthButtonProps } from './types';
import classNames from 'classnames';

const AuthButton: FC<IAuthButtonProps> = ({ className }) => {
  const { t } = useTranslation();
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
    return null;
  }

  return (
    <>
      {user ? (
        <button className={classNames(className)} onClick={() => signOut(auth)}>
          {t('sign-out')}
        </button>
      ) : (
        <Link to="/login" className={styles.loginLink}>
          <button className={classNames(className)}>{t('sign-in')}</button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
