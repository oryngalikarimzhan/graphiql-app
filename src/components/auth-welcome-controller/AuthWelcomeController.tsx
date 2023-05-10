import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './AuthWelcomeController.module.scss';
import { auth } from '../../config/FirebaseConfig';
import { IAuthWelcomeController } from './types';

const AuthWelcomeController: FC<IAuthWelcomeController> = ({ className }) => {
  const { t } = useTranslation();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return null;
  }

  return (
    <div>
      {user ? (
        <Link to="/main" className={styles.loginLink}>
          <button className={classNames(className)}>{t('main-page')}</button>
        </Link>
      ) : (
        <div className={styles.container}>
          <Link to="/login" className={styles.loginLink}>
            <button className={classNames(className)}>{t('sign-in')}</button>
          </Link>
          <Link to="/registration" className={styles.loginLink}>
            <button className={classNames(className)}>{t('sign-up')}</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthWelcomeController;
