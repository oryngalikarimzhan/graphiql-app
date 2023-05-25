import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './AuthWelcomeController.module.scss';
import { auth } from '../firebaseConfig';
import { IAuthWelcomeController } from './types';
import { SpinnerLoader } from '../../../components/common/spinner-loader/SpinnerLoader';
import { RectangularButton } from '../../../components/common/buttons/rectangular-button/RectangularButton';

const AuthWelcomeController: FC<IAuthWelcomeController> = ({ className }) => {
  const { t } = useTranslation();
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <RectangularButton>
          <SpinnerLoader />
        </RectangularButton>
      </div>
    );
  }

  return (
    <div className={styles.userAuth}>
      {user ? (
        <div className={styles.container}>
          <h3>
            {t('user')} : {user.email}
          </h3>
          <Link to="/main" className={styles.loginLink}>
            <RectangularButton className={classNames(styles.exploreButton, className)}>
              {t('explore')}
            </RectangularButton>
          </Link>
        </div>
      ) : (
        <div className={styles.container}>
          <Link to="/login" className={styles.loginLink}>
            <RectangularButton className={classNames(styles.exploreButton, className)}>
              {t('sign-in')}
            </RectangularButton>
          </Link>
          <Link to="/registration" className={styles.loginLink}>
            <RectangularButton className={classNames(styles.exploreButton, className)}>
              {t('sign-up')}
            </RectangularButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthWelcomeController;
