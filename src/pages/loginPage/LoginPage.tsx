import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './LoginPage.module.scss';

const LoginPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="wrapper">
      <h1>{t('sign-in')}</h1>
      <p>
        <Link to="/registration">{t('sign-up')}</Link>
      </p>
    </div>
  );
};

export default LoginPage;
