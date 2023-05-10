import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import styles from './Login.module.scss';
import AuthForm from '../auth-form/AuthForm';
import { IAuthFormInputs } from '../auth-form/types';
import { getErrorMessage } from '../../helper/errorQuery';
import { auth } from '../../config/FirebaseConfig';
import { Link } from 'react-router-dom';

const Login: FC = () => {
  const { t } = useTranslation();

  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);

  const handleLogin = (userData: IAuthFormInputs) => {
    signInWithEmailAndPassword(userData.email, userData.password);
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.authFormTitle}>{t('sign-in')}</h2>
      <AuthForm
        buttonName={t('sign-in')}
        handleClick={handleLogin}
        isloading={loading}
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
