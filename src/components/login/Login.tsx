import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { useActions, useAppSelector } from '../../store/hooks';
import AuthForm from '../auth-form/AuthForm';
import { IAuthFormInputs } from '../auth-form/types';
import { getErrorMessage } from '../../helper/errorQuery';

const Login: FC = () => {
  const { t } = useTranslation();

  const [errorMessage, setErrorMessage] = useState('');
  const user = useAppSelector((state) => state.user);
  const { setUser, removeUser } = useActions();

  const handleLogin = async (user: IAuthFormInputs) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
    }
  };
  return (
    <>
      <AuthForm
        buttonName={t('sign-in')}
        handleClick={handleLogin}
        errorMessage={errorMessage}
      ></AuthForm>
    </>
  );
};

export default Login;
