import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './LoginPage.module.scss';
import Login from '../../components/login/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../configs/FirebaseConfig';

const LoginPage: FC = () => {
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
      <Login />
    </div>
  );
};

export default LoginPage;
