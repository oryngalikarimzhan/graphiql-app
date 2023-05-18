import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import AuthForm from '../auth-form/AuthForm';
import { IAuthFormInputs } from '../auth-form/types';
import { getErrorMessage } from '../../helpers/errorQuery';
import { auth } from '../../configs/FirebaseConfig';

const Login: FC = () => {
  const { t } = useTranslation();

  const [signInWithEmailAndPassword, , isLoading, error] = useSignInWithEmailAndPassword(auth);

  const handleLogin = ({ email, password }: IAuthFormInputs) => {
    signInWithEmailAndPassword(email, password);
  };

  const contentContext = useMemo(
    () => ({
      title: t('sign-in'),
      question: t('do-not-have-acc'),
      redirectLink: '/registration',
      redirectLinkTitle: t('sign-up'),
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

export default Login;
