import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './RegistrationPage.module.scss';
import SignUp from '../../components/sign-up/SignUp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../configs/FirebaseConfig';
import { SpinnerLoader } from '../../components/spinner-loader/SpinnerLoader';

const RegistrationPage: FC = () => {
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
      <SignUp />
    </div>
  ) : null;
};

export default RegistrationPage;
