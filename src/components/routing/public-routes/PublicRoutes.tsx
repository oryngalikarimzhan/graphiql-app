import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes: FC<{
  isAuthorized: boolean;
}> = ({ isAuthorized }) => {
  return isAuthorized ? <Navigate to={'/main'} /> : <Outlet />;
};
