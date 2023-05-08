import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import './MainPageTest.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { useActions } from '../../store/hooks';

const MainPageTest: FC = () => {
  const { t } = useTranslation();
  const { removeUser } = useActions();

  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="wrapper">
      <h1>maintest</h1>
      <button onClick={() => removeUser()}>Log out</button>
    </div>
  );
};

export default MainPageTest;
