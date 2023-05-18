import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import './MainPage.module.scss';
import { auth } from '../../configs/FirebaseConfig';
import { Playground } from '../../components/playground/Playground';

const MainPage: FC = () => {
  const navigate = useNavigate();

  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!user) {
      return navigate('/welcome');
    }
  }, [user, isLoading, navigate]);

  return <Playground />;
};

export default MainPage;
