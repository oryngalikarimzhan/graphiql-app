import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import classnames from 'classnames';

import styles from './AuthControls.module.scss';
import { auth } from '../firebaseConfig';
import { RectangularButton } from 'components/common/buttons/rectangular-button/RectangularButton';
import { usePlaygroundStore } from 'store/usePlaygroundStore';
import { useSchemaStore } from 'store/useSchemaStore';
import { useUserAuthStore } from '../userAuthStore';
import { FancyButton } from '../../../components/common/buttons/fancy-button/FancyButton';

interface AuthControlsProps {
  className?: string;
}

export const AuthControls: FC<AuthControlsProps> = ({ className }) => {
  const { t } = useTranslation();

  const user = useUserAuthStore((state) => state.user);

  const resetPlaygroundStates = usePlaygroundStore((state) => state.resetPlaygroundStates);

  const resetSchemaStates = useSchemaStore((state) => state.resetSchemaStates);

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
            <FancyButton className={className}>{t('auth.sign-up')}</FancyButton>
          </Link>
        </>
      )}
    </>
  );
};
