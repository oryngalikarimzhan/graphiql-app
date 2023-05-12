import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './RegistrationPage.module.scss';
import SignUp from '../../components/sign-up/SignUp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/FirebaseConfig';

const RegistrationPage: FC = () => {
  const navigate = useNavigate();

  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (user) {
      navigate('/main');
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="wrapper">
      <SignUp />
    </div>
  );
};

export default RegistrationPage;
