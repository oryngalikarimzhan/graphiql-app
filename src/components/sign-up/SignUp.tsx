import { FC, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import AuthForm from '../auth-form/AuthForm';
import { useTranslation } from 'react-i18next';
import { IAuthFormInputs } from '../auth-form/types';
import { getErrorMessage } from '../../helper/errorQuery';
import { useActions } from '../../store/hooks';

const SignUp: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { setUser } = useActions();

  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (user: IAuthFormInputs) => {
    try {
      setErrorMessage('');

      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);

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
        buttonName={t('sign-up')}
        handleClick={handleSignUp}
        errorMessage={errorMessage}
      ></AuthForm>
    </>
  );
};

export default SignUp;
