import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { useActions } from '../../store/hooks';
import AuthForm from '../auth-form/AuthForm';
import { IAuthFormInputs } from '../auth-form/types';
import { getErrorMessage } from '../../helper/errorQuery';

const Login: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { setUser } = useActions();

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (user: IAuthFormInputs) => {
    try {
      setErrorMessage('');

      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);

      console.log(userCredential);
      setUser({
        email: userCredential.user.email,
        id: userCredential.user.uid,
        token: await userCredential.user.getIdToken(),
      });

      navigate('/main');
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
