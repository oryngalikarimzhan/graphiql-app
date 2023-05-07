import { FC, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import AuthForm from '../auth-form/AuthForm';
import { useTranslation } from 'react-i18next';
import { IAuthFormInputs } from '../auth-form/types';
import { getErrorMessage } from '../../helper/errorQuery';

const SignUp: FC = () => {
  const { t } = useTranslation();

  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (user: IAuthFormInputs) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
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
