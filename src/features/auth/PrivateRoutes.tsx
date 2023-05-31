import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const PrivateRoutes: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};
