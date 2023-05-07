import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './RegistrationPage.module.scss';
import SignUp from '../../components/sign-up/SignUp';

const RegistrationPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="wrapper">
      <h1>{t('sign-up')}</h1>
      <SignUp></SignUp>
      <p>
        <Link to="/login">{t('sign-in')}</Link>
      </p>
    </div>
  );
};

export default RegistrationPage;
