import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import './LoginPage.module.scss';
import Login from '../../components/login/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/FirebaseConfig';

const LoginPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate('/main');
    }
  }, [user, loading, navigate]);

  return (
    <div className="wrapper">
      <Login></Login>
    </div>
  );
};

export default LoginPage;
