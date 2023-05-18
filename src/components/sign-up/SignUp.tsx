import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import styles from './SignUp.module.scss';
import AuthForm from '../auth-form/AuthForm';
import { IAuthFormInputs } from '../auth-form/types';
import { auth } from '../../configs/FirebaseConfig';
import { getErrorMessage } from '../../helpers/errorQuery';
import { Link } from 'react-router-dom';

const SignUp: FC = () => {
  const { t } = useTranslation();

  const [createUserWithEmailAndPassword, , isLoading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = ({ email, password }: IAuthFormInputs) => {
    createUserWithEmailAndPassword(email, password);
  };

  return (
    <div className={styles.signUpForm}>
      <h2 className={styles.authFormTitle}>{t('sign-up')}</h2>
      <AuthForm
        buttonName={t('sign-up')}
        handleClick={handleSignUp}
        isLoading={isLoading}
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
