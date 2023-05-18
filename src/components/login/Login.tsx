import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import styles from './Login.module.scss';
import AuthForm from '../auth-form/AuthForm';
import { IAuthFormInputs } from '../auth-form/types';
import { getErrorMessage } from '../../helpers/errorQuery';
import { auth } from '../../configs/FirebaseConfig';
import { Link } from 'react-router-dom';

const Login: FC = () => {
  const { t } = useTranslation();

  const [signInWithEmailAndPassword, , isLoading, error] = useSignInWithEmailAndPassword(auth);

  const handleLogin = ({ email, password }: IAuthFormInputs) => {
    signInWithEmailAndPassword(email, password);
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.authFormTitle}>{t('sign-in')}</h2>
      <AuthForm
        buttonName={t('sign-in')}
        handleClick={handleLogin}
        isLoading={isLoading}
        errorMessage={error && getErrorMessage(error)}
      ></AuthForm>
      <div className={styles.authFormInfo}>
        <div>{t('do-not-have-acc')}</div>
        <Link to="/registration">{t('sign-up')}</Link>
      </div>
    </div>
  );
};

export default Login;
