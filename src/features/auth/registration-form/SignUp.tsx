import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import AuthForm from '../auth-form/AuthForm';
import { IAuthFormInputs } from '../auth-form/types';
import { auth } from '../firebaseConfig';
import { getErrorMessage } from 'utils/helpers/errorQuery';

const SignUp: FC = () => {
  const { t } = useTranslation();

  const [createUserWithEmailAndPassword, , isLoading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = ({ email, password }: IAuthFormInputs) => {
    createUserWithEmailAndPassword(email, password);
  };

  const contentContext = useMemo(
    () => ({
      title: t('auth.sign-up'),
      question: t('auth.form.have-account'),
      redirectLink: '/login',
      redirectLinkTitle: t('auth.login'),
    }),
    [t]
  );

  return (
    <AuthForm
      contentContext={contentContext}
      handleClick={handleSignUp}
      isLoading={isLoading}
      errorMessage={error && getErrorMessage(error)}
    />
  );
};

export default SignUp;
