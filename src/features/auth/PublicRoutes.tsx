import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const PublicRoutes: FC = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={'/main'} />;
  }

  return <Outlet />;
};
