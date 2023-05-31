import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import styles from './AuthControlButtons.module.scss';
import { RectangularButton } from 'components/common/buttons/rectangular-button/RectangularButton';
import { FancyButton } from 'components/common/buttons/fancy-button/FancyButton';
import { useAuth } from '../AuthProvider';

interface AuthControlButtonsProps {
  className?: string;
}

export const AuthControlButtons: FC<AuthControlButtonsProps> = ({ className }) => {
  const { t } = useTranslation();
  const { user, logOut } = useAuth();

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
          <RectangularButton className={className} onClick={logOut}>
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
