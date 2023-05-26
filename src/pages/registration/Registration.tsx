import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { RegistrationForm } from 'features/auth/registration-form/RegistrationForm';
import { auth } from 'features/auth/firebaseConfig';
import { SpinnerLoader } from 'components/common/spinner-loader/SpinnerLoader';

const Registration: FC = () => {
  const navigate = useNavigate();

  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [navigate, user]);

  if (isLoading) return <SpinnerLoader />;

  return !user ? (
    <div className="wrapper">
      <RegistrationForm />
    </div>
  ) : null;
};

export default Registration;
