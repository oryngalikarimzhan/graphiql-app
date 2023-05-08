import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import AuthForm from '../auth-form/AuthForm';
import { IAuthFormInputs } from '../auth-form/types';
import { getErrorMessage } from '../../helper/errorQuery';
import { auth } from '../../config/FirebaseConfig';

const Login: FC = () => {
  const { t } = useTranslation();

  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);

  const handleLogin = (userData: IAuthFormInputs) => {
    signInWithEmailAndPassword(userData.email, userData.password);
  };

  return (
    <>
      <AuthForm
        buttonName={t('sign-in')}
        handleClick={handleLogin}
        disabled={loading}
        errorMessage={error && getErrorMessage(error)}
      ></AuthForm>
    </>
  );
};

export default Login;
