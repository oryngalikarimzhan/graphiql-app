import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import './MainPageTest.module.scss';
import { auth } from '../../config/FirebaseConfig';

const MainPageTest: FC = () => {
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
    <div className="wrapper">
      <h1>maintest</h1>
      <button onClick={() => signOut(auth)}>Log out</button>
    </div>
  );
};

export default MainPageTest;
