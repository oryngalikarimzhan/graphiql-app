import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { auth } from '../../configs/FirebaseConfig';
import { IAuthButtonProps } from './types';
import { RectangularButton } from '../buttons/rectangular-button/RectangularButton';
import { SpinnerLoader } from '../spinner-loader/SpinnerLoader';
import { useActions } from '../../store/hooks';

const AuthButton: FC<IAuthButtonProps> = ({ className }) => {
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
        <RectangularButton className={className} onClick={onSignOut}>
          {t('sign-out')}
        </RectangularButton>
      ) : (
        <>
          <Link to="/login">
            <RectangularButton className={className}>{t('sign-in')}</RectangularButton>
          </Link>
          <Link to="/registration">
            <RectangularButton className={className}>{t('sign-up')}</RectangularButton>
          </Link>
        </>
      )}
    </>
  );
};

export default AuthButton;
