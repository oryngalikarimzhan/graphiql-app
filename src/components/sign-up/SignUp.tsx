import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import AuthForm from '../auth-form/AuthForm';
import { IAuthFormInputs } from '../auth-form/types';
import { auth } from '../../configs/FirebaseConfig';
import { getErrorMessage } from '../../helpers/errorQuery';

const SignUp: FC = () => {
  const { t } = useTranslation();

  const [createUserWithEmailAndPassword, , isLoading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = ({ email, password }: IAuthFormInputs) => {
    createUserWithEmailAndPassword(email, password);
  };

  const contentContext = useMemo(
    () => ({
      title: t('sign-up'),
      question: t('have-acc'),
      redirectLink: '/login',
      redirectLinkTitle: t('sign-in'),
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
