import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import './Main.module.scss';
import { auth } from '../../features/auth/firebaseConfig';
import { Playground } from 'features/playground/Playground';
import { SpinnerLoader } from 'components/common/spinner-loader/SpinnerLoader';

const Main: FC = () => {
  const navigate = useNavigate();

  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/welcome');
    }
  }, [isLoading, navigate, user]);

  if (isLoading) return <SpinnerLoader />;

  return user ? <Playground /> : null;
};

export default Main;
