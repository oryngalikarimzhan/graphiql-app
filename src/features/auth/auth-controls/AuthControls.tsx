import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import classnames from 'classnames';

import styles from './AuthControls.module.scss';
import { auth } from '../firebaseConfig';
import { RectangularButton } from 'components/common/buttons/rectangular-button/RectangularButton';
import { SpinnerLoader } from 'components/common/spinner-loader/SpinnerLoader';
import { usePlaygroundStore } from 'store/playground/usePlaygroundStore';
import { useSchemaStore } from 'store/schema/useSchemaStore';

interface AuthControlsProps {
  className?: string;
}

export const AuthControls: FC<AuthControlsProps> = ({ className }) => {
  const { t } = useTranslation();
  const [user, isLoading] = useAuthState(auth);
  const resetPlaygroundStates = usePlaygroundStore((state) => state.resetPlaygroundStates);
  const resetSchemaStates = useSchemaStore((state) => state.resetSchemaStates);

  if (isLoading) {
    return (
      <RectangularButton className={className}>
        <SpinnerLoader />
      </RectangularButton>
    );
  }

  const onSignOut = () => {
    signOut(auth);
    resetPlaygroundStates();
    resetSchemaStates();
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
