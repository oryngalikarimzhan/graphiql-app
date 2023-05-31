import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { AuthForm } from 'features/auth/auth-form/AuthForm';
import { getErrorMessage } from 'utils/helpers/getErrorMessage';
import { auth } from 'features/auth/firebaseConfig';

const SignUp: FC = () => {
  const { t } = useTranslation();

  const [signUp, , isLoading, error] = useCreateUserWithEmailAndPassword(auth);

  const contentContext = useMemo(
    () => ({
      title: t('auth.sign-up'),
      question: t('auth.form.have-account'),
      redirectLink: '/signin',
      redirectLinkTitle: t('auth.sign-in'),
    }),
    [t]
  );

  return (
    <AuthForm
      contentContext={contentContext}
      onSubmit={signUp}
      isLoading={isLoading}
      errorMessage={error && getErrorMessage(error)}
    />
  );
};

export default SignUp;
