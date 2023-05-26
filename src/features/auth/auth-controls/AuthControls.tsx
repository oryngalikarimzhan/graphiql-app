import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import styles from './AuthControls.module.scss';
import { auth } from '../firebaseConfig';
import { RectangularButton } from 'components/common/buttons/rectangular-button/RectangularButton';
import { SpinnerLoader } from 'components/common/spinner-loader/SpinnerLoader';
import { useActions } from 'store/hooks';
import classnames from 'classnames';

interface AuthControlsProps {
  className?: string;
}

export const AuthControls: FC<AuthControlsProps> = ({ className }) => {
  const { t } = useTranslation();
  const [user, isLoading] = useAuthState(auth);
  const { resetPlaygroundProgress, resetSchemaProgress } = useActions();

  if (isLoading) {
    return (
      <RectangularButton className={className}>
        <SpinnerLoader />
      </RectangularButton>
    );
  }

  const onSignOut = () => {
    signOut(auth);
    resetPlaygroundProgress();
    resetSchemaProgress();
  };

  return (
    <>
      {user ? (
        <>
          <RectangularButton
            className={classnames(styles.authUser, className)}
            title={user.email || ''}
          >
            {user.email}
          </RectangularButton>
          <RectangularButton className={className} onClick={onSignOut}>
            {t('auth.sign-out')}
          </RectangularButton>
        </>
      ) : (
        <>
          <Link to="/login">
            <RectangularButton className={className}>{t('auth.login')}</RectangularButton>
          </Link>
          <Link to="/registration">
            <RectangularButton className={className}>{t('auth.sign-up')}</RectangularButton>
          </Link>
        </>
      )}
    </>
  );
};