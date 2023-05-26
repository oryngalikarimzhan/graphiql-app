import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { AuthForm } from 'features/auth/auth-form/AuthForm';
import { AuthFormInputs } from 'features/auth/auth-form/interface';
import { getErrorMessage } from 'utils/helpers/errorQuery';
import { auth } from 'features/auth/firebaseConfig';

const Registration: FC = () => {
  const { t } = useTranslation();

  const [createUserWithEmailAndPassword, , isLoading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = ({ email, password }: AuthFormInputs) => {
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

export default Registration;
