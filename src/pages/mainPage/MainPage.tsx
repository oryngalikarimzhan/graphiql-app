import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import './MainPage.module.scss';
import { auth } from '../../configs/FirebaseConfig';
import { Playground } from '../../components/playground/Playground';
import { SpinnerLoader } from '../../components/spinner-loader/SpinnerLoader';

const MainPage = () => {
  const navigate = useNavigate();

  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate('/welcome');
    }
  }, [navigate, user]);

  if (isLoading) return <SpinnerLoader />;

  return user && <Playground />;
};

export default MainPage;
