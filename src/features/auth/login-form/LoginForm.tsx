import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { AuthForm } from '../auth-form/AuthForm';
import { AuthFormInputs } from '../auth-form/interface';
import { getErrorMessage } from 'utils/helpers/errorQuery';
import { auth } from '../firebaseConfig';

export const LoginForm: FC = () => {
  const { t } = useTranslation();

  const [signInWithEmailAndPassword, , isLoading, error] = useSignInWithEmailAndPassword(auth);

  const handleLogin = ({ email, password }: AuthFormInputs) => {
    signInWithEmailAndPassword(email, password);
  };

  const contentContext = useMemo(
    () => ({
      title: t('auth.login'),
      question: t('auth.form.no-account'),
      redirectLink: '/registration',
      redirectLinkTitle: t('auth.sign-up'),
    }),
    [t]
  );

  return (
    <AuthForm
      contentContext={contentContext}
      handleClick={handleLogin}
      isLoading={isLoading}
      errorMessage={error && getErrorMessage(error)}
    />
  );
};