import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import AuthForm from '../auth-form/AuthForm';
import { IAuthFormInputs } from '../auth-form/types';
import { auth } from '../../config/FirebaseConfig';
import { getErrorMessage } from '../../helper/errorQuery';

const SignUp: FC = () => {
  const { t } = useTranslation();

  const [сreateUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = (userData: IAuthFormInputs) => {
    сreateUserWithEmailAndPassword(userData.email, userData.password);
  };

  return (
    <>
      <AuthForm
        buttonName={t('sign-up')}
        handleClick={handleSignUp}
        disabled={loading}
        errorMessage={error && getErrorMessage(error)}
      ></AuthForm>
    </>
  );
};

export default SignUp;
