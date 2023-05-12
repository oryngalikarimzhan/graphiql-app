import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WelcomePage.module.scss';
import AuthWelcomeController from '../../components/auth-welcome-controller/AuthWelcomeController';

const WelcomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="wrapper">
      <h1>{t('welcome-msg')}</h1>
      <AuthWelcomeController className={styles.authWelcome} />
    </div>
  );
};

export default WelcomePage;
