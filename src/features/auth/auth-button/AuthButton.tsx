import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { auth } from '../firebaseConfig';
import { IAuthButtonProps } from './types';
import { RectangularButton } from '../../../components/common/buttons/rectangular-button/RectangularButton';
import { SpinnerLoader } from '../../../components/common/spinner-loader/SpinnerLoader';
import { useActions } from '../../../store/hooks';

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
          {t('auth.sign-out')}
        </RectangularButton>
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

export default AuthButton;
