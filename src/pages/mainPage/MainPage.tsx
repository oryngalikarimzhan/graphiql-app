import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import './MainPage.module.scss';
import { auth } from '../../config/FirebaseConfig';
import { Playground } from '../../components/playground/Playground';

const MainPage: FC = () => {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate('/login');
    }
  }, [user, loading, navigate]);

  return (
    <>
      <Playground />
      <button onClick={() => signOut(auth)}>Log out</button>
    </>
  );
};

export default MainPage;
