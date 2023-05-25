import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import './Login.module.scss';
import LoginForm from 'features/auth/login-form/Login';
import { auth } from '../../features/auth/firebaseConfig';
import { SpinnerLoader } from 'components/common/spinner-loader/SpinnerLoader';

const Login: FC = () => {
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
      <LoginForm />
    </div>
  ) : null;
};

export default Login;
