import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import styles from './SignUp.module.scss';
import AuthForm from '../auth-form/AuthForm';
import { IAuthFormInputs } from '../auth-form/types';
import { auth } from '../../config/FirebaseConfig';
import { getErrorMessage } from '../../helper/errorQuery';
import { Link } from 'react-router-dom';

const SignUp: FC = () => {
  const { t } = useTranslation();

  const [сreateUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = (userData: IAuthFormInputs) => {
    сreateUserWithEmailAndPassword(userData.email, userData.password);
  };

  return (
    <div className={styles.signUpForm}>
      <h2 className={styles.authFormTitle}>{t('sign-up')}</h2>
      <AuthForm
        buttonName={t('sign-up')}
        handleClick={handleSignUp}
        disabled={loading}
        errorMessage={error && getErrorMessage(error)}
      ></AuthForm>
      <div className={styles.authFormInfo}>
        <div>{t('have-acc')}</div>
        <Link to="/login">{t('sign-in')}</Link>
      </div>
    </div>
  );
};

export default SignUp;
