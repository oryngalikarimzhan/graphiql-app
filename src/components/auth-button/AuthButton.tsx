import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import styles from './AuthButton.module.scss';
import { auth } from '../../configs/FirebaseConfig';
import { IAuthButtonProps } from './types';
import { RectangularButton } from '../buttons/rectangular-button/RectangularButton';
import { SpinnerLoader } from '../spinner-loader/SpinnerLoader';

const AuthButton: FC<IAuthButtonProps> = ({ className }) => {
  const { t } = useTranslation();
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
    return (
      <RectangularButton className={className} onClick={() => signOut(auth)}>
        <SpinnerLoader />
      </RectangularButton>
    );
  }

  return (
    <>
      {user ? (
        <RectangularButton className={className} onClick={() => signOut(auth)}>
          {t('sign-out')}
        </RectangularButton>
      ) : (
        <Link to="/login">
          <RectangularButton className={className}>{t('sign-in')}</RectangularButton>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
