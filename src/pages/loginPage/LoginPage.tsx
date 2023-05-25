import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import './LoginPage.module.scss';
import Login from '../../components/login/Login';
import { auth } from '../../configs/FirebaseConfig';
import { SpinnerLoader } from '../../components/spinner-loader/SpinnerLoader';

const LoginPage: FC = () => {
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
      <Login />
    </div>
  ) : null;
};

export default LoginPage;
