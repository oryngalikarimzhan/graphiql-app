import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { AuthForm } from 'features/auth/auth-form/AuthForm';
import { getErrorMessage } from 'utils/helpers/getErrorMessage';
import { auth } from 'features/auth/firebaseConfig';

const SignIn: FC = () => {
  const { t } = useTranslation();
  const [signIn, , isLoading, error] = useSignInWithEmailAndPassword(auth);

  const contentContext = useMemo(
    () => ({
      title: t('auth.sign-in'),
      question: t('auth.form.no-account'),
      redirectLink: '/signup',
      redirectLinkTitle: t('auth.sign-up'),
    }),
    [t]
  );

  return (
    <AuthForm
      contentContext={contentContext}
      onSubmit={signIn}
      isLoading={isLoading}
      errorMessage={error && getErrorMessage(error)}
    />
  );
};

export default SignIn;
